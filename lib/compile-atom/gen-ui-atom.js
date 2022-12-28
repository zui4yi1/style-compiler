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
const genUniScss = (list, options) => {
  const { fs, target } = options;
  fs.writeFileSync(target, '');
  // 颜色类
  const colors = list.filter((tmp) => tmp.type === 'color');
  for (let i = 0; i < colors.length; i++) {
    const item = colors[i];
    _outputUniScss(item, options);
  }
  // 颜色扩展类
  const extendsColorObj = { type: 'color', summary: '主色扩展', items: [] };
  colors.forEach((cur) => {
    cur.items.forEach((tmp) => {
      if (tmp.extends?.length) {
        extendsColorObj.items.push(...tmp.extends);
      }
    });
  });
  _outputUniScss(extendsColorObj, options);
  // 其它-非颜色类
  const others = list.filter((tmp) => tmp.type !== 'color');
  for (let i = 0; i < others.length; i++) {
    const tmp = others[i];
    _outputUniScss(tmp, options);
  }
};
module.exports = genUniScss;
