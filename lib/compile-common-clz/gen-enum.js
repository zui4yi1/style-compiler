const { toCamel } = require("../../tools/common");

const _outputEnumTyping = (fs, target, obj) => {
  Object.keys(obj).forEach((k) => {
    fs.writeFileSync(target, `  ${toCamel(k)}: '${k}'; \r`, { flag: "a+" });
  });
};
const _outputEnum = (fs, target, obj) => {
  Object.keys(obj).forEach((k) => {
    fs.writeFileSync(target, `  ${toCamel(k)}: '${k}', \r`, { flag: "a+" });
  });
};

const genClzEnum = (fs, target, list) => {
  fs.writeFileSync(target, "");
  // 1. 生成ts类型定义
  fs.writeFileSync(target, `/* 通用类clz的类型, 定义下避免默认string */ \r`, {
    flag: "a+",
  });
  fs.writeFileSync(target, `interface IClz { \r`, { flag: "a+" });
  list.forEach((item) => {
    _outputEnumTyping(fs, target, item.items);
  });
  fs.writeFileSync(target, `}; \r`, { flag: "a+" });

  // 2. 生成类型
  fs.writeFileSync(target, `/* 通用类clz */\r`, { flag: "a+" });
  fs.writeFileSync(target, `export const clz:IClz = { \r`, { flag: "a+" });
  list.forEach((item) => {
    _outputEnum(fs, target, item.items);
  });
  fs.writeFileSync(target, `}; \r`, { flag: "a+" });
};
module.exports = genClzEnum;
