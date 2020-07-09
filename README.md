ssypp-blog

> 一个简单的pc和移动端的案例

## 移动端显示效果

<div style="display:flex;flex-wrap:wrap;justify-content: space-between;">
<img src="https://wx2.sbimg.cn/2020/07/09/CAKeG.md.jpg" alt="CAKeG.md.jpg" style="zoom:33%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CAH3K.md.jpg" alt="CAH3K.md.jpg" style="zoom:33%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CAzTI.md.jpg" alt="CAKeG.md.jpg" style="zoom:33%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CAwKR.md.jpg" alt="CAH3K.md.jpg" style="zoom:33%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CAtBa.md.jpg" alt="CAKeG.md.jpg" style="zoom:33%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CAe5M.md.jpg" alt="CAH3K.md.jpg" style="zoom:33%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CA1Uh.md.jpg" alt="CAKeG.md.jpg" style="zoom:33%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAusn.md.jpg" alt="CAH3K.md.jpg" style="zoom:33%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAj0k.md.jpg" alt="CAKeG.md.jpg" style="zoom:33%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAJNj.md.jpg" alt="CAH3K.md.jpg" style="zoom:33%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAsqN.md.jpg" alt="CAH3K.md.jpg" style="zoom:33%;" />
</div>

## pc端效果展示
<div style="display:flex;flex-wrap:wrap;justify-content: space-between;">
<img src="https://wx2.sbimg.cn/2020/07/09/CAh3D.md.png" alt="CAKeG.md.jpg" style="zoom:50%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CAdTe.md.png" alt="CAH3K.md.jpg" style="zoom:50%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CARB6.md.png" alt="CAKeG.md.jpg" style="zoom:50%;" />
<img src="https://wx2.sbimg.cn/2020/07/09/CAB47.md.png" alt="CAH3K.md.jpg" style="zoom:50%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAQvV.md.png" alt="CAKeG.md.jpg" style="zoom:50%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAGsA.md.png" alt="CAH3K.md.jpg" style="zoom:50%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CA9kY.md.png" alt="CAKeG.md.jpg" style="zoom:50%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CA3N4.md.png" alt="CAH3K.md.jpg" style="zoom:50%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAoqd.md.png" alt="CAKeG.md.jpg" style="zoom:50%;" />
<img src="https://wx1.sbimg.cn/2020/07/09/CAGsA.md.png" alt="CAH3K.md.jpg" style="zoom:50%;" />
</div>	



## 背景

+ 1.以往的项目同时适配pc端和移动端是分开来单独开发的

+ 2.单端类型项目多，要么pc端适配，要么移动端适配

+ 3.想要在个人的项目中写一套适配pc和移动端

  

## 技术选择

+ vue全家桶系列(vue+(axios+qs)+vue-router+vuex)
+ es6的一些写法
+ ui框架-element(主要以栅格系统为主)
+ webpack(能看懂配置就行)
+ css -> scss
+ 富文本编辑器选择vue-quill-editor quill

## 接口文档

[来自开源社区](https://github.com/apiopen/LightBlogWeb)

```html
html接口提供者因为现采用前后端分离，所以web需要重新开发，类似于主题开发，所以前端可以多套
```

+ 1.虽然目前接口还不完善，后期应该会慢慢完善的
+ 2.不过对此感兴趣的小伙伴都可以加入，你可以当做学习，也可以为自己开发一套技术博客

## 需求清单
`下划线表示已实现`

+ ~~1.注册功能~~
+ ~~2.登录功能~~
+ ~~3.退出功能~~
+ ~~4.用户信息~~
+ ~~5.分类模块~~
+ ~~6.文章模块
  + ~~6.1发表文章~~
  + ~~6.2文章列表~~
  + ~~6.3文章详情~~
  + 6.4文章修改(参考分类里的修改即可)
  + 6.5文章删除(参考分类里的删除即可)
+ ~~7.简单适配pc和移动端~~
+ ~~8.请求封装~~
+ 9.其他功能根据接口而定或者联系接口提供者

## 项目地址

[案例项目地址](https://github.com/SSypp/ssypp-blog)

## 项目运行

``` bash
# install dependencies
yarn install or npm install

# serve with hot reload at localhost:8080
yarn dev or npm run dev

# build for production with minification
yarn run build or npm run build

# build for production and view the bundle analyzer report
yarn run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
