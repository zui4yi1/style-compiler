

const _outputTyping = (list, options) => {
  const { fs, typing } = options;
  list.forEach((item,inx) => {
    fs.writeFileSync(
      typing,
      `  '${ item.key}' ${inx <list.length-1?'|':''} \r`,
      {
        flag: 'a+',
      }
    );
  });
};

const genUiTyping = (list, options) => {
  const { fs, typing} = options;
  fs.writeFileSync(typing, '');

  // 颜色类
  const colors = list.filter((tmp) => tmp.type === 'color');
  if (colors.length) {
    fs.writeFileSync(typing, 'type IColors =   \r', { flag: 'a+' });
    colors.forEach((item) => {
      _outputTyping(item.items, options);
    });

    // 颜色扩展类
    const extendsColorObj = { type: 'color', summary: '主色扩展', items: [] };
    colors.forEach((cur) => {
      cur.items.forEach((tmp) => {
        if (tmp.extends?.length) {
          extendsColorObj.items.push(...tmp.extends);
        }
      });
    });
    _outputTyping(extendsColorObj.items, options);
    fs.writeFileSync(typing, '; \r\r', { flag: 'a+' });
  }
  // 字体家族
  const familys = list.filter((tmp) => tmp.type === 'font-family');
  if (familys.length) {
    fs.writeFileSync(typing, 'type IFamilys =  \r', { flag: 'a+' });
    familys.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '; \r\r', { flag: 'a+' });
  }

  // 字体尺寸类
  const fonts = list.filter((tmp) => tmp.type === 'font-size');
  if (fonts.length) {
    fs.writeFileSync(typing, ' type IFonts = \r', { flag: 'a+' });
    fonts.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '; \r\r', { flag: 'a+' });
  }

  // 间距类 - 无须处理
  

  // 高度类
  const heights = list.filter((tmp) => tmp.type === 'height');
  if (heights.length) {
    fs.writeFileSync(typing, 'type IHeights= \r', { flag: 'a+' });
    heights.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '; \r\r', { flag: 'a+' });
  }

  // 圆角类
  const radius = list.filter((tmp) => tmp.type === 'radius');
  if (radius.length) {
    fs.writeFileSync(typing, ' type IRadius= \r', { flag: 'a+' });
    radius.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '; \r\r', { flag: 'a+' });
  }

};
module.exports = genUiTyping;
