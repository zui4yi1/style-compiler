const GEN = require('./index');
const fs = require('fs');

const { mkdirsSync } = require('../../tools/common');

/**
 * @typedef {Object} IClzProps
 * @property {String} type 分类
 * @property {String} summary 描述,会以注释的方式展示
 * @property {Object} items 数据列表
 */

/** 通用类编绎器 */
class CommonClzCompiler {
  cwd = '';
  dirName = '';

  // theme当前用不着, 因为作为公共样式, 均为内置统一
  // theme = "";

  outputPaths = {};
  list = [];

  constructor(cwd = '', dirName = '') {
    // 拼接路径: cwd +'dist' + dirName+ output
    this.cwd = cwd;
    this.dirName = dirName;

    const targetDir = `${cwd}/dist/${dirName}/common-class`;
    this.outputPaths = {
      output: {
        enum: `${targetDir}/ui-common-enum.ts`,
        css: `${targetDir}/ui-common.css`,
      },
      byproduct:{
        animate:`${targetDir}/byproduct/animate.scss`,
        scss: `${targetDir}/byproduct/ui-common.scss`,
      }
    };
    mkdirsSync(targetDir);
    mkdirsSync(`${targetDir}/byproduct`);
  }
  /**
   *  @param {IClzProps} props
   */
  addClz(props) {
    if (props.items instanceof Function) {
      props.items = props.items();
      this.list.push(props);
    } else {
      this.list.push(props);
    }
  }

  runClz() {
    GEN.genClzEnum(fs, this.outputPaths.output.enum, this.list);
    GEN.genClz(this.list, {
      fs,
      animate: this.outputPaths.byproduct.animate,
      scss: this.outputPaths.byproduct.scss,
      css:this.outputPaths.output.css,
    });
    
  }
}
module.exports = CommonClzCompiler;
