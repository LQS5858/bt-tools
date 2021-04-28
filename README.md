# 类似lodash的工具库
## 构建
```
npm install
npm run build 
```
## 构建工具库文档
```
npm install
npm run docs
```
## 发布到npm
```
npm login
npm publish
```

## 例子(Example)
### CDN
```
<script src="https://unpkg.com/bt-tools@1.0.6/libs/btTools.min.js"></script>
```
### NPM
```
import {Qrcode} from 'bt-tools'
new Qrcode(content,canvas,imgDom)
```