const process = require("child_process");
var fse = require("fs-extra");

const scssScript = require("./conf/scss-script");

const _outputRule = (list, options) => {
  const { fs, target } = options;
  list.forEach((item) => {
    fs.writeFileSync(
      target,
      `  ${item.abbreviation || item.key}: ${item.value}, \r`,
      {
        flag: "a+",
      }
    );
  });
};

const genScssRule = (filterTypes, options, bar) => {
  const { fs, target, script, frament, theme, isMutilTheme } = options;
  const {
    colors,
    extendsColors,
    familys,
    masks,
    shadows,
    fonts,
    gaps,
    heights,
    radius,
  } = filterTypes;
  // 1. generate scss script
  fs.writeFileSync(
    script,
    scssScript.scriptFunc(isMutilTheme ? `${theme}-` : "")
  );

  // 2. generate scss rules
  fs.writeFileSync(target, "");

  // 颜色类
  fs.writeFileSync(target, "$colors: ( \r", { flag: "a+" });
  colors.forEach((item) => {
    _outputRule(item.items, options);
  });

  // 颜色扩展类
  _outputRule(extendsColors.items, options);
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 字体家族
  fs.writeFileSync(target, "$familys: ( \r", { flag: "a+" });
  familys.forEach((item) => {
    _outputRule(item.items, options);
  });
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 遮罩类
  fs.writeFileSync(target, "$masks: ( \r", { flag: "a+" });
  masks.forEach((item) => {
    _outputRule(item.items, options);
  });
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 阴影类
  fs.writeFileSync(target, "$shadows: ( \r", { flag: "a+" });
  shadows.forEach((item) => {
    _outputRule(item.items, options);
  });
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 字体尺寸类
  fs.writeFileSync(target, "$font-sizes: ( \r", { flag: "a+" });
  fonts.forEach((item) => {
    _outputRule(item.items, options);
  });
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 间距类
  fs.writeFileSync(target, "$gaps: ( \r", { flag: "a+" });
  gaps.forEach((item) => {
    _outputRule(item.items, options);
  });
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 高度类
  fs.writeFileSync(target, "$heights: ( \r", { flag: "a+" });
  heights.forEach((item) => {
    _outputRule(item.items, options);
  });
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 圆角类
  fs.writeFileSync(target, "$radius: ( \r", { flag: "a+" });
  radius.forEach((item) => {
    _outputRule(item.items, options);
  });
  fs.writeFileSync(target, "); \r\r", { flag: "a+" });

  // 3. gen framgent.css
  process.exec(`npx sass ${script} ${frament} --no-source-map`, (err) => {
    if (err) return;
    // 删除byproduct
    const inx = script.lastIndexOf("/byproduct");
    const byproductPath = script.substring(0, inx + 10);
    fse.remove(byproductPath);
    bar.tick(10);
  });
};
module.exports = genScssRule;
