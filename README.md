## svrx-plugin-tailwindcss

[![svrx](https://img.shields.io/badge/svrx-plugin-%23ff69b4?style=flat-square)](https://svrx.io/)
[![npm](https://img.shields.io/npm/v/svrx-plugin-tailwindcss.svg?style=flat-square)](https://www.npmjs.com/package/svrx-plugin-tailwindcss)

The svrx plugin for tailwindcss

## Usage

> Please make sure that you have installed [svrx](https://svrx.io/) already.

### Via CLI

```bash
svrx -p tailwindcss
```

### Via API

```js
const svrx = require("@svrx/svrx");

svrx({ plugins: ["tailwindcss"] }).start();
```

## Options

### **src \[String]:**

指定 tailwindcss src 文件路径，默认值为`tailwindcss.css`

`svrx -p tailwindcss?src=tailwindcss.css`

### **dest \[String]:**

指定 tailwindcss dest 文件路径，默认值为`tailwindcss.min.css`

`svrx -p tailwindcss?dest=css`

### **build \[String]:**

启动插件时编译 tailwindcss

`svrx -p tailwindcss?build`

## License

MIT
