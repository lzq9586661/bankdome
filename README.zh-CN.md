# 简介

[vue-element-admin](https://panjiachen.github.io/vue-element-admin) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。

**`v4.1.0+`版本之后默认 master 分支将不支持国际化，有需要的请使用[i18n](https://github.com/PanJiaChen/vue-element-admin/tree/i18n)分支，它会和 master 保持同步更新**

**该项目不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

**目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若发现问题，欢迎提[issue](https://github.com/PanJiaChen/vue-element-admin/issues/new)。若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-element-admin/tree/tag/3.11.0)，它不依赖 `vue-cli`**

## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

通过配置vue.config.js里devServe里的配置proxy来实现跨域处理，接口联调开发。
通过配置vue.config.js里devServe里的配置before来实现本地mock开发，proxy注释。
mock/user.js在登录和获取用户信息接口里面配置用户信息和路由菜单实现项目开发。

通过 `npm install vue-cron` 安装cron表达式插件。在使用的时候会提示babel-polyfill存在多个导致渲染问题。此时将项目下的cron.min.js文件复制到`node_modules/vue-cron/build`，替换已有的cron.min.js即可解决。

开发过程中，可能会和不同的后台开发进行接口对接，以及上传回显等需要后台开发的ip，此时只需要在`src/setting.js`里修改`devIp`为后台开发的ip，然后重启项目即可。

```

浏览器访问 <http://localhost:9527>

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查并自动修复
npm run lint
```

## Browsers support

Modern browsers and Internet Explorer 10+

## 简介

Element UI表单设计及代码生成器，可将生成的代码直接运行在基于Element的vue项目中；也可导出JSON表单，使用配套的解析器将JSON解析成真实的表单。

- 【[国内预览地址](https://mrhj.gitee.io/form-generator)】 【[国际预览地址](https://jakhuang.github.io/form-generator)】
- 【[github仓库](https://github.com/JakHuang/form-generator)】 【 [码云仓库](https://gitee.com/mrhj/form-generator)】
- [配套vscode插件](https://github.com/JakHuang/form-generator-plugin)
- [配套JSON解析器](https://github.com/JakHuang/form-generator/blob/dev/src/components/parser/example/Index.vue)

## 文档

- [el-dialog的封装与调用](https://github.com/JakHuang/form-generator/wiki/el-dialog%E7%9A%84%E5%B0%81%E8%A3%85%E4%B8%8E%E8%B0%83%E7%94%A8)
- [项目主要结构分析](https://github.com/JakHuang/form-generator/wiki/%E9%A1%B9%E7%9B%AE%E4%B8%BB%E8%A6%81%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90)
- [【常见问题】如何以npm的方式集成monaco编辑器](https://github.com/JakHuang/monaco-vue-demo)
- 系列教程：
[《表单设计器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/30)
[《表单解析器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/32)
[《vue代码生成器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/31)
[《vue代码预览器 · 开发教程》](https://github.com/JakHuang/form-generator/issues/33)

## JSON解析器

将保存在数据库中的JSON表单，解析成真实的表单  
[查看在线示例](https://mrhj.gitee.io/form-generator/#/parser)
