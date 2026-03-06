# Claude Code Agents 工作流

> 📖 **简体中文指南（本页）** | [English](../claude-subagents.md)

本指南说明 **Claude Code Agents** 安装目标（`--claude-agent` / `--claude-code-agent`）如何以子 Agent 库扩展标准 Claude Code 设置，从而实现更深入的分析。

## 安装说明

- 使用 `npx yy-spec@latest --claude-agent --lang <code>` 安装。
- 文件放置于：
  - `.claude/commands/yy/` — 6 个工作流命令（feature、fix、investigate、plan-exec、status、steering）。
  - `.claude/agents/kiro/` — 9 个用于分析、扩展和报告的子 Agent 定义。
  - `CLAUDE.md` — 快速开始与使用提示。

## 工作流命令

主要界面是通过 `/yy:*` 工作流命令——每条命令都是自包含的端到端流程：

| 命令 | 目的 |
|------|------|
| `/yy:steering` | 创建/同步项目上下文（现有项目请先运行） |
| `/yy:feature <desc>` | 新功能 → 自动评估规模 → 小型：直接实施 / 大型：生成计划 |
| `/yy:fix <desc>` | 已知缺陷 → TDD 修复 → 代码审查 → 更新规格 |
| `/yy:investigate <desc>` | 不确定问题 → 系统性诊断 → 得出结论 |
| `/yy:plan-exec [spec]` | 执行大型功能计划（在新会话中使用） |
| `/yy:status [spec]` | 查看规格状态与进度 |

自动工作流命令（feature / fix / investigate）会自动创建规格目录，在完成时运行代码审查，并更新变更日志。分步与实用命令（steering / status / spec-* / validate-*）不会自动创建规格或运行代码审查。

## 子 Agent 库

`.claude/agents/kiro/` 目录包含 9 个子 Agent 定义，提供专业的分析能力。在 Claude Code 对话中通过 `@agents-<name>` 调用：

- `@agents-spec-requirements` — 需求分析
- `@agents-spec-design` — 设计文档生成
- `@agents-spec-tasks` — 任务拆解
- `@agents-spec-impl` — 实施指导
- `@agents-validate-gap` — 现有代码与需求之间的差距分析
- `@agents-validate-design` — 设计审查
- `@agents-validate-impl` — 实施验证
- `@agents-steering` — Steering 管理
- `@agents-steering-custom` — 自定义 steering 文档创建

> **注意**：子 Agent 库内部使用旧版 `kiro:` 命名。这不影响主要的 `/yy:*` 命令。

## 推荐使用模式

1. 运行 `npx yy-spec@latest --claude-agent --lang <code>` 进行安装。
2. 通过 `/yy:steering` 准备项目上下文。
3. 使用 `/yy:feature`、`/yy:fix` 或 `/yy:investigate` 处理开发任务。
4. 对于大型功能，`/yy:feature` 生成计划后 → 在新会话中使用 `/yy:plan-exec` 执行。
5. 使用 `/yy:status` 检查进度。

## 自定义行为

1. **共享模板/规则** — 更新 `{{KIRO_DIR}}/settings/templates/*.md` 和 `{{KIRO_DIR}}/settings/rules/*.md`，以反映团队的检查清单和审查标准。
2. **子 Agent 提示词** — 编辑 `.claude/agents/kiro/*.md`，添加公司特定的启发规则（优先级判断、风险分类、测试策略）。
3. **保持提示词简洁** — 将详细描述放入模板/规则；子 Agent 提示词专注于核心要点。

## 故障排查

- **子 Agent 未触发** — 确认安装时使用了 `--claude-agent` 标志，且 `.claude/agents/kiro/` 目录存在。
- **分析了过多文件** — 编辑相关子 Agent 提示词中的文件模式扩展步骤，缩小搜索范围。
- **输出与模板不符** — 更新 `{{KIRO_DIR}}/settings/templates`，确保摘要引用最新的文档章节。

## 另见

- [规格驱动开发工作流](spec-driven.md)
- [项目 README 安装矩阵](../../README.md#-supported-coding-agents)
