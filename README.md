# yy-spec：规格驱动开发，适配你的团队工作流

<!-- npm badges -->
[![npm version](https://img.shields.io/npm/v/yy-spec?logo=npm)](https://www.npmjs.com/package/yy-spec?activeTab=readme)
[![install size](https://packagephobia.com/badge?p=yy-spec)](https://packagephobia.com/result?p=yy-spec)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

<div align="center" style="font-size: 1.1rem; margin-bottom: 1rem;"><sub>
<a href="./tools/cc-sdd/README.md">English</a> | <a href="./tools/cc-sdd/README_zh.md">简体中文</a>
</sub></div>

## 将 AI 编程 Agent 升级为生产就绪的规格驱动开发

**一条命令安装。小时级交付。需求 → 设计 → 任务 → 实现。**

告别 70% 的时间浪费在会议、文档仪式和零散上下文上。yy-spec 为 Claude Code、Cursor、Gemini CLI、Codex CLI、GitHub Copilot、Qwen Code、OpenCode 和 Windsurf 带来结构化的 **AI-DLC**（AI 驱动开发生命周期）与 **规格驱动开发**。

### 你将获得：
- **规格优先保障** — 先审批需求和设计，AI 再严格按规格实现
- **并行执行就绪** — 任务拆解支持并发实现，带依赖追踪
- **团队模板对齐** — 自定义一次，所有 Agent 输出符合你的审批流程
- **项目记忆持久化** — AI 跨会话记住你的架构、模式和标准
- **8 Agent 统一工作流** — Claude、Cursor、Gemini、Codex、Copilot、Qwen、OpenCode、Windsurf
- **小时级交付** — 功能规划从数天压缩到数小时

## 🚀 快速开始

```bash
# 在项目根目录运行
cd your-project
npx yy-spec@latest --claude --lang zh    ## Claude Code（简体中文）

# 安装完成！现在运行：
/yy:steering                            # 首次使用必须先建立项目上下文
/yy:feature 用户认证系统，支持 OAuth     # 开始开发功能
```

**安装只需 30 秒。** 支持 8 种 Agent（Claude Commands / Subagents、Cursor、Gemini、Codex、Copilot、Qwen、OpenCode、Windsurf），中英双语。

> **致谢**: 本项目 Fork 自 [cc-sdd](https://github.com/gotalab/cc-sdd)（[@gotalab](https://github.com/gotalab)）。感谢原作者创建的优秀规格驱动开发框架。

📖 **下一步：** [安装选项](#%EF%B8%8F-安装选项) | [命令参考](docs/guides/zh/command-reference.md) | [规格驱动指南](docs/guides/zh/spec-driven.md)

---

## 🎯 应用场景与命令详解

yy-spec 提供两类工作流：**自动工作流**（端到端自闭环）和**分步工作流**（每阶段手动控制）。以下按实际开发场景说明何时使用哪些命令。

### 前置条件：建立项目上下文

**所有场景都需要先运行一次 `steering`。**

```bash
/yy:steering
```

- **首次运行（Bootstrap）**：扫描代码库，自动生成 `product.md`（产品定位）、`tech.md`（技术栈）、`structure.md`（项目结构）到 `.yy-dev/steering/` 目录
- **后续运行（Sync）**：检测代码与 steering 的偏差，增量更新，保留你的自定义内容
- **作用**：为后续所有命令提供完整的项目上下文，显著提升 AI 生成的规格质量

> 如果跳过 steering，后续命令会直接报错并要求你先运行它。

---

### 场景一：开发新功能（推荐入口）

**命令：** `/yy:feature <功能描述>`

这是最常用的入口命令。它会**自动评估功能规模**，选择合适的路径：

```bash
/yy:feature 照片相册，支持上传、标签和分享
```

**小型功能**（≤3 个文件变更，无架构调整）：

```
/yy:feature → 自动评估为"小" → 生成简化设计 → TDD 实现 → 代码审查 → 自动关闭规格
```

完整流程在一个会话内完成：
1. 创建规格目录 `.yy-dev/specs/<feature-name>/`
2. 生成 `requirements.md` 和简化版 `design.md`
3. TDD 循环：写失败测试 → 实现代码 → 重构 → 验证全部测试通过
4. 自动代码审查，发现问题则修复后重新审查
5. 更新 changelog，关闭规格

**大型功能**（>3 个文件，涉及架构变更，复杂依赖）：

```
/yy:feature → 自动评估为"大" → 生成完整规格文档 + 实现计划 → 提示开新会话执行
```

1. 创建规格目录
2. 生成完整的 `requirements.md`、`design.md`、`research.md`
3. 生成带依赖关系的实现计划
4. 输出："计划已生成，请在新会话中运行 `/yy:plan-exec <feature-name>` 执行。"

> **为什么大型功能不直接实现？** 因为大型功能的实现会消耗大量上下文窗口，在新会话中执行可以保证每个任务都有干净的上下文。

---

### 场景二：执行大型功能计划

**命令：** `/yy:plan-exec [spec-name]`

当 `/yy:feature` 生成了大型功能的计划后，在**新会话**中执行：

```bash
/yy:plan-exec photo-albums
```

执行流程：
1. 加载规格目录中的所有文档（spec.json、requirements.md、design.md、计划文件）
2. 加载 steering 上下文
3. 按计划顺序逐任务执行，每个任务遵循 TDD（RED → GREEN → REFACTOR）
4. 每个任务完成后验证测试通过，再进入下一个
5. 全部完成后自动代码审查
6. 更新 changelog，关闭规格

> 如果不指定 spec-name，会自动查找状态为 "planned" 的最新规格。

---

### 场景三：修复 Bug

**命令：** `/yy:fix <Bug 描述>`

**适用于你已经知道是 Bug 的情况**，需要直接修复：

```bash
/yy:fix 邮箱包含大写字母时登录失败
```

完整流程：
1. 创建 `fix-<name>/` 规格目录，生成 `investigation.md`
2. 分析代码库，定位根因，记录到 investigation.md
3. **TDD 修复**：
   - RED：写一个能重现该 Bug 的失败测试
   - GREEN：实现最小修复使测试通过
   - REFACTOR：清理代码
   - VERIFY：运行全部测试，确认无回归
4. 自动代码审查（发现问题则修复后重新审查）
5. 生成 `fix-summary.md`（根因分析、修复说明、影响范围）
6. 更新 changelog，关闭规格

> **如果无法重现 Bug**，会建议你使用 `/yy:investigate` 进行更深入的调查。

---

### 场景四：调查不确定的问题

**命令：** `/yy:investigate <问题描述>`

**适用于你不确定是不是 Bug、根因不明的情况：**

```bash
/yy:investigate 为什么会话过早过期
```

采用 **4 阶段系统化调查**方法：

| 阶段 | 内容 |
|------|------|
| **Phase 1：根因调查** | 读取错误信息、日志、堆栈追踪；尝试重现；检查近期变更 |
| **Phase 2：模式分析** | 找到类似功能的正常示例，对比正常与异常的代码路径 |
| **Phase 3：假设与验证** | 形成可测试的假设，逐个验证（单变量测试） |
| **Phase 4：结论** | 综合发现，分类为 **Bug** / **非 Bug** / **需要更多信息** |

根据结论自动进入下一步：
- **确认是 Bug** → 询问是否修复 → 用户确认后自动进入 TDD 修复流程（同 `/yy:fix`）
- **非 Bug** → 记录解释，如果是缺失功能则建议使用 `/yy:feature`
- **需要更多信息** → 列出还需要的信息，建议后续步骤

---

### 场景五：查看规格进度

**命令：** `/yy:status [spec-name]`

```bash
/yy:status                    # 列出所有规格的状态概览
/yy:status photo-albums       # 查看指定规格的详细状态
```

- 不带参数：以表格形式展示所有规格（名称、类型、状态、更新时间），按状态分组（open → planned → closed）
- 带参数：展示指定规格的详细信息，包括进度（任务完成数）、下一步操作建议

---

### 场景六：分步控制工作流（高级用法）

当你需要在每个阶段手动审查和控制时，使用分步命令。适用于复杂的已有项目增强、需要 validate 门禁的场景。

**典型流程：**

```
steering → spec-requirements → [validate-gap] → spec-design → [validate-design] → spec-tasks → spec-impl → [validate-impl]
```

#### 第一步：生成需求

```bash
/yy:spec-requirements <feature-name>
```

- 基于规格初始化信息生成 EARS 格式需求文档
- 加载 steering 上下文确保需求与项目一致
- 生成后需要**人工审批**才能进入下一阶段

#### 第二步（可选）：差距分析

```bash
/yy:validate-gap <feature-name>
```

- 分析现有代码库与需求之间的差距
- 识别可复用的组件、需新建的部分、集成挑战
- **推荐用于已有项目增强（Brownfield），新项目可跳过**

#### 第三步：生成技术设计

```bash
/yy:spec-design <feature-name>        # 需要需求已审批
/yy:spec-design <feature-name> -y     # 自动审批需求并继续
```

- 将需求（WHAT）转化为架构设计（HOW）
- 根据功能复杂度自动选择发现流程：全面研究 / 轻量分析 / 最小检查
- 生成 `design.md`（架构、组件、接口）和 `research.md`（技术调研记录）
- 使用 Mermaid 图表展示复杂架构

#### 第四步（可选）：设计质量审查

```bash
/yy:validate-design <feature-name>
```

- 交互式设计质量评审
- 给出 GO / NO-GO 决定
- 最多聚焦 3 个最关键问题，同时认可设计优点

#### 第五步：生成实现任务

```bash
/yy:spec-tasks <feature-name>         # 需要需求和设计均已审批
/yy:spec-tasks <feature-name> -y      # 自动审批并继续
```

- 将设计拆解为 1-3 小时粒度的实现任务
- 标记可并行执行的任务 `(P)`
- 确保所有需求都映射到具体任务
- 最多两级结构：主任务和子任务

#### 第六步：TDD 实现

```bash
/yy:spec-impl <feature-name>          # 执行所有待处理任务
/yy:spec-impl <feature-name> 1.1      # 执行指定子任务（推荐）
/yy:spec-impl <feature-name> 1.1,1.2  # 执行多个子任务
```

- 按照 TDD 方法执行：先写测试 → 实现代码 → 重构
- **建议每个任务在新会话中执行**，确保上下文干净
- 任务完成后自动在 tasks.md 中标记为已完成

#### 第七步（可选）：验证实现

```bash
/yy:validate-impl <feature-name>
```

- 检查实现是否符合需求、设计和任务规格
- 验证测试存在且通过
- 确认无回归问题

---

### 场景对比速查表

| 场景 | 推荐命令 | 说明 |
|------|---------|------|
| **新功能（不确定大小）** | `feature` | 自动评估，小的直接实现，大的生成计划 |
| **执行已有计划** | `plan-exec` | 在新会话中执行 feature 生成的大型计划 |
| **已知 Bug 修复** | `fix` | TDD 修复 + 代码审查，一个会话内完成 |
| **不确定的问题** | `investigate` | 4 阶段系统调查，结论明确后可直接转入修复 |
| **查看进度** | `status` | 列出所有规格或查看指定规格详情 |
| **需要逐步控制** | `spec-requirements` → `spec-design` → `spec-tasks` → `spec-impl` | 每阶段人工审批，适合复杂/高风险项目 |
| **已有项目增强** | 分步流程 + `validate-gap` | 先分析差距再设计，避免破坏现有功能 |
| **建立项目上下文** | `steering` | 所有场景的前置条件，首次必须运行 |

---

### 命令流程图

```
                        /yy:steering （首次必须）
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        /yy:feature      /yy:fix      /yy:investigate
              │               │               │
         ┌────┴────┐     TDD 修复      4 阶段调查
         │         │     代码审查           │
       小型      大型       │          ┌────┴────┐
     直接实现   生成计划    完成       是 Bug    非 Bug
     代码审查      │                    │
       完成        ▼                转入修复
              /yy:plan-exec
                   │
              逐任务 TDD
              代码审查
                 完成

        ────── 分步控制流程 ──────

  spec-requirements → [validate-gap] → spec-design
                                           │
                     [validate-design] ← ──┘
                           │
                     spec-tasks → spec-impl → [validate-impl]
```

---

## 📋 实战示例

### 示例：开发照片相册功能

```bash
/yy:steering                                                   # 建立项目上下文（首次）
/yy:feature 照片相册，支持上传、标签和分享                        # 自动评估 → 实现或计划
```

**10 分钟内生成：**
- [requirements.md](.yy-dev/specs/photo-albums/requirements.md) — 15 条 EARS 格式需求
- [design.md](.yy-dev/specs/photo-albums/design.md) — 含 Mermaid 图表的架构设计
- [tasks.md](.yy-dev/specs/photo-albums/tasks.md) — 12 个带依赖关系的实现任务

![示例：design.md 系统流程图](assets/design-system_flow.png)

### 示例：修复登录 Bug

```bash
/yy:fix 邮箱包含大写字母时登录失败
```

AI 自动完成：定位根因 → 写失败测试 → 修复 → 验证 → 代码审查 → 生成修复摘要

### 示例：调查性能问题

```bash
/yy:investigate API 响应时间在高峰期超过 3 秒
```

AI 系统化调查：分析日志 → 对比正常/异常路径 → 测试假设 → 得出结论 → 建议修复方案

---

## 🎨 自定义

在 `.yy-dev/settings/` 中自定义模板和规则以匹配你的团队工作流：

- **templates/** — 定义文档结构（需求、设计、任务）
- **rules/** — 定义 AI 生成原则和判断标准

常见用例：PRD 风格需求、API/数据库 Schema、审批门禁、JIRA 集成、领域特定标准。

📖 **[自定义指南](docs/guides/zh/customization-guide.md)** — 7 个带可复制代码片段的实用示例

## ⚙️ 安装选项

### 选择你的 Agent

```bash
npx yy-spec@latest --claude         # Claude Code（13 个命令）[默认]
npx yy-spec@latest --claude-agent   # Claude Code Subagents（13 个命令 + 9 个子 Agent）
npx yy-spec@latest --cursor         # Cursor IDE
npx yy-spec@latest --gemini         # Gemini CLI
npx yy-spec@latest --codex          # Codex CLI
npx yy-spec@latest --copilot        # GitHub Copilot
npx yy-spec@latest --qwen           # Qwen Code
npx yy-spec@latest --opencode       # OpenCode（11 个命令）
npx yy-spec@latest --opencode-agent # OpenCode Subagents（12 个命令 + 9 个子 Agent）
npx yy-spec@latest --windsurf       # Windsurf IDE
```

### 选择输出语言

```bash
npx yy-spec@latest --lang zh        # 简体中文
npx yy-spec@latest --lang en        # English（默认）
```

### 其他选项

```bash
npx yy-spec@latest --dry-run        # 预览变更，不实际写入
npx yy-spec@latest --kiro-dir docs  # 自定义规格目录
```

### 各 Agent 命令分隔符

| Agent | 分隔符 | 示例 |
|-------|--------|------|
| Claude Code, Gemini, Qwen | `/yy:` | `/yy:feature 描述` |
| Cursor | `/yy/` | `/yy/feature 描述` |
| Copilot, Windsurf, OpenCode | `/yy-` | `/yy-feature 描述` |
| Codex | `/prompts:yy-` | `/prompts:yy-feature 描述` |

---

## 📚 文档与支持

### 完整指南

| 指南 | 内容 | 链接 |
|------|------|------|
| **命令参考** | 所有 `/yy:*` 命令的详细用法、参数和示例 | [English](docs/guides/command-reference.md) \| [简体中文](docs/guides/zh/command-reference.md) |
| **自定义指南** | 7 个实用示例：PRD 需求、前端/后端设计、JIRA 集成 | [English](docs/guides/customization-guide.md) \| [简体中文](docs/guides/zh/customization-guide.md) |
| **规格驱动指南** | 从需求到实现的完整工作流方法论 | [English](docs/guides/spec-driven.md) \| [简体中文](docs/guides/zh/spec-driven.md) |
| **Claude 子 Agent** | 使用 9 个专业子 Agent 处理复杂项目 | [English](docs/guides/claude-subagents.md) \| [简体中文](docs/guides/zh/claude-subagents.md) |
| **迁移指南** | 从 v1.x 升级到 v2.0.0 | [English](docs/guides/migration-guide.md) \| [简体中文](docs/guides/zh/migration-guide.md) |

### NPM 包文档
- English: [tools/cc-sdd/README.md](tools/cc-sdd/README.md)
- 简体中文: [tools/cc-sdd/README_zh.md](tools/cc-sdd/README_zh.md)

---

## 📚 相关资源

**文章与演讲**
- [Kiroの仕様書駆動開発プロセスをClaude Codeで徹底的に再現した](https://zenn.dev/gotalab/articles/3db0621ce3d6d2) - Zenn 文章（日语）
- [Claude Codeは仕様駆動の夢を見ない](https://speakerdeck.com/gotalab555/claude-codehashi-yang-qu-dong-nomeng-wojian-nai) - 演讲稿（日语）

**外部资源**
- [Kiro IDE](https://kiro.dev) — 增强的规格管理和团队协作
- [Kiro 规格方法论](https://kiro.dev/docs/specs/) — 经过验证的规格驱动开发方法论

## 📦 包信息

本仓库包含 **cc-sdd** NPM 包，位于 [`tools/cc-sdd/`](tools/cc-sdd/)。

## License

MIT License
