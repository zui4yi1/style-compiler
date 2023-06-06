#### What

一款样式组件的编绎器，通过简单的js配置，即可帮您生成通用的样式库。包含:
1. 通用的样式组件库
2. 项目相关的原子样式组件库
3. 其它相关的枚举类、ts定义等

#### Why

1. 前端开发再也不需要写样式，极大地提高了开发效率！因为样式组件库包含了你所有需要的类（除了动画和定位）。
2. 让dom的样式更具语义化，因为样式组件库的名称都是语义化的，故看下dom的class即可知道dom长啥样。
3. 极大地减省了ui组件库关于主题化的工作，不再需要为各个主题分别写样式。

#### How

1. `cd <your-config-root>`切换到配置文件的根目录
2. 准备样式的js配置文件，可参考本包的`example/demo.js`
3. 运行`npx style-unit-compiler <you-file-name>`

以本包为例:

```ts
cd example
npx style-unit-compiler demo

```

#### 输出结果
 输出均在`dist/*`下，以`example/demo.js`为例，输出结果在`example/demo/*`，主要生成了7个文件，其中：
 1. `ui-common.css`和`ui-fragment.css`是必须的，分别是通用样式组件库和项目原子样式组件库
 2. `ui-atom.scss` 原子类的scss定义，和`ui-value.ts` 原子类的js值，一般也需要
 3. `ui-typings.d.ts`  原子类的ts值，若是采用本样式组件库开发的ui组件，则可加入此ts定义
 4. 其它2个文件一般不需要

dist
    |——demo 以配置的文件名作为目录名
        |——atom-class 项目的原子样式组件库
            |——byproduct/* 副产品, 可删除
            |——ui-atom-enum.ts 原子类的js枚举值，基本上不需要
        *    |——ui-atom.scss 原子类的scss定义，一般也需要
        *    |——ui-fragment.css 项目原子样式组件库，必须
            |——ui-typings.d.ts 原子类的ts值，若是采用本样式组件库开发的ui组件，则可加入此ts定义
        *    |——ui-value.ts 原子类的js值
        |——common-class 通用样式组件库
            |——byproduct/* 副产品, 可删除
            |——ui-common-enum.ts 通用样式的枚举类，基本上不需要
        *    |——ui-common.css 通用样式组件库，必须

#### 相关插件

安装`IntelliSense for CSS class names in HTML`，可实现样式的输入自动提示，如此即可不需要去记样式组件的名称，只需要知道有哪些前缀及命名规则即可。
