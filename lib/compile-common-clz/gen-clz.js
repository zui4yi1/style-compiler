const process = require("child_process");
var fse = require("fs-extra");

const animateSource = require("./conf/animate.js");

const _outputClz = (fs, target, obj) => {
  Object.keys(obj).forEach((k) => {
    const props = obj[k];
    fs.writeFileSync(target, `.${k} { \r`, { flag: "a+" });
    Object.keys(props).forEach((p) => {
      fs.writeFileSync(target, `  ${p}: ${props[p]}; \r`, { flag: "a+" });
    });
    fs.writeFileSync(target, `}\r`, { flag: "a+" });
  });
};

const genClz = (list, options, bar) => {
  const { fs, animate, scss, css } = options;

  // 1. animate
  fs.writeFileSync(animate, animateSource.animate);

  // 2. clz
  fs.writeFileSync(scss, "");
  fs.writeFileSync(scss, ` @import './animate.scss'; \r`, {
    flag: "a+",
  });
  list.forEach((item) => {
    fs.writeFileSync(scss, `/* ${item.summary} */ \r`, {
      flag: "a+",
    });
    _outputClz(fs, scss, item.items);
    fs.writeFileSync(scss, `\r`, {
      flag: "a+",
    });
  });

  // 3. css
  process.exec(`npx sass ${scss} ${css} --no-source-map`, (err) => {
    if (err) {
      return console.error("请检查是否安装sass包");
    }
    // 删除byproduct
    const inx = scss.lastIndexOf("/byproduct");
    const byproductPath = scss.substring(0, inx + 10);
    fse.remove(byproductPath);
    bar.tick(10);
  });
};
module.exports = genClz;
