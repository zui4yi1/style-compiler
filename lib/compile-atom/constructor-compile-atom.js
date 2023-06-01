const GEN = require('./index');
const fs = require('fs');

const { mkdirsSync } = require('../../tools/common');

/**
 * @typedef {Object} IOption
 * @property {String} key 字段名
 * @property {String} value 值
 * @property {String} desc 描述, 若有则以注释的方式展示
 * @property {String} abbreviation 缩写, 若不为空生成的类名以缩写为准，否则以key为准
 * @property {Array<IOption} extends 当key为color时可能有扩展或衍生颜色
 */

/**
 * @typedef {Object} IProps
 * @property {'family'|'color'|'font-size'} type 分类
 * @property {'main'|'border'|'bg'}
 * @property {String} summary 描述,会以注释的方式展示
 * @property {Array<IOption>} items 数据列表
 */

class StyleCompiler {
  theme = '';
  isMutilTheme = false;
  cwd = '';
  dirName = '';

  outputPaths = {};
  list = [];

  constructor(theme = 'ui', isMutilTheme = false, cwd = '', dirName = '') {
    this.theme = theme;
    this.isMutilTheme = isMutilTheme;
    this.cwd = cwd;
    this.dirName = dirName;

    const targetDir = `${cwd}/dist/${dirName}/atom-class`;
    this.outputPaths = {
      output: {
        enum: `${targetDir}/${theme}-atom-enum.ts`,
        scss: `${targetDir}/${theme}-atom.scss`,
        value: `${targetDir}/${theme}-value.ts`,
        frament: `${targetDir}/${theme}-fragment.css`,
        typing: `${targetDir}/${theme}-typings.d.ts`,
      },
      byproduct: {
        rule: `${targetDir}/byproduct/scss-rule.scss`,
        script: `${targetDir}/byproduct/scss-script.scss`,
      },
    };
    mkdirsSync(targetDir);
    mkdirsSync(`${targetDir}/byproduct`);
  }

  /**
   * @param {IProps} props
   * 怎么变成私有的？
   */
  _addAtom(props) {
    this.list.push({ ...props });
  }

  /**
   * @param {IProps} props
   */
  addAtom(props) {
    this._addAtom(props);
  }

  filterTypes() {
    const list = this.list;
    // 颜色类
    const colors = list.filter((tmp) => tmp.type === 'color') || [];

    // 颜色扩展类
    const extendsColors = { type: 'color', summary: '主色扩展', items: [] };
    colors.forEach((cur) => {
      cur.items.forEach((tmp) => {
        if (tmp.extends?.length) {
          extendsColors.items.push(...tmp.extends);
        }
      });
    });

    // 非颜色类
    const noneColors = list.filter((tmp) => tmp.type !== 'color') || [];

    // 字体家族
    const familys = list.filter((tmp) => tmp.type === 'font-family') || [];

    // 遮罩类
    const masks = list.filter((tmp) => tmp.type === 'mask') || [];

    // 阴影类
    const shadows = list.filter((tmp) => tmp.type === 'shadow') || [];

    // 字体尺寸类
    const fonts = list.filter((tmp) => tmp.type === 'font-size') || [];
    // 间距类
    const gaps = list.filter((tmp) => tmp.type === 'gap') || [];

    // 高度类
    const heights = list.filter((tmp) => tmp.type === 'height') || [];

    // 圆角类
    const radius = list.filter((tmp) => tmp.type === 'radius') || [];
    // 其它类
    const others =
      list.filter(
        (tmp) =>
          ![
            'color',
            'font-family',
            'font-size',
            'gap',
            'height',
            'radius',
          ].includes(tmp.type)
      ) || [];
    return {
      colors,
      extendsColors,
      noneColors,
      familys,
      masks,
      shadows,
      fonts,
      gaps,
      heights,
      radius,
      others,
    };
  }

  runAtom(bar) {
    // 执行顺序: 原子变量 -> scss脚本规则 -> js枚举类型 -> ts类型typings
    // 注意css的类生成是通过npx执行上述的scss脚本规则来生成的
    const filterTypes = this.filterTypes();
    // 原子定义类
    GEN.genUIAtom(filterTypes, {
      fs,
      theme: this.theme,
      isMutilTheme: this.isMutilTheme,
      target: this.outputPaths.output.scss,
    });
    bar.tick(5)
    // 原子定义值
    GEN.genAtomValue(filterTypes, {
      fs,
      theme: this.theme,
      isMutilTheme: this.isMutilTheme,
      target: this.outputPaths.output.value,
    });
    bar.tick(5)
    // 原子样式类
    GEN.genScssRule(filterTypes, {
      fs,
      theme: this.theme,
      isMutilTheme: this.isMutilTheme,
      target: this.outputPaths.byproduct.rule,
      script: this.outputPaths.byproduct.script,
      frament: this.outputPaths.output.frament,
    });
    bar.tick(5)
    
    // 原子类enum
    GEN.genAtom(this.list, {
      fs,
      theme: this.theme,
      isMutilTheme: this.isMutilTheme,
      target: this.outputPaths.output.enum,
    });
    bar.tick(5)

    // ts的typing
    GEN.genUiTyping(filterTypes, {
      fs,
      theme: this.theme,
      isMutilTheme: this.isMutilTheme,
      typing: this.outputPaths.output.typing,
    });
    bar.tick(5)
    bar.tick(5)
  }
}
module.exports = StyleCompiler;
