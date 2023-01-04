const { toCamel } = require('../../tools/common');
const _outputAtom = (type, list, options) => {
  const { fs, target, needDesc = false, theme, isMutilTheme } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${type}: ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(
      target,
      `  ${toCamel(prop)}: '${isMutilTheme ? theme + '-' : ''}${prop}', \r`,
      {
        flag: 'a+',
      }
    );
  });
};

const _outputSingleGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false, theme, isMutilTheme } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(
      target,
      `  ${toCamel(prop)}: '${isMutilTheme ? theme + '-' : ''}${prop}', \r`,
      {
        flag: 'a+',
      }
    );
  });
};
const _outputTBGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false, theme, isMutilTheme } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: ${value} 0 */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(
      target,
      `  ${toCamel(prop)}: '${isMutilTheme ? theme + '-' : ''}${prop}', \r`,
      {
        flag: 'a+',
      }
    );
  });
};

const _outputLRGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false, theme, isMutilTheme } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: 0 ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(
      target,
      `  ${toCamel(prop)}: '${isMutilTheme ? theme + '-' : ''}${prop}', \r`,
      {
        flag: 'a+',
      }
    );
  });
};

const _outputAllGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false, theme, isMutilTheme } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(
      target,
      `  ${toCamel(prop)}: '${isMutilTheme ? theme + '-' : ''}${prop}', \r`,
      {
        flag: 'a+',
      }
    );
  });
};

/** 生成js枚举值, 注意js需要与conf/scss-script.scss对齐 */
const genAtom = (list, options) => {
  const { fs, target } = options;
  fs.writeFileSync(target, '');

  // 先取出各类型, 其中colors, gaps, font-size, font-family的生成规则不一样，其它都一样
  // 颜色与扩展类
  const colors = list.filter((tmp) => tmp.type === 'color') || [];
  const extendsColorObj = { type: 'color', summary: '主色扩展', items: [] };
  colors.forEach((cur) => {
    cur.items.forEach((tmp) => {
      if (tmp.extends?.length) {
        extendsColorObj.items.push(...tmp.extends);
      }
    });
  });
  // 间距类
  const gaps = list.filter((tmp) => tmp.type === 'gap') || [];

  // 文体尺寸类
  const fonts = list.filter((tmp) => tmp.type === 'font-size') || [];

  // 文体家族类
  const familys = list.filter((tmp) => tmp.type === 'font-family') || [];

  // 其它类
  const others = list.filter(
    (tmp) => !['color', 'gap', 'font-size', 'font-family'].includes(tmp.type)
  );

  // 1. 生成ts类型定义
  fs.writeFileSync(target, `/* 原子类atom的类型, 定义下避免默认string */ \r`, {
    flag: 'a+',
  });
  fs.writeFileSync(target, `interface IAtom { \r`, { flag: 'a+' });

  // 1.1 依次生成文字、边框、背景的颜色
  const types = ['color', 'border', 'bg'];
  types.forEach((type) => {
    colors.forEach((item) => {
      _outputAtom(type, item.items, Object.assign({ needDesc: true }, options));
    });
    _outputAtom(
      type,
      extendsColorObj.items,
      Object.assign({ needDesc: true }, options)
    );
  });

  // 1.2 依次生成m,p,mtb,mlr,ptb,plr,p-all相关的间距类
  const directs = {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
  };

  Object.keys(directs).forEach((k) => {
    _outputSingleGapAtom(
      `m${k}`,
      `margin-${directs[k]}`,
      gaps[0].items,
      Object.assign({ needDesc: true }, options)
    );
  });
  Object.keys(directs).forEach((k) => {
    _outputSingleGapAtom(
      `p${k}`,
      `padding-${directs[k]}`,
      gaps[0].items,
      Object.assign({ needDesc: true }, options)
    );
  });

  _outputTBGapAtom(
    `mtb`,
    `margin `,
    gaps[0].items,
    Object.assign({ needDesc: true }, options)
  );
  _outputTBGapAtom(
    `ptb`,
    `padding `,
    gaps[0].items,
    Object.assign({ needDesc: true }, options)
  );

  _outputLRGapAtom(
    `mlr`,
    `margin `,
    gaps[0].items,
    Object.assign({ needDesc: true }, options)
  );
  _outputLRGapAtom(
    `plr`,
    `padding `,
    gaps[0].items,
    Object.assign({ needDesc: true }, options)
  );

  _outputAllGapAtom(
    `p-all`,
    `padding `,
    gaps[0].items,
    Object.assign({ needDesc: true }, options)
  );

  fonts.forEach((item) => {
    _outputAtom('font', item.items, Object.assign({ needDesc: true }, options));
  });
  familys.forEach((item) => {
    _outputAtom(
      'family',
      item.items,
      Object.assign({ needDesc: true }, options)
    );
  });

  // 1.3 生成其它类型
  others.forEach((item) => {
    _outputAtom(
      item.type,
      item.items,
      Object.assign({ needDesc: true }, options)
    );
  });

  fs.writeFileSync(target, `} \r\r`, { flag: 'a+' });

  // 2. 生成原子样式类，与上述IAtom的定义是一样的, 只是少了注释
  fs.writeFileSync(target, `/* 原子类atom */ \r`, {
    flag: 'a+',
  });
  fs.writeFileSync(target, `export const atom:IAtom = { \r`, { flag: 'a+' });

  types.forEach((type) => {
    colors.forEach((item) => {
      _outputAtom(type, item.items, options);
    });
    _outputAtom(type, extendsColorObj.items, options);
  });
  Object.keys(directs).forEach((k) => {
    _outputSingleGapAtom(
      `m${k}`,
      `margin-${directs[k]}`,
      gaps[0].items,
      options
    );
  });
  Object.keys(directs).forEach((k) => {
    _outputSingleGapAtom(
      `p${k}`,
      `padding-${directs[k]}`,
      gaps[0].items,
      options
    );
  });

  _outputTBGapAtom(`mtb`, `margin `, gaps[0].items, options);
  _outputTBGapAtom(`ptb`, `padding `, gaps[0].items, options);

  _outputLRGapAtom(`mlr`, `margin `, gaps[0].items, options);
  _outputLRGapAtom(`plr`, `padding `, gaps[0].items, options);

  _outputAllGapAtom(`p-all`, `padding `, gaps[0].items, options);

  fonts.forEach((item) => {
    _outputAtom('font', item.items, options);
  });
  familys.forEach((item) => {
    _outputAtom('family', item.items, options);
  });
  others.forEach((item) => {
    _outputAtom(item.type, item.items, options);
  });

  fs.writeFileSync(target, ` } \r`, { flag: 'a+' });
};
module.exports = genAtom;
