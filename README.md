# GitHub Profile Page

GitHub 个人主页克隆项目，使用 React 19 和 Vite 构建，部署到 GitHub Pages。

## 项目地址

https://dukechase.github.io

## 技术栈

- React 19.2.4
- Vite 7.3.1
- Font Awesome 6.4.0

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

## 部署到 GitHub Pages

```bash
npm run deploy
```

该命令会：
1. 执行 `npm run build` 构建项目到 `dist/` 目录
2. 使用 `gh-pages` 工具将 `dist/` 内容推送到 `gh-pages` 分支

### GitHub 仓库设置

部署后需在 GitHub 仓库中配置：

1. 进入 **Settings** → **Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 **gh-pages**，目录选择 **/ (root)**
4. 点击 **Save**

等待几分钟后即可通过 `https://username.github.io` 访问。

## 分支说明

- **main** (或其他主分支)：保存源代码
- **gh-pages**：由 `gh-pages` 工具自动管理，存放构建后的静态文件

`dist/` 目录已在 `.gitignore` 中忽略，不会提交到主分支。

## 项目结构

```
src/
├── main.jsx          # 入口文件
├── App.jsx           # 主应用组件
├── styles.css        # 全局样式
└── components/       # React 组件
    ├── Navbar.jsx    # 导航栏
    ├── Sidebar.jsx   # 侧边栏（个人信息）
    ├── MainContent.jsx # 主内容区（标签页切换）
    └── RepoCard.jsx  # 仓库卡片组件
```

## 功能特性

- 亮色/暗色主题切换
- 仓库卡片网格/列表视图切换
- 响应式布局，适配移动端
- 状态持久化到 localStorage

## 注意事项

对于用户主页（`username.github.io`），`vite.config.js` 中 `base` 设置为 `'/'`。

对于项目页面（`username.github.io/repo-name`），需将 `base` 改为 `'/repo-name/'`。