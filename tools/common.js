var fs = require('fs');
var path = require('path');

/** 字符转驼峰形式 */
const toCamel = (str) => str.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());

/** 同步创建多级目录 */
const mkdirsSync = (dirName) => {
  if (fs.existsSync(dirName)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirName))) {
      fs.mkdirSync(dirName);
      return true;
    }
  }
};

module.exports = {
  toCamel,
  mkdirsSync
};
