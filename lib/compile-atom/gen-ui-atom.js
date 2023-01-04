const _outputUniScss = (item, options) => {
  const { fs, target, theme } = options;
  fs.writeFileSync(target, `/* ${item.summary} */  \r`, {
    flag: 'a+',
  });
  const key = [theme, item.type].join('-');
  for (let i = 0; i < item.items.length; i++) {
    const tmp = item.items[i];
    const name = [key, tmp.key].join('-');
    const value = tmp.value;
    const desc = tmp.desc ? ' // ' + tmp.desc : '';
    fs.writeFileSync(target, `$${name}: ${value};${desc}\r`, {
      flag: 'a+',
    });
  }
  fs.writeFileSync(target, '\r', { flag: 'a+' });
};
const genUniScss = (filterTypes, options) => {
  const { fs, target } = options;
  const { colors, extendsColors, noneColors } = filterTypes;
  fs.writeFileSync(target, '');
  // 颜色类
  for (let i = 0; i < colors.length; i++) {
    const item = colors[i];
    _outputUniScss(item, options);
  }
  
  // 颜色扩展类
  _outputUniScss(extendsColors, options);

  // 其它-非颜色类
  for (let i = 0; i < noneColors.length; i++) {
    const tmp = noneColors[i];
    _outputUniScss(tmp, options);
  }
};
module.exports = genUniScss;
