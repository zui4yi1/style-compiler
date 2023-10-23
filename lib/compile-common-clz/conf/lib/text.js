const textClz = {
  text: {
    "word-break": "break-all",
  },
  "text-pre": {
    "white-space": "pre-wrap",
    "word-break": "break-all",
  },
  "text-ellipsis": {
    "text-overflow": "ellipsis",
    "word-break": "break-all",
    overflow: "hidden",
    "white-space": "nowrap",
  },
  "text-ellipsis2": {
    "text-overflow": "ellipsis",
    "word-break": "break-all",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  "text-ellipsis3": {
    "text-overflow": "ellipsis",
    "word-break": "break-all",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  "text-left": {
    "text-align": "left",
  },
  "text-center": {
    "text-align": "center",
  },
  "text-right": {
    "text-align": "right",
  },
  "text-Abc": {
    "text-transform": "Capitalize",
  },
};

module.exports = textClz;
