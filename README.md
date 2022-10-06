## 项目名称
   《MCAKE蛋糕订购平台》

## 项目介绍
	本项目是一个面向部分城市群体的蛋糕定制网站，
	为指定区域的用户提供在线定制、实时配送，
	打造线上线下相结合的个性化蛋糕定制服务。

## 开发环境及工具
	1. Windows10
	2. Nodejs-16.11.1  (注:Nodejs-14.19.0也可以)
	3. HbuilderX-App开发版
	4. Edge浏览器

## 技术栈
	1. Vuejs 数据驱动
	2. Uniapp 跨平台能力
	3. Vuex   集中式状态管理
	4. SCSS   样式预编译
	5. ColorUI 高效UI布局
	6. uViewUI  功能性组件
	7. LeanCloud  数据的云存储服务

## 项目架构
|--bus          可选的事件总线通信
|--colorui      UI布局样式库
|--components   项目公共组件
|--node_modules 项目依赖
|--pages        项目页面组件
|--static       静态资源文件夹
|--store        状态机文件
   |--address.js    收货地址数据	
   |--cart.js       购物车数据	
   |--condition.js  商品列表筛选数据条件	
   |--user.js       用户信息数据	
   |--index.js      状态机对象模块	
|--utils            工具包
   |--request.js    异步请求方法封装	
|--App.vue          项目根组件
|--index.html       SPA单页面模板文件
|--main.js          项目核心入口文件
|--manifest.json    项目跨平台打包相关配置文件
|--pacakge.json     项目信息记录文件
|--pages.json       项目全局配置文件
|--README.md        项目说明
|--uni.scss         全局样式文件

## 功能板块
	1. 首页
	2. 分类列表
	3. 商品列表
	4. 商品筛选
	5. 分页加载
	6. 下拉刷新
	7. 购物车
	8. 购物车设置弹窗
	9. 地址管理
	10. 默认地址
	11. 注册
	12. 登录