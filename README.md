# nuxt-cnode

> 基于 [Nuxt](https://github.com/nuxt/nuxt.js) (服务器端渲染 [SSR](https://ssr.vuejs.org/zh/)) 构建 [CNode](https://cnodejs.org/) 社区

## 提前知晓 80%

### 未登录

![未登录](./screenshot/anonymous.gif)

### 登录中

![登录中](./screenshot/user.gif)

### 响应式

![登录中](./screenshot/responsive.gif)

## 项目结构

```md
|__ README.md
|__ client                                    # 客户端
  |__ .DS_Store
  |__ app.html                                  # 自定义入口文件
  |__ assets                                    # 资源文件
    |__ .DS_Store
    |__ README.md
    |__ prettify                                  # 代码美化
      |__ lang-*.js
      |__ prettify.css
      |__ prettify.js
      |__ run_prettify.js
    |__ theme                                     # 主题样式
      |__ common
        |__ mixins.scss
        |__ utils.scss
        |__ var.scss                                # SCSS 变量
      |__ font.scss                                 # 字体
      |__ index.scss
      |__ reset.scss                                # 样式重置
  |__ common                                    # 通用工具
    |__ cache.js                                  # 缓存
    |__ constants.js                              # 常量
    |__ http.js                                   # 异步请求 axios
    |__ store.js                                  # 本地存储 store2
    |__ utils.js                                  # 懒加载 + 权限 mixins
  |__ components                                # 公共组件
    |__ AppLogo.vue
    |__ README.md
    |__ alert.vue                                 # 警告提示
    |__ breadcrumb                                # 面包屑
      |__ index.vue
      |__ item.vue
    |__ col                                       # 栅格 col
      |__ index.js
      |__ index.scss
    |__ comment.vue                               # 评论
    |__ latest-topic-item.vue                     # 最新话题项
    |__ layout                                    # 通用布局
      |__ footer.vue                                # 尾部
      |__ header.vue                                # 头部
    |__ lazy-wrapper.vue                          # 懒加载 wrapper
    |__ message-item.vue                          # 消息项
    |__ pagination                                # 分页
      |__ index.scss
      |__ index.vue
    |__ row                                       # 栅格 row
      |__ index.js
      |__ index.scss
    |__ sidebar                                   # 侧边栏
      |__ about.vue                                 # 关于
      |__ anonymous.vue                             # 未登录信息
      |__ author.vue                                # 作者信息
      |__ client-qrcode.vue                         # 二维码
      |__ create-topic.vue                          # 创建话题
      |__ friends-link.vue                          # 友情链接
      |__ leaderboard.vue                           # 排行榜
      |__ noreply-topic.vue                         # 无人回复的话题
      |__ personal.vue                              # 用户信息
      |__ sidebar-wrapper.vue                       # 侧边栏 wrapper
    |__ spinner.vue                               # 加载
    |__ topic-item.vue                            # 话题项
  |__ layouts                                   # 布局
    |__ README.md
    |__ default.vue                               # 默认布局
    |__ sidebar.vue                               # 侧边栏布局
  |__ middleware                                # 中间件
    |__ README.md
    |__ auth.js                                   # 权限
  |__ pages                                     # 页面
    |__ README.md
    |__ _tab                                      # 话题标签页
      |__ _page.vue
    |__ about                                     # 关于
      |__ index.vue
    |__ apiv1                                     # API
      |__ index.vue
    |__ getstart                                  # 新手入门
      |__ index.vue
    |__ index.vue
    |__ my                                        # 我的消息
      |__ messages.vue
    |__ setting                                   # 设置
      |__ index.vue
    |__ signin                                    # 登录
      |__ index.vue
    |__ topic                                     # 话题
      |__ _id
        |__ edit.vue                                # 话题编辑
        |__ index.vue                               # 话题详情
      |__ create                                    # 话题创建
        |__ index.vue
    |__ user                                      # 用户
      |__ _name
        |__ collections.vue                          # 收藏
        |__ index.vue                                # 主页
  |__ plugins                                   # 插件
    |__ README.md
    |__ axios.js                                  # axios 拦截器
    |__ filters.js                                # 通用 Vue filter
    |__ localStorage.js                           # vuex 本地化（vue-persistence）
    |__ packages.js                               # 通用组件注册
  |__ static
    |__ README.md
    |__ favicon.ico
  |__ store                                      # vuex
    |__ README.md
    |__ index.js
|__ nuxt.config.js                             # nuxt 配置
|__ package.json
|__ screenshot
|__ server                                     # 服务端
  |__ app.js                                     # 入口文件
  |__ util
    |__ handle-login.js                          # 登录
    |__ proxy.js                                 # 通用 api
|__ yarn.lock
```

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
