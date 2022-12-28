const CommonClzCompiler = require('../constructor-common-clz');

const commonClzExec = (cwd = '', dirName = '') => {
  const ccc = new CommonClzCompiler(cwd, dirName);
  // 后续每个分类都放在独立的文件
  /** flex类*/
  ccc.addClz({
    type: 'flex',
    summary: 'flex类',
    items: {
      flex: {
        display: 'flex',
        'align-items': 'center',
      },
      'flex-inline': {
        display: 'inline-flex',
        'align-items': 'center',
      },
      'flex-column': {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
      },
      'flex-between': {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
      },
      'flex-around': {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-around',
      },
      'flex-wrap': {
        display: 'flex',
        'flex-wrap': 'wrap',
      },
      'flex-center': {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-center',
      },
      'flex-left': {
        'justify-content': 'flex-start',
      },
      'flex-right': {
        'justify-content': 'flex-end',
      },
      'flex-top': {
        'align-items': 'flex-start',
      },
      'flex-bottom': {
        'align-items': 'flex-end',
      },
      'flex-right': {
        display: 'flex',
        'align-items': 'flex-end',
      },
      'flex-shrink': {
        'flex-shrink': 0,
      },
      'flex-grow': {
        'flex-grow': 1,
      },
    },
  });

  /** text类 */
  ccc.addClz({
    type: 'text',
    summary: 'text类',
    items: {
      text: {
        'word-break': 'break-all',
      },
      'text-pre': {
        'white-space': 'pre-wrap',
        'word-break': 'break-all',
      },
      'text-ellipsis': {
        'text-overflow': 'ellipsis',
        'word-break': 'break-all',
        overflow: 'hidden',
        'white-space': 'nowrap',
      },
      'text-ellipsis2': {
        'text-overflow': 'ellipsis',
        'word-break': 'break-all',
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
      },
      'text-ellipsis3': {
        'text-overflow': 'ellipsis',
        'word-break': 'break-all',
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
      },
      'text-left': {
        'text-align': 'left',
      },
      'text-center': {
        'text-align': 'center',
      },
      'text-right': {
        'text-align': 'right',
      },
    },
  });

  /** border类 */
  ccc.addClz({
    type: 'border',
    summary: 'border类, 需与颜色配合使用',
    items: {
      border: {
        'border-width': '1px',
        'border-style': 'solid',
      },
      'border-dash': {
        'border-width': '1px',
        'border-style': 'dash',
      },
      'border-dotted': {
        'border-width': '1px',
        'border-style': 'dotted',
      },
      'border-none': {
        border: 'none;&:before,&:after{border:none}',
      },
      'border-top': {
        'border-top-width': '1px',
        'border-top-style': 'solid',
      },
      'border-right': {
        'border-right-width': '1px',
        'border-right-style': 'solid',
      },
      'border-bottom': {
        'border-bottom-width': '1px',
        'border-bottom-style': 'solid',
      },
      'border-left': {
        'border-left-width': '1px',
        'border-left-style': 'solid',
      },
      'border-thick': {
        'border-width': '2px',
      },
      'border-thick4': {
        'border-width': '4px',
      },
      'border-thick6': {
        'border-width': '6px',
      },
      'border-thick8': {
        'border-width': '8px',
      },
      'border-box': {
        'box-sizing': 'border-box',
      },
      'border-content': {
        'box-sizing': 'content-box',
      },
    },
  });

  /** scroll类 */
  ccc.addClz({
    type: 'scroll',
    summary: 'scroll类',
    items: {
      scroll: { overflow: 'auto' },
      'scroll-x': { 'overflow-x': 'auto' },
      'scroll-y': { 'overflow-y': 'auto' },
      'scroll-hidden': { overflow: 'hidden' },
    },
  });

  /** display类 */
  ccc.addClz({
    type: 'display',
    summary: 'display类',
    items: {
      block: { display: 'block' },
      inline: { display: 'inline' },
      'inline-block': { display: 'inline-block' },
    },
  });

  /** float 类 */
  ccc.addClz({
    type: 'float',
    summary: 'float 类',
    items: {
      float: { float: 'left' },
      'float-right': { float: 'right' },
      'float-none': { float: 'none' },
      'float-clear': {
        // 写个无效的style, 用于拼接invalid右边的表达式
        display:
          'invalid;&:before,&:after {display:table;clear:both;content:""}',
      },
    },
  });

  /** bold 类 */
  ccc.addClz({
    type: 'bold',
    summary: 'bold 类',
    items: {
      bold: { 'font-weight': 600 },
      'no-bold': { 'font-weight': 400 },
    },
  });

  /** tranform 类 */
  ccc.addClz({
    type: 'tranform',
    summary: 'tranform 类',
    items: {
      'rotate-up': { transform: 'rotate(-90deg)' },
      'rotate-down': { transform: 'rotate(90deg)' },
      'rotate-up-half': { transform: 'rotate(-45deg)' },
      'rotate-down-half': { transform: 'rotate(45deg)' },
      'scale-half': { transform: 'scale(0.5)' },
      'scale-double': { transform: 'scale(2)' },
      'trans-r-t': { transform: 'translate(50%, -50%)' },
      'trans-r-b': { transform: 'translate(50%, 50%)' },
      'trans-l-t': { transform: 'translate(-50%, -50%)' },
      'trans-l-b': { transform: 'translate(-50%, 50%)' },
    },
  });

 
  /** span 类 */
  ccc.addClz({
    type: 'span',
    summary: 'span 类',
    items: () => {
      const obj = {};
      for (i = 1; i < 25; i++) {
        obj['span-' + i] = { width: `${(100 * i) / 24}%` };
      }
      return obj;
    },
  });

  /** rect 类 */
  ccc.addClz({
    type: 'rect',
    summary: 'rect 正方形类, 从4~256, 4的倍数递增',
    items: () => {
      const obj = {};
      for (i = 1; i < 65; i++) {
        obj['rect-' + i * 4] = {
          width: `${i * 4}rpx`,
          height: `${i * 4}rpx`,
        };
      }
      return obj;
    },
  });

  /** width 类 */
  ccc.addClz({
    type: 'width',
    summary: 'width 类, 从4~128, 4的倍数递增',
    items: () => {
      const obj = {};
      for (i = 1; i < 33; i++) {
        obj['w-' + i * 4] = {
          width: `${i * 4}rpx`,
        };
      }
      return obj;
    },
  });

  /** height 类 */
  ccc.addClz({
    type: 'height',
    summary: 'height 类, 从4~128, 4的倍数递增',
    items: () => {
      const obj = {};
      for (i = 1; i < 33; i++) {
        obj['h-' + i * 4] = {
          height: `${i * 4}rpx`,
        };
      }
      return obj;
    },
  });

   /** animation 类 */
   ccc.addClz({
    type: 'animation',
    summary: 'animation 类, 当前仅提供旋转（spin还需要额外提供）',
    items: {
      spin: { animation: 'spin 1s linear infinite' },
      spin2: { animation: 'spin 2s linear infinite' },
      spin3: { animation: 'spin 3s linear infinite' },
      spin4: { animation: 'spin 4s linear infinite' },
      delayShow: {animation: 'delayShow 1s ease-out forwords'}
    },
  });


  ccc.runClz();
};

module.exports = {
  commonClzExec,
};
