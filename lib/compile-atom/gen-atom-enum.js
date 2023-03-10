const { toCamel } = require('../../tools/common');
const _outputAtom = (type, list, options) => {
  const { fs, target, needDesc = false } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${type}: ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(target, `  ${toCamel(prop)}: '${prop}', \r`, {
      flag: 'a+',
    });
  });
};

const _outputSingleGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(target, `  ${toCamel(prop)}: '${prop}', \r`, {
      flag: 'a+',
    });
  });
};
const _outputTBGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: ${value} 0 */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(target, `  ${toCamel(prop)}: '${prop}', \r`, {
      flag: 'a+',
    });
  });
};

const _outputLRGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: 0 ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(target, `  ${toCamel(prop)}: '${prop}', \r`, {
      flag: 'a+',
    });
  });
};

const _outputAllGapAtom = (type, desc, list, options) => {
  const { fs, target, needDesc = false } = options;
  list.forEach(({ key, value, abbreviation }) => {
    const prop = `${type}-${abbreviation || key}`;
    if (needDesc) {
      fs.writeFileSync(target, `/** ${desc}: ${value} */\r`, { flag: 'a+' });
    }
    fs.writeFileSync(target, `  ${toCamel(prop)}: '${prop}', \r`, {
      flag: 'a+',
    });
  });
};

/** ??????js?????????, ??????js?????????conf/scss-script.scss?????? */
const genAtom = (list, options) => {
  const { fs, target } = options;
  fs.writeFileSync(target, '');

  // ??????????????????, ??????colors, gaps, font-size, font-family??????????????????????????????????????????
  // ??????????????????
  const colors = list.filter((tmp) => tmp.type === 'color') || [];
  const extendsColorObj = { type: 'color', summary: '????????????', items: [] };
  colors.forEach((cur) => {
    cur.items.forEach((tmp) => {
      if (tmp.extends?.length) {
        extendsColorObj.items.push(...tmp.extends);
      }
    });
  });
  // ?????????
  const gaps = list.filter((tmp) => tmp.type === 'gap') || [];

  // ???????????????
  const fonts = list.filter((tmp) => tmp.type === 'font-size') || [];

  // ???????????????
  const familys = list.filter((tmp) => tmp.type === 'font-family') || [];

  // ?????????
  const others = list.filter(
    (tmp) => !['color', 'gap', 'font-size', 'font-family'].includes(tmp.type)
  );

  // 1. ??????ts????????????
  fs.writeFileSync(target, `/* ?????????atom?????????, ?????????????????????string */ \r`, {
    flag: 'a+',
  });
  fs.writeFileSync(target, `interface IAtom { \r`, { flag: 'a+' });

  // 1.1 ?????????????????????????????????????????????
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

  // 1.2 ????????????m,p,mtb,mlr,ptb,plr,p-all??????????????????
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

  // 1.3 ??????????????????
  others.forEach((item) => {
    _outputAtom(
      item.type,
      item.items,
      Object.assign({ needDesc: true }, options)
    );
  });

  fs.writeFileSync(target, `} \r\r`, { flag: 'a+' });

  // 2. ?????????????????????????????????IAtom?????????????????????, ??????????????????
  fs.writeFileSync(target, `/* ?????????atom */ \r`, {
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
