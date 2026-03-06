# 发布说明

cc-sdd 的新功能与改进。技术变更详情请参阅 [CHANGELOG.md](../../CHANGELOG.md)。

---

## 🔬 开发中（未发布）

目前没有未发布的功能。最新稳定版本为 v2.1.1。

---

## 🔧 Ver 2.1.1（2026-02-02）——Bug 修复与安全更新

### 修复
- 修复了 OpenCode agent 斜杠命令 frontmatter，改为使用完整 agent 路径以确保命令正确执行。

### 安全
- 将 vitest 升级至 v4，以修复安全漏洞。

### 新贡献者
* @hiiamkazuto 在 #134 中完成了首次贡献

- 相关资源：[CHANGELOG.md](../../CHANGELOG.md#211---2026-02-02)，PR：[#134](https://github.com/gotalab/cc-sdd/pull/134)、[#135](https://github.com/gotalab/cc-sdd/pull/135)

---

## 🚀 Ver 2.1.0（2026-02-01）——OpenCode 支持

### 🎯 亮点
- **OpenCode 支持**：新增第 8 个支持的 agent，完整集成 Spec-Driven Development 工作流程。
- **模型更新**：推荐模型更新为 Opus 4.5、GPT-5.2 和 Gemini 3 Flash，以提升性能。

### ✨ 新增
- **OpenCode**（[#117](https://github.com/gotalab/cc-sdd/pull/117)、[#127](https://github.com/gotalab/cc-sdd/pull/127)）
  - `.opencode/commands/` 包含全部 11 个 kiro 命令
  - OpenCode Agents（subagent 版本）位于 `.opencode/agents/`
  - OPENCODE.md 项目记忆模板
  - 安装方式：`npx cc-sdd@latest --opencode` 或 `--opencode-agent`

### 🔧 变更
- 更新推荐模型（[#128](https://github.com/gotalab/cc-sdd/pull/128)、[#129](https://github.com/gotalab/cc-sdd/pull/129)）
  - Claude：Opus 4.5
  - OpenAI：GPT-5.2
  - Google：Gemini 3 Flash
- 从模板中移除 think 关键词，使提示词更简洁

### 📈 关键指标
- **支持的 Agent**：8 个（Claude Code、Cursor、Gemini CLI、Codex CLI、GitHub Copilot、Qwen Code、Windsurf、**OpenCode**）
- **命令数量**：每个 agent 11 个
- **支持语言**：13 种

### 🙏 新贡献者
* @inovue 在 #117 中完成了首次贡献

- 相关资源：[CHANGELOG.md](../../CHANGELOG.md#210---2026-02-01)，PR：[#117](https://github.com/gotalab/cc-sdd/pull/117)、[#127](https://github.com/gotalab/cc-sdd/pull/127)、[#128](https://github.com/gotalab/cc-sdd/pull/128)、[#129](https://github.com/gotalab/cc-sdd/pull/129)

---

## 🌍 Ver 2.0.5（2026-01-08）——希腊语支持

### 新增
- 新增希腊语（el）支持，支持语言总数达到 13 种。

### 新贡献者
* @tpapamichail 在 #121 中完成了首次贡献

- 相关资源：[CHANGELOG.md](../../CHANGELOG.md#205---2026-01-08)，PR：[#121](https://github.com/gotalab/cc-sdd/pull/121)

---

## 📝 Ver 2.0.4（2026-01-07）——Bug 修复与文档更新

### 修复
- 更新 GitHub Copilot 提示文件，将已弃用的 `mode` 属性替换为 `agent`，以兼容最新的 Copilot 规范。
- 修复 registry.ts 并进行代码审查改进。

### 文档
- 在 cc-sdd 文档中添加了 AI-Assisted SDD 书籍参考链接。

### 新贡献者
* @irisTa56 在 #118 中完成了首次贡献
* @leosamp 在 #109 中完成了首次贡献
* @Kakenyan 在 #107 中完成了首次贡献

- 相关资源：[CHANGELOG.md](../../CHANGELOG.md#204---2026-01-07)，PR：[#118](https://github.com/gotalab/cc-sdd/pull/118)、[#109](https://github.com/gotalab/cc-sdd/pull/109)、[#107](https://github.com/gotalab/cc-sdd/pull/107)

---

## 📝 Ver 2.0.3（2025-11-15）——GPT-5.1 Codex 调优

- 针对 Codex CLI、Cursor、GitHub Copilot 和 Windsurf，精细化推荐的 OpenAI 模型，明确将 `gpt-5.1-codex medium/high` 列为首选代码专项选项，将 `gpt-5.1 medium/high` 作为通用备选。
- 更新与 DEV_GUIDELINES 相关的测试，以匹配 v2.0.2 中引入的更严格语言处理规则，确保运行时行为不变的同时使 `npm test` 在 v2.0.3 中顺利通过。

- 相关资源：[CHANGELOG.md](../../CHANGELOG.md#203---2025-11-15)，PR：[#104](https://github.com/gotalab/cc-sdd/pull/104)

---

## 📝 Ver 2.0.2（2025-11-15）——GPT-5.1 与规格稳定性

- 针对 GPT-5.1 优化提示词和 agent 默认值，为 Codex CLI、Cursor、GitHub Copilot 和 Windsurf 推荐使用 `GPT-5.1 high or medium`。
- 收紧语言处理逻辑，确保所有生成的 Markdown（需求、设计、任务、研究、验证）均使用规格的目标语言，当 `spec.json.language` 未设置时回退为英文（`en`）。
- 通过将 EARS 触发短语保持英文、仅对可变槽位进行本地化，并强制使用数字需求 ID（如 `Requirement 1`、`1.1`、`2.3`），使 EARS 模式和可追溯性更加一致，确保需求 → 设计 → 任务的映射稳定，并在 ID 缺失或无效时快速报错。

- 相关资源：[CHANGELOG.md](../../CHANGELOG.md#202---2025-11-15)，PR：[#102](https://github.com/gotalab/cc-sdd/pull/102)

---

## 📝 Ver 2.0.1（2025-11-10）——文档更新

### 摘要
仅含文档更新的版本，改善了 README 的清晰度和视觉一致性。

### 相关资源
- PR：[#93](https://github.com/gotalab/cc-sdd/pull/93)、[#94](https://github.com/gotalab/cc-sdd/pull/94)
- [CHANGELOG.md](../../CHANGELOG.md#201---2025-11-10)

---

## 🎉 Ver 2.0.0（2025-11-09）——正式稳定版

### 一览亮点
- **`npx cc-sdd@latest` = 全栈 SDD**：所有 alpha 阶段功能（research.md、验证命令、Subagents、Windsurf）现已正式发布（GA）。
- **规格到实现的高保真度**：Research/Design/Tasks 模板现在强制使用需求 ID、组件密度规则以及详细内容的 Supporting References。
- **存量项目防护栏**：`/yy:validate-*` 命令、并行任务分析以及全局项目记忆，在任何代码变更前减少偏差。
- **全球一致性**：7 个 AI agent × 13 种语言共享相同的模板、提示词和安装流程。

### 升级要点
1. 参照 [迁移指南](../guides/migration-guide.md) 了解模板布局变更（`.kiro/settings/templates/*`）及新的 steering 行为（目录级加载）。
2. 将自动化脚本更新为调用 `npx cc-sdd@latest`（`@next` 标签保留用于未来预览版）。
3. 重新生成 steering 和规格模板，以获取 Research.md、新设计规则和任务并行标记。

### 本版本核心功能
- **并行任务分析** — 自动添加 `(P)` 标记，并提供 `--sequential` 逃生选项。
- **Research.md 模板** — 将探索日志和架构权衡从设计 SSOT 中隔离出来。
- **设计模板重构** — 摘要表格、需求覆盖度、Supporting References，以及仅在必要处使用的重量级组件块。
- **Agent 覆盖** — Claude Code + Subagents、Cursor、Gemini CLI、Codex CLI、Copilot、Qwen、Windsurf，均配备统一的 11 命令工作流程。
- **交互式安装向导** — 引导式配置，包含项目记忆处理、npm 徽章和改进的文档导航。

### 相关资源
- 完整技术变更：参阅 [CHANGELOG.md](../../CHANGELOG.md#200---2025-11-09)。
- 迁移详情：[docs/guides/migration-guide.md](../guides/migration-guide.md)。
- 计划参考：`docs/cc-sdd/v2.0.0/PLAN.md`（发布任务）、`docs/cc-sdd/v2.0.0/PLAN2.md`（设计模板范围）。

在 v2.0.0 上重新生成项目模板后，所有规格/任务自动化操作均可无需额外标志正常运行。

---

## 早期 Alpha 版本

## 🚀 Ver 2.0.0-alpha.5（2025-11-05）

### 🎯 亮点
- **EARS Format 改进**：将 EARS format 统一为小写语法，提升需求定义的可读性。
- **文档增强**：改进安装说明并添加 npm 徽章，提升用户体验。

### 🔧 改进
- 将 EARS format 更新为小写语法（[#88](https://github.com/gotalab/cc-sdd/pull/88)）
  - 从 "WHILE/WHEN/WHERE/IF" 改为 "while/when/where/if"
  - 使需求描述更自然、更易读
- 完善安装文档（[#87](https://github.com/gotalab/cc-sdd/pull/87)）
- 在 README 文件中添加 npm `next` 版本徽章（[#86](https://github.com/gotalab/cc-sdd/pull/86)）

---

## 📚 Ver 2.0.0-alpha.4（2025-10-30）

### 🎯 亮点
- **全面的自定义指南**：新增包含 7 个实用示例和完整命令参考的自定义指南，帮助用户更轻松地将模板调整为适合自己项目的配置。

### 📖 新增文档
- **自定义指南**（[#83](https://github.com/gotalab/cc-sdd/pull/83)）
  - 模板自定义模式
  - Agent 专属工作流程示例
  - 项目专属规则示例
  - 7 个实用自定义示例
- **命令参考**（[#83](https://github.com/gotalab/cc-sdd/pull/83)）
  - 全部 11 个 `/yy:*` 命令的详细用法
  - 参数说明与实用示例

### 🔧 改进
- 完善模板自定义说明（[#85](https://github.com/gotalab/cc-sdd/pull/85)）
- 自定义指南审查改进（[#84](https://github.com/gotalab/cc-sdd/pull/84)）

---

## 🤖 Ver 2.0.0-alpha.3.1（2025-10-24）

### 🎯 亮点
- **自动化 GitHub Issue 管理**：10 天无活动后自动关闭 issue，简化项目管理流程。

### ⚙️ 自动化
- 自动化 GitHub issue 生命周期管理（[#80](https://github.com/gotalab/cc-sdd/pull/80)）
  - 10 天无活动后自动关闭过期 issue
  - 可配置的过期检测工作流程
  - 仅使用英文的工作流程消息（[#81](https://github.com/gotalab/cc-sdd/pull/81)）

### 🔧 改进
- 将过期检测周期更新为 10 天
- 改进 GitHub Actions issue 管理工作流程

---

## 🚀 Ver 2.0.0-alpha.3（2025-10-22）

### 🎯 亮点
- **Windsurf IDE 支持**：新增专属 manifest、位于 `.windsurf/workflows/` 下的工作流模板以及 AGENTS.md 快速入门，Windsurf 用户可通过 `npx cc-sdd@next --windsurf` 运行完整的 kiro Spec-Driven Development 工作流程。
- **CLI 体验优化**：更新补全指南和推荐模型，使安装摘要现在可将 Windsurf 用户引导至正确的后续命令和手动 QA 流程。

### 🧪 质量与工具
- 新增 `realManifestWindsurf` 集成测试，覆盖 dry-run 规划、跨平台（macOS/Linux）执行和完成消息。
- 扩展 CLI 参数解析以识别 `--windsurf` 别名，并确保 agent 注册表正确输出布局元数据。

### 📚 文档
- 更新根目录 README、CLI 文档（`tools/cc-sdd/README*`）及历史指南（`docs/README/README_{en,zh-TW}.md`），添加 Windsurf 说明、更新的快速入门矩阵，以及使用 `npx cc-sdd@next --windsurf` 的手动 QA 检查清单。

### 📈 关键指标
- **支持的平台**：7 个（Claude Code、Cursor IDE、Gemini CLI、Codex CLI、GitHub Copilot、Qwen Code、Windsurf IDE）
- **命令/工作流数量**：每个 agent 11 个（规格/验证/steering 覆盖完全一致）
- **自动化覆盖**：1 个专为 Windsurf 新增的 real-manifest 测试场景

---

## 🚀 Ver 2.0.0-alpha.2（2025-10-13）

### 🎯 亮点
- **引导式 CLI 安装向导**：带文件预览的交互式配置
- **规格驱动命令重新设计**：重写全部 11 个命令
- **Steering 大改版**：带目录级加载的项目记忆
- **灵活的交付物**：共享设置包
- **Codex CLI 支持**：`.codex/prompts/` 中的 11 个提示词
- **GitHub Copilot 支持**：`.github/prompts/` 中的 11 个提示词

### 📈 关键指标
- **支持的平台**：6 个
- **命令数量**：11 个（6 个规格命令 + 3 个验证命令 + 2 个 steering 命令）

---

## Ver 1.1.0（2025 年 9 月 8 日正式发布）🎯

### ✨ 新增存量项目开发功能
针对现有项目增强规格驱动开发

**新质量验证命令**
- 🔍 **`/yy:validate-gap`** — 现有功能与需求之间的差距分析
  - 在 spec-design 之前执行，以厘清当前实现与新需求之间的差异
  - 识别现有系统的理解程度和新功能的集成点
- ✅ **`/yy:validate-design`** — 验证设计与现有架构的兼容性
  - 在 spec-design 之后执行，确认设计集成的可行性
  - 预先检测与现有系统的冲突和不兼容问题

### 🚀 全面支持 Cursor IDE
正式作为第三个主要平台
- **11 个命令** — 功能与 Claude Code/Gemini CLI 完全等价
- **AGENTS.md 配置文件** — 针对 Cursor IDE 优化的专属设置
- **统一工作流程** — 跨平台一致的开发体验

### 📊 命令系统扩展
增强规格驱动开发的完整性
- **从 8 个扩展至 11 个命令** — 新增验证和实现审查命令
- **可选工作流程** — 可按需添加质量门禁
- **灵活的开发路径** — 适用于新项目和现有项目的最优流程

### 📚 重大文档改进
重新整理，更清晰简洁

**结构改进**
- **快速入门分离** — 新项目与现有项目使用不同的引导流程
- **明确 steering 定位** — 强调其作为项目记忆的重要性
- **简化冗长说明** — 各章节缩减 30-50%，提升可读性

**内容增强**
- **AI-DLC "bolts" 概念** — 通过 AWS 文章链接阐明术语
- **Kiro IDE 集成说明** — 强调可移植性和实现防护栏
- **添加 Speaker Deck 演示** — "Claude Code Doesn't Dream of Spec-Driven Development"

### 🔧 技术改进
提升开发体验与可维护性
- **GitHub URL 更新** — 迁移支持至 gotalab/cc-sdd
- **错别字修正** — "Clade Code" → "Claude Code"
- **CHANGELOG 整理** — 移至 docs 目录

### 📈 关键指标
- **支持的平台**：5 个（Claude Code、Cursor IDE、Gemini CLI、Codex CLI、GitHub Copilot）
- **命令数量**：11 个（6 个规格命令 + 3 个验证命令 + 2 个 steering 命令）
- **文档语言**：3 种（英文、日文、繁体中文）
- **npm 周下载量**：持续稳定增长

---

## Ver 1.0.0（2025 年 8 月 31 日重大更新）🚀

### 🚀 多平台支持完成
跨四个平台的统一规格驱动开发
- 🤖 **Claude Code** — 原始平台
- 🔮 **Cursor** — IDE 集成支持
- ⚡ **Gemini CLI** — TOML 结构化配置
- 🧠 **Codex CLI** — GPT-5 优化提示词设计

### 📦 cc-sdd 包发布
[cc-sdd](https://www.npmjs.com/package/cc-sdd) — AI-DLC + Spec Driven Development
- 支持 Claude Code 和 Gemini CLI
- 可通过 `npx cc-sdd@latest` 安装

### 🔄 开发工作流程全面重构
对整个规格驱动开发工作流程进行根本性审查
- 实施了接近**完全重建**级别的大改版
- 统一输出，确保跨平台更一致的结果

---

## Ver 0.3.0（2025 年 8 月 12 日更新）

### Kiro Spec-Driven Development 命令重大改进

**工作流效率**
- 新增 `-y` 标志：`/yy:spec-design feature-name -y` 跳过需求确认并直接生成设计
- `/yy:spec-tasks feature-name -y` 跳过需求和设计确认并直接生成任务
- 新增参数提示：命令现在在输入时自动显示 `<feature-name> [-y]`
- 传统的逐步确认方式仍可用（编辑 spec.json 或交互式确认）

**命令优化**
- spec-init.md：162→104 行（缩减 36%，移除 project_description 并简化模板）
- spec-requirements.md：177→124 行（缩减 30%，简化冗长说明）
- spec-tasks.md：295→198 行（缩减 33%，去除 "Phase X:"，功能命名，粒度优化）

**任务结构优化**
- 使用章节标题对功能区域进行组织
- 任务粒度限制（3-5 个子项，1-2 小时完成）
- 标准化 _Requirements: X.X, Y.Y_ 格式

**自定义 Steering 支持**
- 所有规格命令现在均利用项目专属上下文
- 灵活的 Always/Conditional/Manual 模式配置加载

---

## Ver 0.2.1（2025 年 7 月 27 日更新）

### CLAUDE.md 性能优化

**系统提示词优化**
- 将 CLAUDE.md 文件从 150 行缩减至 66 行
- 移除重复章节和冗余说明
- 对英文和繁体中文版本实施统一优化

**功能保全**
- 保留所有必要的执行上下文
- 保留 steering 配置和工作流程信息
- 对交互式确认功能无影响

**小更新**
- 在 spec-requirements.md 中添加 "think" 关键词

---

## Ver 0.2.0（2025 年 7 月 26 日更新）

### 交互式确认系统

**确认流程改进**
- `/spec-design [feature-name]` 现在显示 "Have you reviewed requirements.md? [y/N]" 确认提示
- `/spec-tasks [feature-name]` 现在同时显示需求和设计的审查确认提示
- 输入 'y' 确认后自动更新 spec.json 并进入下一阶段
- 输入 'N' 则停止执行并提示进行审查

**操作简化**
- 之前：需要手动编辑 spec.json 文件将 `"approved"` 设置为 `true`
- 现在：只需回复确认提示即可完成确认
- 手动确认方式仍然可用

### 规格生成质量改进

**增强 requirements.md 生成**
- EARS format 输出现在以更统一的格式生成
- 层级需求结构以更有序的格式输出
- 提高验收标准的全面性和具体性

**增强 design.md**
- 技术研究流程现已集成到设计阶段
- 需求映射和可追溯性体现在设计文档中
- 改进架构图、数据流图、ERD 的文档结构
- 对安全、性能和测试策略提供更详细的描述

**改进 tasks.md**
- 实现任务针对代码生成 LLM 进行优化
- 测试驱动开发方式集成到每个任务中
- 任务间依赖关系管理更清晰
- 改进为符合 Kiro 设计原则的独立提示词格式

### 修复的问题

**目录处理改进**
- 即使 `.kiro/steering/` 目录不存在也能正常工作
- 更友好的错误信息

**内部文件管理改进**
- 将开发提示词文件排除在版本控制之外

### 系统设计简化

**移除 progress 字段**
- 完全移除了导致同步错误的冗余 progress 字段
- 仅通过 phase + approvals 实现更清晰的状态管理
- 简化 spec.json 结构，提升可维护性

**修订需求生成方式**
- 从过于全面的需求生成方式回归到原始的 Kiro 设计
- 移除 "CRITICAL"、"MUST" 等强制性表达
- 改为以核心功能为中心的渐进式需求生成
- 恢复以迭代改进为前提的自然开发流程

---

## Ver 0.1.5（2025 年 7 月 25 日更新）

### Steering 系统重大增强

**增强安全功能**
- 新增安全指南和内容质量指南
- 实现更安全、更高质量的项目管理

**改进 inclusion modes 功能**
- 三种模式（始终包含、条件包含、手动）现在更加用户友好
- 新增详细的使用建议和指导

**统一 Steering 管理功能**
- `/yy:steering` 命令现在可以正确处理已有文件
- 更直观的 steering 文档管理

**提升系统稳定性**
- 修复 Claude Code 管道 bug，实现更可靠的执行
- 现在可在非 Git 环境中正常工作

---

## Ver 0.1.0（2025 年 7 月 18 日更新）

### 基础功能
- 实现 Kiro IDE 风格的规格驱动开发系统
- 三阶段确认工作流程：需求 → 设计 → 任务 → 实现
- EARS format 需求定义支持
- 层级需求结构组织
- 自动进度追踪与钩子功能
- 基础斜杠命令集

### 质量管理功能
- 通过手动确认门禁进行质量保证
- 规格合规性检查功能
- 上下文保全功能

---

## Ver 0.0.1（2025 年 7 月 17 日更新）

### 新功能
- 创建初始项目结构

---

## 开发历史

**2025 年 7 月 17-18 日：基础建设期**
项目初始化，实现 Kiro 风格规格驱动开发的核心框架

**2025 年 7 月 18-24 日：多语言与功能扩展期**
新增英文和繁体中文支持、GitHub Actions 集成、文档增强

**2025 年 7 月 25 日：Steering 系统增强期**
安全增强、inclusion modes 改进、系统稳定性提升

**2025 年 7 月 26 日：规格生成质量革新与系统简化**
显著提升需求、设计和任务文档的生成质量，移除过度的进度追踪并回归原始 Kiro 设计

---

## 使用方法

1. 将 **`.claude/commands/` 目录**和 **`CLAUDE.md` 文件**复制到您的项目中
2. 在 Claude Code 中运行 `/yy:steering` 配置项目信息
3. 使用 `/yy:spec-init [feature-name]` 创建新规格
4. 按步骤推进开发：需求 → 设计 → 任务

详细使用说明请参阅 [README_en.md](README_en.md)。

## 相关链接

- **[Zenn 文章](https://zenn.dev/gotalab/articles/3db0621ce3d6d2)** — Kiro 规格驱动开发流程的详细说明
- **[简体中文文档](../../README.md)**
- **Claude Code Command Refresh**：停用 `.tpl` 文件，统一为 11 个命令（包括 `validate-impl`），以简化的布局提供相同的跨平台模板集。
