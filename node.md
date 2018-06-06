### 打包：
> npm run pkg

* src -> index ,全方法入口

* src -> 目录下的index.js为该类的方法汇总

```
    例如： cookie -> index.js
        为: setCookie.js
            removeCookie.js
            getCookie.js
        的汇总文件
```

* min -> webpack编译的全量方法的 **umd** 文件

