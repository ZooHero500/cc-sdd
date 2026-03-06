# cc-sdd：为团队工作流提供规格驱动开发

[![npm version](https://img.shields.io/npm/v/cc-sdd?logo=npm)](https://www.npmjs.com/package/cc-sdd?activeTab=readme)
[![install size](https://packagephobia.com/badge?p=cc-sdd)](https://packagephobia.com/result?p=cc-sdd)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](../../LICENSE)

<div align="center" style="margin-bottom: 1rem; font-size: 1.1rem;"><sub>
<a href="./README.md">English</a> | 简体中文
</sub></div>

✨ **将 Claude Code / Cursor IDE / Gemini CLI / Codex CLI / GitHub Copilot / Qwen Code / OpenCode / Windsurf 从原型升级为生产就绪的开发环境。**

👻 **受 Kiro 启发** — 与 Kiro IDE 相似的规格驱动、AI-DLC 风格，现有 Kiro 规格保持兼容且可迁移。

**v2.0.0 新功能：**
- ✅ **快速可审查的设计** — 带摘要表格的结构化格式，使审查速度提升 5 倍
- ✅ **独立研究** — 将发现记录（Research.md）与最终设计（Design.md）分开保存
- ✅ **质量门禁** — validate-gap/design/impl 命令在编码前捕获集成问题
- ✅ **一次自定义** — 将模板适配到团队流程；所有 agent 遵循相同的工作流
- ✅ **通用工作流** — 8 个 agent × 13 种语言共享相同的 11 命令流程

---

> 需要旧版流程？请使用 `npx cc-sdd@1.1.5`。从 v1.x 升级？
> 请参阅迁移指南：[English](../../docs/guides/migration-guide.md) | [简体中文](../../docs/guides/zh/migration-guide.md)

## 🚀 安装

运行一条命令，即可为你偏好的 AI 编程 agent 安装 **AI-DLC**（AI 驱动开发生命周期）与 **SDD**（规格驱动开发）工作流。cc-sdd 还会搭建与团队一致的模板，使生成的需求、设计评审、任务计划和 steering 文档符合你的审批流程。

```bash
# 基础安装（默认：英文文档，Claude Code）
npx cc-sdd@latest

# 语言选项（默认：--lang en）
npx cc-sdd@latest --lang ja    # 日语
npx cc-sdd@latest --lang zh-TW # 繁体中文
npx cc-sdd@latest --lang es    # 西班牙语
... (支持 en, ja, zh-TW, zh, es, pt, de, fr, ru, it, ko, ar, el)

# Agent 选项（默认：claude-code / --claude）
npx cc-sdd@latest --claude        # Claude Code（6 个工作流命令，en/ja/zh-TW/...）
npx cc-sdd@latest --claude-agent --lang ja  # Claude Code Agents（6 个命令 + 9 个子 agent）
npx cc-sdd@latest --cursor --lang zh-TW     # Cursor IDE（支持任意语言）
npx cc-sdd@latest --gemini --lang es        # Gemini CLI
npx cc-sdd@latest --codex --lang fr         # Codex CLI
npx cc-sdd@latest --copilot --lang pt       # GitHub Copilot
npx cc-sdd@latest --qwen --lang de          # Qwen Code
npx cc-sdd@latest --opencode --lang en      # OpenCode（11 个命令）
npx cc-sdd@latest --opencode-agent --lang ja # OpenCode Subagents（12 个命令 + 9 个子 agent）
npx cc-sdd@latest --windsurf --lang ja      # Windsurf IDE

# 注意：@next 现已保留用于未来的 alpha/beta 版本
```

## 🌐 支持的语言

| 语言 | 代码 |  |
|------|------|------|
| English | `en` | 🇬🇧 |
| Japanese | `ja` | 🇯🇵 |
| Traditional Chinese | `zh-TW` | 🇹🇼 |
| Simplified Chinese | `zh` | 🇨🇳 |
| Spanish | `es` | 🇪🇸 |
| Portuguese | `pt` | 🇵🇹 |
| German | `de` | 🇩🇪 |
| French | `fr` | 🇫🇷 |
| Russian | `ru` | 🇷🇺 |
| Italian | `it` | 🇮🇹 |
| Korean | `ko` | 🇰🇷 |
| Arabic | `ar` | 🇸🇦 |
| Greek | `el` | 🇬🇷 |

**用法**：`npx cc-sdd@latest --lang <code>`（例如 `--lang zh` 表示简体中文）

## ✨ 快速开始

### 适用于 Claude Code（`--claude` / `--claude-agent`）
```bash
# 首先建立项目上下文（对现有项目至关重要）
/yy:steering                                                   # AI 学习项目上下文

# 然后使用自包含的工作流命令
/yy:feature Build a user authentication system with OAuth      # 自动评估规模 → 小：直接实现 / 大：制定计划
/yy:fix Login fails when email has uppercase letters            # TDD 修复 → 代码审查 → 更新规格
/yy:investigate Why are sessions expiring early                 # 系统性诊断 → 结论 → 可修复
/yy:plan-exec auth-system                                      # 执行大型功能计划
/yy:status auth-system                                         # 检查规格进度
```

![design.md - System Flow Diagram](https://raw.githubusercontent.com/gotalab/cc-sdd/refs/heads/main/assets/design-system_flow.png)
*设计阶段 `design.md` 中的系统流程图示例*

### 适用于其他 Agent（Cursor、Gemini、Codex、Copilot 等）
```bash
# 首先建立项目上下文，然后继续开发
/yy:steering                                                   # AI 学习现有项目上下文

/yy:spec-init Add OAuth to existing auth system                # AI 创建增强计划
/yy:spec-requirements oauth-enhancement                        # AI 提出澄清性问题
/yy:validate-gap oauth-enhancement                             # 可选：分析现有功能与需求的差距
/yy:spec-design oauth-enhancement                              # 人工验证，AI 设计
/yy:validate-design oauth-enhancement                          # 可选：验证设计集成
/yy:spec-tasks oauth-enhancement                               # 拆分为实现任务
/yy:spec-impl oauth-enhancement                                # 以 TDD 方式执行
```
> **注意**：命令分隔符因 agent 而异 — Gemini/Qwen 使用 `/yy:`，Cursor 使用 `/yy/`，Copilot/Windsurf/OpenCode 使用 `/yy-`，Codex 使用 `/prompts:yy-`。请参阅你的 agent 已安装的命令以获取确切语法。

**30 秒完成设置** → **AI 驱动的"冲刺闪电战"（bolts）** → **小时级交付结果**

### 为什么团队要安装 cc-sdd
1. **单一真相来源规格** — 需求、设计、任务和相关参考保持同步，让审查者更快批准。
2. **全新或遗留项目均适用** — 全新功能可在几分钟内启动，而验证门禁和项目记忆使遗留系统升级更安全。
3. **混合任意 agent** — 相同的模板和规则同时驱动 Claude、Cursor、Codex、Gemini、Copilot、Qwen 和 Windsurf。
4. **一次自定义** — 编辑 `.kiro/settings/templates/` 或 `.kiro/settings/rules/`，所有 agent/斜杠命令即反映你的工作流。

## ✨ 核心特性

- **🚀 AI-DLC 方法论** — AI 原生流程，配合人工审批。核心模式：AI 执行，人工验证
- **📋 规格优先开发** — 以全面的规格文档作为驱动整个生命周期的单一真相来源
- **⚡ "Bolts" 而非 Sprints** — [AI-DLC 术语](https://aws.amazon.com/jp/blogs/news/ai-driven-development-life-cycle/)，以小时/天的密集周期取代数周的冲刺，摆脱 70% 的管理开销
- **🧠 持久项目记忆** — AI 通过 steering 文档跨所有会话维护完整上下文（架构、模式、规则、领域知识）
- **🛠 模板灵活性** — 调整 `{{KIRO_DIR}}/settings/templates`（steering、需求、设计、任务）以匹配团队的交付物
- **🔄 AI 原生 + 人工门禁** — AI 规划 → AI 提问 → 人工验证 → AI 实现（快速循环与质量控制）
- **🌍 团队就绪** — 支持 13 种语言、跨平台、带质量门禁的标准化工作流

## 🤖 支持的 AI Agent

| Agent | 状态 | 命令数 |
|-------|------|--------|
| **Claude Code** | ✅ 完整支持 | 13 个命令（`/yy:*`）：6 个自动工作流 + 7 个分步操作 |
| **Claude Code Agents** | ✅ 完整支持 | 13 个命令（`/yy:*`）+ 9 个子 agent |
| **Cursor IDE** | ✅ 完整支持 | 11 个命令 |
| **Gemini CLI** | ✅ 完整支持 | 11 个命令 |
| **Codex CLI** | ✅ 完整支持 | 11 个 prompt |
| **GitHub Copilot** | ✅ 完整支持 | 11 个 prompt |
| **Qwen Code** | ✅ 完整支持 | 11 个命令 |
| **Windsurf IDE** | ✅ 完整支持 | 11 个工作流 |
| 其他（Factory AI Droid） | 📅 计划中 | - |

## 📋 命令参考

### Claude Code 工作流（`/yy:*`）

**自动工作流**（端到端，自闭环）：
```bash
/yy:steering                              # 创建/更新项目上下文（优先运行）
/yy:feature <description>                 # 新功能 → 自动评估规模 → 实现或制定计划
/yy:fix <description>                     # 已知 bug → TDD 修复 → 代码审查
/yy:investigate <description>             # 不确定问题 → 系统性诊断
/yy:plan-exec [spec-name]                 # 执行大型功能计划
/yy:status [spec-name]                    # 检查规格进度
```

**分步工作流**（每阶段手动控制）：
```bash
/yy:spec-requirements <feature_name>      # 生成需求
/yy:spec-design <feature_name>            # 创建技术设计
/yy:spec-tasks <feature_name>             # 拆分为实现任务
/yy:spec-impl <feature_name> <tasks>      # 以 TDD 方式执行
/yy:validate-gap <feature_name>           # 分析现有功能差距
/yy:validate-design <feature_name>        # 审查设计兼容性
/yy:validate-impl <feature_name>          # 根据规格验证实现
```

### 其他 Agent 工作流（`/yy:*`）
```bash
/yy:spec-init <description>              # 初始化功能规格
/yy:spec-requirements <feature_name>     # 生成需求
/yy:spec-design <feature_name>           # 创建技术设计
/yy:spec-tasks <feature_name>            # 拆分为实现任务
/yy:spec-impl <feature_name> <tasks>     # 以 TDD 方式执行
/yy:spec-status <feature_name>           # 检查进度
/yy:validate-gap <feature_name>          # 分析现有功能差距
/yy:validate-design <feature_name>       # 审查设计兼容性
/yy:validate-impl <feature_name>         # 根据规格验证实现
```

> **规格作为基础**：基于 [Kiro 的规格体系](https://kiro.dev/docs/specs/) — 规格将临时开发转变为系统性工作流，通过清晰的 AI-人工协作节点将想法桥接到实现。

📖 **[完整命令参考](https://github.com/gotalab/cc-sdd/blob/main/docs/guides/command-reference.md)** — 所有命令的详细用法、参数、示例和故障排查

### 项目记忆与上下文
```bash
/yy:steering                              # Claude Code
/yy:steering                              # 其他 agent
```

> **关键基础**：Steering 创建持久的项目记忆。**对现有项目请优先运行**，以提升规格质量。

## 🎨 自定义

编辑 `{{KIRO_DIR}}/settings/templates/` 中的模板以匹配你的工作流。保留核心结构（需求编号、复选框、标题），添加团队上下文 — AI 会自动适应。

**常见自定义场景**：
- **PRD 风格需求**，包含业务上下文和成功指标
- **前端/后端设计**，针对 React 组件或 API 规格进行优化
- **审批门禁**，用于安全、架构或合规审查
- **JIRA/Linear 就绪任务**，包含估时、优先级和标签
- **领域 steering**，用于 API 标准、测试规范或编码指南

📖 **[自定义指南](https://github.com/gotalab/cc-sdd/blob/main/docs/guides/customization-guide.md)** — 7 个带有可复制代码片段的实用示例


## ⚙️ 配置

```bash
# 语言和平台
npx cc-sdd@latest --lang zh            # macOS / Linux / Windows（自动检测）
npx cc-sdd@latest --lang zh --os mac   # 可选显式覆盖（旧版标志）

# 安全操作
npx cc-sdd@latest --dry-run --backup

# 自定义目录
npx cc-sdd@latest --kiro-dir docs
```

## 📁 项目结构

安装后，你的项目将包含：

```
project/
├── .claude/commands/yy/      # 6 个工作流命令（Claude Code）
├── .codex/prompts/           # 11 个 prompt 命令（Codex CLI）
├── .github/prompts/          # 11 个 prompt 命令（GitHub Copilot）
├── .windsurf/workflows/      # 11 个工作流文件（Windsurf IDE）
├── .kiro/settings/           # 共享规则与模板（变量通过 {{KIRO_DIR}} 解析）
├── .kiro/specs/              # 功能规格
├── .kiro/steering/           # AI 指导规则
└── CLAUDE.md（Claude Code）   # 项目配置
```

> 注意：仅会创建你所安装的 agent 对应的目录。上述目录树展示的是完整的超集，仅供参考。

## 📚 文档与支持

- 命令参考：[English](../../docs/guides/command-reference.md) | [简体中文](../../docs/guides/zh/command-reference.md)
- 自定义指南：[English](../../docs/guides/customization-guide.md) | [简体中文](../../docs/guides/zh/customization-guide.md)
- 规格驱动指南：[English](../../docs/guides/spec-driven.md) | [简体中文](../../docs/guides/zh/spec-driven.md)
- Claude 子 Agent 指南：[English](../../docs/guides/claude-subagents.md) | [简体中文](../../docs/guides/zh/claude-subagents.md)
- 迁移指南：[English](../../docs/guides/migration-guide.md) | [简体中文](../../docs/guides/zh/migration-guide.md)
- **[问题与支持](https://github.com/gotalab/cc-sdd/issues)** — 错误报告和问题咨询
- **[Kiro IDE](https://kiro.dev)**

---

**稳定版本 v2.0.0** — 生产就绪。[提交问题](https://github.com/gotalab/cc-sdd/issues) | MIT License

### 平台支持
- 支持的操作系统：macOS、Linux、Windows（默认自动检测）。
- 跨操作系统统一命令模板；`--os` 覆盖选项仅用于旧版自动化场景。

> **注意**：传入 `--os` 仍可向后兼容，但所有平台现在接收相同的命令集。
