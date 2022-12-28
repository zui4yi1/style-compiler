const process = require('child_process')

const scssScript = require('./conf/scss-script')

const _outputRule = (list, options) => {
  const { fs, target } = options;
  list.forEach((item) => {
    fs.writeFileSync(
      target,
      `  ${item.abbreviation || item.key}: ${item.value}, \r`,
      {
        flag: 'a+',
      }
    );
  });
};

const genScssRule = (list, options) => {
  const { fs, target,script ,frament} = options;
  // 1. generate scss script
  fs.writeFileSync(script, scssScript.script);  

  // 2. generate scss rules
  fs.writeFileSync(target, '');

  // 颜色类
  const colors = list.filter((tmp) => tmp.type === 'color');
  if (colors.length) {
    fs.writeFileSync(target, '$colors: ( \r', { flag: 'a+' });
    colors.forEach((item) => {
      _outputRule(item.items, options);
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
    _outputRule(extendsColorObj.items, options);
    fs.writeFileSync(target, '); \r\r', { flag: 'a+' });
  }
  // 字体家族
  const familys = list.filter((tmp) => tmp.type === 'font-family');
  if (familys.length) {
    fs.writeFileSync(target, '$familys: ( \r', { flag: 'a+' });
    familys.forEach((item) => {
      _outputRule(item.items, options);
    });
    fs.writeFileSync(target, '); \r\r', { flag: 'a+' });
  }

  // 字体尺寸类
  const fonts = list.filter((tmp) => tmp.type === 'font-size');
  if (fonts.length) {
    fs.writeFileSync(target, '$font-sizes: ( \r', { flag: 'a+' });
    fonts.forEach((item) => {
      _outputRule(item.items, options);
    });
    fs.writeFileSync(target, '); \r\r', { flag: 'a+' });
  }

  // 间距类
  const gaps = list.filter((tmp) => tmp.type === 'gap');
  if (gaps.length) {
    fs.writeFileSync(target, '$gaps: ( \r', { flag: 'a+' });
    gaps.forEach((item) => {
      _outputRule(item.items, options);
    });
    fs.writeFileSync(target, '); \r\r', { flag: 'a+' });
  }

  // 高度类
  const heights = list.filter((tmp) => tmp.type === 'height');
  if (heights.length) {
    fs.writeFileSync(target, '$heights: ( \r', { flag: 'a+' });
    heights.forEach((item) => {
      _outputRule(item.items, options);
    });
    fs.writeFileSync(target, '); \r\r', { flag: 'a+' });
  }

  // 圆角类
  const radius = list.filter((tmp) => tmp.type === 'radius');
  if (radius.length) {
    fs.writeFileSync(target, '$radius: ( \r', { flag: 'a+' });
    radius.forEach((item) => {
      _outputRule(item.items, options);
    });
    fs.writeFileSync(target, '); \r\r', { flag: 'a+' });
  }

  // 3. gen framgent.css
  process.exec(`npx sass ${script} ${frament} --no-source-map`)
};
module.exports = genScssRule;
