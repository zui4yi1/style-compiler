#! /usr/bin/env node
const dirName = process.argv[2];
const cwd = process.cwd();
// 1. 生成公共样式
const { commonClzExec } = require('../lib/compile-common-clz/conf/index');
commonClzExec(cwd, dirName);

// 2. 生成原子样式
const atomConfs = require(`${cwd}/${dirName}`);
const AtomCompiler = require('../lib/compile-atom/constructor-compile-atom');
const ac = new AtomCompiler(atomConfs.theme, atomConfs.isMutilTheme, cwd, dirName);

atomConfs.list.forEach(item=>{
    ac.addAtom(item)
})
ac.runAtom()
