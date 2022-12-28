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
  cwd = '';
  dirName = '';

  outputPaths = {};
  list = [];

  constructor(theme = 'ui', cwd = '', dirName = '') {
    this.theme = theme;
    this.cwd = cwd;
    this.dirName = dirName;

    const targetDir = `${cwd}/dist/${dirName}/atom-class`;
    this.outputPaths = {
      output: {
        enum: `${targetDir}/${theme}-atom-enum.ts`,
        scss: `${targetDir}/${theme}-atom.scss`,
        frament: `${targetDir}/${theme}-fragment.css`,
        typing:`${targetDir}/${theme}-typings.d.ts`,
      },
      byproduct: {
        rule: `${targetDir}/byproduct/${theme}-scss-rule.scss`,
        script: `${targetDir}/byproduct/${theme}-scss-script.scss`,
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
  runAtom() {
    // 执行顺序: 原子变量 -> scss脚本规则 -> js枚举类型 -> ts类型typings
    // 注意css的类生成是通过npx执行上述的scss脚本规则来生成的
    GEN.genUIAtom(this.list, {
      fs,
      theme: this.theme,
      target: this.outputPaths.output.scss,
    });
    GEN.genScssRule(this.list, {
      fs,
      theme: this.theme,
      target: this.outputPaths.byproduct.rule,
      script: this.outputPaths.byproduct.script,
      frament:this.outputPaths.output.frament,
    });
    GEN.genAtom(this.list, {
      fs,
      theme: this.theme,
      target: this.outputPaths.output.enum,
    });
    GEN.genUiTyping(this.list, {
      fs,
      theme: this.theme,
      typing: this.outputPaths.output.typing,
    });
  }
}
module.exports = StyleCompiler;
