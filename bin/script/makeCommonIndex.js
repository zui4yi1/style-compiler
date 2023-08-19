var fs = require("fs");
var path = require("path");
var fse = require("fs-extra");

const { toCamel } = require("../../tools/common");

const cwd = process.cwd();
const targetDir = cwd + "/lib/compile-common-clz/conf/lib/";

fse.readdir(targetDir).then((res) => {
  const fileNames = res
    .filter((n) => n !== "index.js")
    .map((n) => n.replace(".js", ""));
  console.log(
    "🚀 ~ file: makeCommonIndex.js:14 ~ .then ~ fileNames:",
    fileNames
  );
  let content = fileNames
    .map((name) => {
      return `const ${toCamel(name)}Clz = require("./${name}");\r`;
    })
    .join("");

  let exportText = fileNames.map((name) => `${toCamel(name)}Clz`);
  content += `module.exports = {\r${exportText.join(",")} \r};`;
  fse.writeFile(targetDir + "index.js", content);
  console.log("🚀 ~ file: makeCommonIndex.js:20 ~ content ~ content:", content);
});
