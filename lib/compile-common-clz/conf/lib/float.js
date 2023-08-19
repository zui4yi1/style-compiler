module.exports = {
  float: { float: "left" },
  "float-right": { float: "right" },
  "float-none": { float: "none" },
  "float-clear": {
    // 写个无效的style, 用于拼接invalid右边的表达式
    display: 'invalid;&:before,&:after {display:table;clear:both;content:""}',
  },
};
