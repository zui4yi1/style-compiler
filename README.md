#### What

一款样式组件的编绎器，通过简单的 js 配置，即可帮您生成通用的样式库。包含:

1. 通用的样式组件库
2. 项目相关的原子样式组件库
3. 其它相关的枚举类、ts 定义等

#### Why

1. 前端开发再也不需要写样式，极大地提高了开发效率！因为样式组件库包含了你所有需要的类（除了动画和定位）。
2. 让 dom 的样式更具语义化，因为样式组件库的名称都是语义化的，故看下 dom 的 class 即可知道 dom 长啥样。
3. 极大地减省了 ui 组件库关于主题化的工作，不再需要为各个主题分别写样式。
4. 让多主题更容易实现，都是公共的样式，有几种主题，就编绎几套即可。使用时可用:root 的包装一下即实现了。

#### How

先全局安装, 再使用 npx 安装:
`npm i -g style-component-compiler`

1. `cd <your-config-root>`切换到配置文件的根目录
2. 准备样式的 js 配置文件，可参考本包的`example/demo.js`
3. 运行`npx style-component-compiler <you-file-name>`

以本包为例:

```ts
npm i -g style-component-compiler
cd example
npx style-component-compiler demo

```

#### 输出结果

输出均在`dist/*`下，以`example/demo.js`为例，输出结果在`example/demo/*`，主要生成了 7 个文件，其中：

1.  `ui-common.css`和`ui-fragment.css`是必须的，分别是通用样式组件库和项目原子样式组件库
2.  `ui-atom.scss` 原子类的 scss 定义，和`ui-value.ts` 原子类的 js 值，一般也需要
3.  `ui-typings.d.ts` 原子类的 ts 值，若是采用本样式组件库开发的 ui 组件，则可加入此 ts 定义
4.  其它 2 个文件一般不需要

dist
|——demo 以配置的文件名作为目录名
|——atom-class 项目的原子样式组件库
|——byproduct/_ 副产品, 可删除
|——ui-atom-enum.ts 原子类的 js 枚举值，基本上不需要
_ |——ui-atom.scss 原子类的 scss 定义，一般也需要
_ |——ui-fragment.css 项目原子样式组件库，必须
|——ui-typings.d.ts 原子类的 ts 值，若是采用本样式组件库开发的 ui 组件，则可加入此 ts 定义
_ |——ui-value.ts 原子类的 js 值
|——common-class 通用样式组件库
|——byproduct/_ 副产品, 可删除
|——ui-common-enum.ts 通用样式的枚举类，基本上不需要
_ |——ui-common.css 通用样式组件库，必须

#### 相关插件

安装`IntelliSense for CSS class names in HTML`，可实现样式的输入自动提示，如此即可不需要去记样式组件的名称，只需要知道有哪些前缀及命名规则即可。
