## What

一款样式组件编绎器, 可帮你快速的定制项目的通用样式库。

特色：把常用的样式细化为组件，形成一套丰富的、完善的、系统的"样式组件库"。由于不同项目有不同的样式风格，修改起来少不了学习成本和时间成本，为了更简单的傻瓜式操作，便有了此工具，可帮你一健生成, css, ts, js, enum 相关的通通都有。如此便可非常轻松的定制各个项目的样式组件库。

对移动端来说，提供的样式组件库已经非常完善，已经可以做到写页面、写 UI 库都不需要再写任何样式了(当然, 特效动画定位那些除外)。甚至可以做到边看 UI 设计稿、边盲写代码的地步，极大的提高了开发效率。

当前使用此技术的 UI 库：

1. `styleless-ui-for-uniapp`: [npm 地址](https://www.npmjs.com/package/styleless-ui-for-uniapp), [git 地址](https://github.com/zui4yi1/Styleless-UI-for-uniapp)(也是本人开发的, 一款专为 uniapp 开发的 UI 库。 styleless 顾名思义, 一款没写样式, 也不自带样式的 UI 库, 只要你项目的样式库也是用此工具编绎的，组件就可直接生效, 让你不再需要考虑样式覆盖的问题。)

#### 实际开发对比，以名片为例

**使用样式组件的写法:**

```vue
<div class="flex">
    <div class="radius-round rect-88 flex-shrink flex-center">
        <image />
    </div>
    <div class="flex-grow ml-d">
        <div class="font-title">名字</div>
        <div class="font-desc color-secondary">13012345678</div>
    </div>
</div>
```

**对比常规写法:**

```vue
<div class="profile-card">
    <div class="profile-card--left">
        <image />
    </div>
    <div class="profile-card--right">
        <div class="profile-card--name">名字</div>
        <div class="profile-card--phone">13012345678</div>
    </div>
</div>

<style lang="scss" scope>
.profile-card {
    display: flex;
    align-items: center;
    &--left {
      border-radius: 50%;
      width: 88px;
      height: 88px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &--right {
      flex-flow: 1;
      margin-left: 24px;
    }
    &--name {
      font-size: 30px;
    }
    &--phone {
      font-size: 24px;
      color: #cccccc;
    }
  }
</style>
```

## How

使用 npx, 无需安装。

参考本包的 example/demo.js（稍作修改即可定制你项目的样式组件库）

```node
cd example
npx style-component-compiler demo
```

如果执行报错, 检查下 sass 是否已安装

```node
npm i -g sass
```

如果还是报错, 再检查下`fs-extra, progress`(一共依赖此三个包)

## Why

当前的样式库或样式框架，可以说有非常多，有些甚至还非常专业、非常美观，也非常好用，甚至还有 `css-in-js` 这类可以在 js 中写样式的 css 框架库。
不过当前这些库或框架在定制各项目的样式时，往往还是存在一些问题：

1. 不是很方便，需要手工一个一个调，容易遗漏，还需要专门的文档。
2. 输出较少, 只有 scss 或 css. 但实际开发时只有这些是不够的, 比如定制了 3 种颜色且也只能用这三种颜色，这时如果有 ts 限制就好了。
3. 一些样式非常优秀，有定制专门风格的样式，但同时其也限制了定制化的扩展。
4. 不够干净, 过于丰富的内置样式, 但在定制过程中没有删除。比如，内置了 8 种颜色主题，但实际只需要 6 种，多出来的样式没有删除。
5. 至于 css-in-js 这类在 js 内写 css 的框架，用来写业务页面还可以，但不太适合用来开发 UI 库，因为其样式最终是挂在 style 参数上的，这就会导致样式很难覆盖了。这是其先天的缺陷。还有一个问题就是其最终都会编绎成样式, 或占内存或占代码体积, 对于小程序这类开发就不太合适了。

#### 那么，有没一种：

1. 低成本的(包括学习和开发),
2. 干净的(我要什么就给什么),
3. 易扩展的（比如我要任意数量的颜色主题和字体）,
4. 自由无限制的（无固定风格的类限制只能怎么使用, 而像 vscode 一样, 想要什么自己组合）,
5. 开发高效的（能实现 auto-complete 快速开发）,
6. 丰富完善系统的(要能满足组件和业务的开发需求),
7. 体积又非常小的 css 样式库或框架呢?

#### 基于上述考虑：

1. 本人想到的第一个方案便是"工具化"，确保输入与输出后，便能解决干净与扩展的问题了——你要什么我便给什么。
2. 还是工具化，如此可以导出`css, ts, js, enum`各类文件, 且傻瓜式的操作能确保各文件内相关的数值统一。
3. 样式语义化，即颜色、字体、间距、圆角等等属性，都有专门的前缀与名字（前缀是框架固定的、名字是开发与 UI 设计师确定的，部分名字也是框架固定或内置的）。语义化后，样式的名字是可以体现在 UI 设计稿的属性上的（需要 UI 设计师也花点时间）, 如此便可实现边看 UI 稿，边盲写代码的高效开发的大神操作。
4. 样式细化到最原始的定义。即只做最基础的定义, 而不做设计师的定义。比如一个按钮, 你要自己去选择如何展示, 如组合颜色、背景、边框、圆角等, 而不是专门有一个封装好的叫 button 的类直接供使用与扩展。不那么做的原因很简单: 避免限制、减少学习成本。
5. 确保低学习成本, 而不做复杂的设计与定义。曾经给两个做 app 原生开发的介绍此工具，只用了 10 分钟，就学会了样式组件库的功能和用法。主要体现于命名很简单, 如布局类的都是 flex-XXX, 颜色都是 color-XXX, 背景都是 bg-XXX, 等等。再配合一些能实现 auto-complete 的 vsocde 插件, 输入前缀即提示所有相关的类名，如此只要记前缀即可知道有哪些功能。

## 有什么优点（仅从开发者的角度）

1. 配置与安装非常简单, 傻瓜式的工具化操作。
2. 快，非常快，可以做到边看 UI 设计稿，边盲打代码。
3. 不用再为样式 class 的命名而烦恼
4. 干掉了业务代码内的.css 或.scss 这些文件，开发不写任何样式（动画定位那些自然除外）
5. 对于 UI 组件库开发，是一种极致的体验。普通的 UI 组件都需要自带一堆的样式或主题，但是此样式组件库，可以让 UI 库开发也能做到不写一个样式。参见 [Styleless-UI-for-uniapp](https://github.com/zui4yi1/Styleless-UI-for-uniapp)
6. 直观的展示一个元素长什么样，这是样式语义化的功劳。
7. 样式无任何嵌套，故后期界面维护非常容易。用 scss 的话嵌套就很多, 后期维护时找起来麻烦。拷贝相同的模块也麻烦，需要把样式也拷贝过去，还要注意嵌套情况。
8. 所有样式的权重都是 1, 如果是做组件开发，覆盖起来非常容易。
      ...

## 有什么缺点

缺点自然也是有的:

1. 类名多时, class 会显得比较长。这个是先天缺陷, 因为就是靠组合各种小组件来实现的。当然，这个也是有解决办法, 增加容器, 相应的类名提到相应的容器中即可。
2. 组合样式不能复用。当然要复用也是可以, 保存在 js 中作为常量即可，不过一般不去做，就比如若打字快，对不长的字符，直接手打会比拷贝粘贴来得快。

## 编绎的输出结果

输出均在`dist/*`下，以`example/demo.js`为例，输出结果在`dist/demo/*`，一共生成了 7 个文件

| 目录         | 文件名               |  是否必须  | 功能                                                       |
| :----------- | :------------------- | :--------: | :--------------------------------------------------------- |
| common-class | **ui-common.css**    |  **是**    | 公共样式组件, 常用的布局类 flex,都在这                     |
| common-class | ui-common-enum.ts    |     否     | 公共样式组件的枚举类                                       |
| atom-class   | **ui-fragment.css**  |  **是**    | 项目的原子样式组件库, 包含颜色、字体、间距、圆角等原子定义 |
| atom-class   | ui-atom.scss         |     否     | 原子常量定义，如有需要可拷贝到你的 scss 常量库中           |
| atom-class   | ui-atom-enum.ts      |     否     | 原子类的 js 枚举值                                         |
| atom-class   | ui-typings.d.ts      |     否     | 原子类的 ts 定义，若是开发 ui 组件，可引入                 |
| atom-class   | ui-value.ts          |     否     | 原子类的 js 值                                             |

其中：

1. `ui-common.css`和`ui-fragment.css`是必须的，分别是通用样式组件库和项目原子样式组件库，均已编绎成 css 文件格式
2. 其它看情况引入

## 安装相关插件

1. `IntelliSense for CSS class names in HTML`，可实现 autocomplete 功能，输入样式的前缀即得提示. 如此便可不需要去记样式组件的名称，只需要知道有哪些前缀及命名规则即可。
2. `css Navigation` 让元素的 class 具有超链接效果, 点击即可查看具体的样式定义
