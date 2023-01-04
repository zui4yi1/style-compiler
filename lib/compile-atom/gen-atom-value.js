const { toCamel } = require('../../tools/common');

const _outputAtomValue = (item, options) => {
  const { fs, target, theme } = options;

  const key =
    (item.type === 'font-family' && 'family') ||
    (item.type === 'font-size' && 'font') ||
    item.type;
  for (let i = 0; i < item.items.length; i++) {
    const tmp = item.items[i];
    const name = [key, tmp.key].join('-');
    const value =
      key === 'family' && tmp.value.includes("'")
        ? tmp.value
        : `'${tmp.value}'`;
    fs.writeFileSync(target, `\t${toCamel(name)}: ${value},\r`, {
      flag: 'a+',
    });
  }
  fs.writeFileSync(target, '\r', { flag: 'a+' });
};

const genAtomValue = (filterTypes, options) => {
  const { fs, target } = options;
  const { colors, extendsColors, noneColors } = filterTypes;
  fs.writeFileSync(target, '');
  fs.writeFileSync(target, `export const atomValue = { \r`, { flag: 'a+' });
  // 颜色类
  for (let i = 0; i < colors.length; i++) {
    const item = colors[i];
    _outputAtomValue(item, options);
  }

  // 颜色扩展类
  _outputAtomValue(extendsColors, options);

  // 其它-非颜色类
  for (let i = 0; i < noneColors.length; i++) {
    const tmp = noneColors[i];
    _outputAtomValue(tmp, options);
  }
  fs.writeFileSync(target, ` } \r`, { flag: 'a+' });
};
module.exports = genAtomValue;
