const process = require('child_process')

const animateSource = require('./conf/animate.js')

const _outputClz = (fs, target, obj) => {
  Object.keys(obj).forEach((k) => {
    const props = obj[k];
    fs.writeFileSync(target, `.${k} { \r`, { flag: 'a+' });
    Object.keys(props).forEach((p) => {
      fs.writeFileSync(target, `  ${p}: ${props[p]}; \r`, { flag: 'a+' });
    });
    fs.writeFileSync(target, `}\r`, { flag: 'a+' });
  });
};

const genClz = (list, options) => {
  const { fs, animate, scss, css } = options;


  // 1. animate
  fs.writeFileSync(animate, animateSource.animate);  

  // 2. clz
  fs.writeFileSync(scss, '');
  fs.writeFileSync(scss, ` @import './animate.scss'; \r`, {
    flag: 'a+',
  });
  list.forEach((item) => {
   
    fs.writeFileSync(scss, `/* ${item.summary} */ \r`, {
      flag: 'a+',
    });
    _outputClz(fs, scss, item.items);
    fs.writeFileSync(scss, `\r`, {
      flag: 'a+',
    });
  });

  // 3. css
  process.exec(`npx sass ${scss} ${css} --no-source-map`)
};
module.exports = genClz;
