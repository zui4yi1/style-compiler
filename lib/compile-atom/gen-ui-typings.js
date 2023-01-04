const _outputTyping = (list, options) => {
  const { fs, typing } = options;
  list.forEach((item, inx) => {
    fs.writeFileSync(typing, `\t| '${item.key}'\r`, {
      flag: 'a+',
    });
  });
};

const genUiTyping = (filterTypes, options) => {
  const { fs, typing } = options;

  const {
    colors,
    extendsColors,
    familys,
    fonts,
    heights,
    radius,
    masks,
    shadows,
  } = filterTypes;

  fs.writeFileSync(typing, '');

  // 颜色类
  if (colors.length) {
    fs.writeFileSync(typing, 'type IColor =   \r', { flag: 'a+' });
    colors.forEach((item) => {
      _outputTyping(item.items, options);
    });

    // 颜色扩展类
    _outputTyping(extendsColors.items, options);
    fs.writeFileSync(typing, '\r', { flag: 'a+' });
  }
  // 字体家族
  if (familys.length) {
    fs.writeFileSync(typing, 'type IFamily =  \r', { flag: 'a+' });
    familys.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '\r', { flag: 'a+' });
  }

  // 字体尺寸类
  if (fonts.length) {
    fs.writeFileSync(typing, ' type IFont = \r', { flag: 'a+' });
    fonts.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '\r', { flag: 'a+' });
  }

  // 间距类 - 无须处理

  // 遮罩类
  if (masks.length) {
    fs.writeFileSync(typing, 'type IMask= \r', { flag: 'a+' });
    masks.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '\r', { flag: 'a+' });
  }

  // 阴影类
  if (shadows.length) {
    fs.writeFileSync(typing, 'type IShadow= \r', { flag: 'a+' });
    shadows.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '\r', { flag: 'a+' });
  }

  // 高度类
  if (heights.length) {
    fs.writeFileSync(typing, 'type IHeight= \r', { flag: 'a+' });
    heights.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '\r', { flag: 'a+' });
  }

  // 圆角类
  if (radius.length) {
    fs.writeFileSync(typing, ' type IRadius= \r', { flag: 'a+' });
    radius.forEach((item) => {
      _outputTyping(item.items, options);
    });
    fs.writeFileSync(typing, '\r', { flag: 'a+' });
  }
};
module.exports = genUiTyping;
