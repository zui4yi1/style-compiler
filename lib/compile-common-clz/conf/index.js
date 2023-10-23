const CommonClzCompiler = require("../constructor-common-clz");

const Clz = require("./lib/index");

const commonClzExec = (confs = [], cwd = "", dirName = "", bar) => {
  const ccc = new CommonClzCompiler(cwd, dirName);
  // 后续每个分类都放在独立的文件
  /** flex类*/
  ccc.addClz({
    type: "flex",
    summary: "flex类",
    items: Clz.flexClz,
  });

  /** text类 */
  ccc.addClz({
    type: "text",
    summary: "text类",
    items: Clz.textClz,
  });

  /** position类 */
  ccc.addClz({
    type: "position",
    summary: "position",
    items: Clz.positionClz,
  });

  /** border类 */
  ccc.addClz({
    type: "border",
    summary: "border类, 需与颜色配合使用",
    items: Clz.borderClz,
  });

  /** scroll类 */
  ccc.addClz({
    type: "scroll",
    summary: "scroll类",
    items: Clz.scrollClz,
  });

  /** display类 */
  ccc.addClz({
    type: "display",
    summary: "display类",
    items: Clz.displayClz,
  });

  /** float 类 */
  ccc.addClz({
    type: "float",
    summary: "float 类",
    items: Clz.floatClz,
  });

  /** opacity 类 */
  ccc.addClz({
    type: "opacity",
    summary: "opacity 类",
    items: Clz.opacityClz,
  });

  /** size类 */
  ccc.addClz({
    type: "size",
    summary: "size类",
    items: Clz.sizeClz,
  });

  /** bold 类 */
  ccc.addClz({
    type: "bold",
    summary: "bold 类",
    items: Clz.boldClz,
  });

  /** tranform 类 */
  ccc.addClz({
    type: "tranform",
    summary: "tranform 类",
    items: Clz.tranformClz,
  });

  /** z-index 类 */
  ccc.addClz({
    type: "z-index",
    summary: "z-index 类",
    items: Clz.zIndexClz,
  });

  /** span 类 */
  ccc.addClz({
    type: "span",
    summary: "span 类",
    items: () => {
      const obj = {};
      for (i = 1; i < 25; i++) {
        obj["span-" + i] = { width: `${(100 * i) / 24}%` };
      }
      return obj;
    },
  });

  /** line-height 类 */
  ccc.addClz({
    type: "line-height",
    summary: "line-height 类",
    items: () => {
      const obj = {};
      for (i = 0; i < 10; i++) {
        obj["lh-" + i] = { "line-height": 1 + i / 10 };
      }
      return obj;
    },
  });

  /** rect 类 */
  ccc.addClz({
    type: "rect",
    summary: "rect 正方形类, 从4~256, 4的倍数递增",
    items: () => {
      const obj = {};
      for (i = 1; i < 65; i++) {
        obj["rect-" + i * 4] = {
          width: `${i * 4}${confs.unit}`,
          height: `${i * 4}${confs.unit}`,
        };
      }
      return obj;
    },
  });

  /** width 类 */
  ccc.addClz({
    type: "width",
    summary: "width 类, 从4~128, 4的倍数递增",
    items: () => {
      const obj = {};
      for (i = 1; i < 33; i++) {
        obj["w-" + i * 4] = {
          width: `${i * 4}${confs.unit}`,
        };
      }
      return obj;
    },
  });

  /** height 类 */
  ccc.addClz({
    type: "height",
    summary: "height 类, 从4~128, 4的倍数递增",
    items: () => {
      const obj = {};
      for (i = 1; i < 33; i++) {
        obj["h-" + i * 4] = {
          height: `${i * 4}${confs.unit}`,
        };
      }
      return obj;
    },
  });

  /** animation 类 */
  ccc.addClz({
    type: "animation",
    summary: "animation 类, 当前仅提供旋转（spin还需要额外提供）",
    items: Clz.animationClz,
  });

  /** others 类 */
  ccc.addClz({
    type: "others",
    summary: "others 类, 其它不能分类的都放这",
    items: Clz._othersClz,
  });

  bar.tick(10);
  ccc.runClz(bar);
};

module.exports = {
  commonClzExec,
};
