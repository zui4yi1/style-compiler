const flexClz = {
  flex: {
    display: "flex",
    "align-items": "center",
  },
  "flex-inline": {
    display: "inline-flex",
    "align-items": "center",
  },
  "flex-column": {
    display: "flex",
    "flex-direction": "column",
  },
  "flex-column-center": {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  },
  "flex-between": {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
  },
  "flex-around": {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-around",
  },
  "flex-wrap": {
    display: "flex",
    "flex-wrap": "wrap",
  },
  "flex-center": {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  "flex-left": {
    display: "flex",
    "justify-content": "flex-start",
  },
  "flex-right": {
    display: "flex",
    "justify-content": "flex-end",
  },
  "flex-top": {
    display: "flex",
    "align-items": "flex-start",
  },
  "flex-bottom": {
    display: "flex",
    "align-items": "flex-end",
  },
  "flex-shrink": {
    "flex-shrink": 0,
  },
  "flex-grow": {
    "flex-grow": 1,
  },
};
module.exports = flexClz;
