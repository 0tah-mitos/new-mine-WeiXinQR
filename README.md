# IKUN 图标 - 格式欺骗测试

一个演示**浏览器内容嗅探（MIME Sniffing）**技术的实验性项目。

## 🎯 项目说明

这个项目的核心是测试：**浏览器如何识别文件类型？**

### 答案：
**浏览器看的是文件内容（Magic Bytes），而不是文件扩展名！**

## 🔬 技术细节

### 文件结构
- `index.html` - 主页面，加载并显示二维码
- `icon.ikun` - **实际是 PNG 格式的图片**，但扩展名是 `.ikun`

### 格式欺骗演示
```javascript
const img = new Image();
img.src = 'icon.ikun';  // 后缀是 .ikun（自定义）
// 浏览器：没关系，我看看文件头
// 文件头：89 50 4E 47（PNG 签名）
// 浏览器：哦，是 PNG 啊，那我就当 PNG 渲染了
```

### 文件头示例
| 格式 | Magic Bytes (十六进制) |
|------|------------------------|
| PNG  | `89 50 4E 47` |
| JPG  | `FF D8 FF` |
| GIF  | `47 49 46 38` |
| PDF  | `25 50 44 46` |

## 🚀 应用场景

1. **反爬虫** - 让爬虫误判文件类型
2. **CDN 优化** - 统一扩展名，实际内容多样化
3. **安全测试** - 绕过基于扩展名的 WAF 过滤
4. **恶作剧** - 比如这个项目 😄

## 🤔 测试方法

1. 打开 https://0tah-mitos.github.io/new-mine-WeiXinQR/
2. 按 F12 打开开发者工具
3. 查看 Network 面板，找到 `icon.ikun`
4. 发现 Response Headers 中的 `content-type` 可能是 `application/octet-stream`
5. 但图片依然正常显示！（因为浏览器进行了内容嗅探）

## 📚 延伸阅读

- [MIME Sniffing Standard](https://mimesniff.spec.whatwg.org/)
- [Wikipedia: Content sniffing](https://en.wikipedia.org/wiki/Content_sniffing)
- [MDN: MIME types (IANA media types)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

## ⚠️ 免责声明

- 这个项目仅供学习和测试使用
- 请勿用于恶意目的
- 格式欺骗可能被某些安全软件误报

## 📄 License

MIT License - 随便用，随便改 😄

---

**作者：** 0tah-mitos  
**创建时间：** 2026-05-02  
**项目类型：** 技术演示 / 实验性项目
