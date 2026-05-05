# App Router

## Turbopack
Rust写的，Next.js的默认打包工具，基于Webpack，但更快速、更轻量级。

为什么用Turbopack不用webpack？

### 优势
1. Next需要输出多种环境（客户端、服务端等），多环境用多个编译器处理麻烦且易出错，Turbopack可用统一依赖图处理
2. 惰性打包，只打包开发服务器实际请求内容
3. 增量计算，针对函数缓存，只计算变化的函数，提高打包速度

## react compiler
会自动加react三个性能优化hook：useCallback、useMemo、useRef。

## 路由系统
- page router
- app router(默认)

### 和传统react vue路由配置区别
- 传统路由配置需要手动配置路由表
- app router和page router基于文件系统路由（在对应文件夹下新建文件就会自动配置路由），无需手动配置路由表

### page router和app router的区别
1. 目录结构：

page router：
```
app
└─ pages
    ├── index.tsx -> /
    ├── login.tsx -> /login
    ├── api
    │   └── user.tsx -> /api/user
    ├── posts
    │   └── [id].tsx -> /posts/[id]
    └── blog
        ├── index.tsx -> /blog
        └── setting.tsx -> /blog/setting
```

app router：根据约定定义
```
app
└─ pages
    ├── index.tsx -> /
    ├── login.tsx -> /login
    ├── api
    │   └── user.tsx -> /api/user
    ├── posts
    │   └── [id].tsx -> /posts/[id]
    └── blog
        ├── index.tsx -> /blog
        └── setting.tsx -> /blog/setting
```

2\. 读取数据方式

Pages Router 读取数据需要使用`getServerSideProps / getStaticProps / getStaticPaths`等函数，而App Router则不需要，直接在组件中使用fetch调用即可。

Page router:
```
export async function getServerSideProps() {
  const res = await fetch('xxx');
  const data = await res.json();
  return { props: { data } };
}
export default function Home({ data }) {
  return <div>{data.name}</div>;
}
```

App router:
```
export default async function Home() {
  const res = await fetch('xxx');
  const data = await res.json();
  return <div>{data.name}</div>;
}
```



## layout && template
功能都是**共享UI**，子组件可以共享layout和template中定义的UI。可**嵌套**使用。

如果layout和template都存在，包裹顺序：layout->template->page。

目录结构如下：a/b页面会共用layout和template的UI
```
app
└─ blog
   ├─ layout.tsx
   ├─ template.tsx
   ├─ a
   │  └─ page.tsx
   └─ b
      └─ page.tsx
```
### 区别
1. 持久性，layout使用useState创建的state会持久化，而template中的state不会。
2. 生命周期，layout只初始化一次，template每次切换路由时都会重新初始化（卸载再挂载）。


### loading
loading组件在页面加载时显示，页面加载完成后隐藏。

在目录结构中新建一个loading.tsx会被自动识别到并使用。

### not found（404）
next自带的not-found组件，自定义了就会覆盖next的默认not-found组件。

写在/src/app/目录下全局使用

跳转到空路径时，会自动跳转到not-found404页面。

命名：not-found.tsx

### error
error组件在页面抛出异常时显示。

在目录结构中新建一个error.tsx会被自动识别到并使用。

比较特殊，必须是客户端组件，因此要在首行添加"use client";
