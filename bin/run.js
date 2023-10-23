#! /usr/bin/env node

var ProgressBar = require("progress");
var bar = new ProgressBar("编绎中[:bar]:percent", {
  total: 100,
  width: 20,
  clear: false,
});

const dirName = process.argv[2];
const cwd = process.cwd();
const confs = require(`${cwd}/${dirName}`);

// 1. 生成公共样式
const { commonClzExec } = require("../lib/compile-common-clz/conf/index");
commonClzExec(confs, cwd, dirName, bar);

// 2. 生成原子样式
const AtomCompiler = require("../lib/compile-atom/constructor-compile-atom");
const ac = new AtomCompiler(confs.theme, confs.isMutilTheme, cwd, dirName);
confs.list.forEach((item) => {
  ac.addAtom(item);
});
ac.runAtom(bar);
