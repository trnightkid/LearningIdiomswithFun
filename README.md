# 成语趣学 - 儿童成语学习应用

## Project Introduction

成语趣学是一款专为儿童设计的成语学习移动应用，由开发者庄先生为自己的女儿 Celine 精心打造。

I developed this app for my daughter Celine, hoping she can gain more life insights while learning Chinese idioms' backgrounds and cultural knowledge.

庄先生为了让孩子们更好地学习中国传统文化，掌握成语典故与释义，开发了这款寓教于乐的学习工具。App通过趣味练习、每日打卡等方式，帮助孩子在轻松愉快的氛围中积累成语知识。

## Latest Updates

- 🚀 **成语数据库全面升级**：从原来的166条扩展至 **30,895条** 全量成语，数据来源于热门的 chinese-xinhua 开源项目
- ✨ **首页标语优化**：采用更适合小学生的激励话语，充满正能量和鼓励
- 📝 **每日一练**：每次练习题数量从5道提升至30道，让学习更充实

## 主要功能

### 1. 首页
- 每日打卡功能，连续学习记录
- 今日学习进度追踪（每日3条目标）
- 今日推荐成语（随机推荐）
- 激励人心的每日标语

### 2. 成语词典
- 完整成语库查询（30,895条全量成语）
- 支持搜索成语、拼音、释义
- 按难度筛选：简单、中等、困难
- 按分类筛选：寓言、品德、景色、学习、情感、哲理、历史、动物等

### 3. 每日一练
- 趣味选择题练习
- 每次30道题目
- 显示正确答案和解析
- 完成后显示得分和评价

### 4. 打卡日历
- 月历形式展示学习记录
- 连续打卡成就系统（7天/30天/100天）
- 可视化学习趋势

### 5. 学习报告
- 总学习次数统计
- 收藏成语数量
- 近7天学习趋势图表
- 能力分布分析（词汇量、典故理解、学习坚持等）

### 6. 收藏功能
- 收藏喜欢的成语
- 随时回顾学习

## 技术栈

- **前端框架**：React + TypeScript
- **构建工具**：Vite
- **样式**：CSS
- **状态管理**：Zustand + localStorage 持久化
- **移动端**：支持 Capacitor 打包为 iOS/Android 应用

## 数据来源

成语数据来自 [chinese-xinhua](https://github.com/pwxcoo/chinese-xinhua) 开源项目，这是最热门的成语数据库，包含：
- 31,648条成语（实际可用30,895条）
- 拼音、释义、出处、例句
- Star 8k+

## 数据结构

每条成语包含以下信息：
- 拼音（pinyin）
- 难度等级（level）：easy / medium / hard
- 分类（category）
- 释义（definition）
- 典故故事（story）
- 出处（source）
- 例句（example）
- 近义词（similar）
- 反义词（opposite）
- 记忆小技巧（memoryTip）

## 安装与运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 数据统计

- 总成语数量：30,895条
- 分类涵盖：寓言、品德、景色、学习、情感、哲理、历史、动物、动作、数字、状态等

## 开发者

- **开发**：庄先生
- **目的**：帮助孩子学习中国成语典故
- **适合**：儿童及成语初学者

## 版权说明

本应用仅供学习交流使用，成语内容版权归原作者所有。

---

*庄先生希望这套应用能让更多孩子爱上成语学习，传承中华文化。*
*I hope this app can help more children fall in love with idioms and inherit Chinese culture.*