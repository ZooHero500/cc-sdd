# 规格驱动开发工作流（Spec-Driven Development）

> 📖 **简体中文指南（本页）** | [English](../spec-driven.md)

本文档说明 yy-spec 如何在 AI 驱动开发生命周期（AI-DLC）内实现规格驱动开发（SDD）。在决定运行哪条斜杠命令、审查哪份产出物，以及如何将工作流适配到团队时，可将本文档作为参考。

## 生命周期概览

### 自动工作流（Claude Code）

对于 Claude Code 用户，自动工作流命令处理完整的生命周期：

1. **Steering** — `/yy:steering` 收集架构、约定和领域知识。
2. **Feature / Fix / Investigate** — `/yy:feature`、`/yy:fix` 或 `/yy:investigate` 自动创建规格并端到端驱动工作流。
3. **Plan Execution** — `/yy:plan-exec [spec]` 在新会话中执行大型功能计划。
4. **Status** — `/yy:status [spec]` 追踪所有规格的进度。

### 分步工作流（所有 Agent）

适用于手动控制或其他 Agent：

1. **Steering（上下文捕获）** — `/yy:steering` 将架构、约定和领域知识收集到 steering 文档中。
2. **Spec 初始化** — 通过 `/yy:feature`（Claude）或 `/yy:spec-init`（其他 Agent）创建功能工作区。
3. **需求** — `/yy:spec-requirements <feature>` 收集澄清内容并生成 `requirements.md`。
4. **设计** — `/yy:spec-design <feature>` 首先输出/更新包含调研笔记的 `research.md`（不需要调研时自动跳过），然后生成需人工审批的 `design.md`。
5. **任务规划** — `/yy:spec-tasks <feature>` 创建 `tasks.md`，将可交付物映射为可实施的工作块，并为每个波次打上 `P0`、`P1` 等标签，使团队了解哪些任务可以并行运行。
6. **实施** — `/yy:spec-impl <feature> <task-ids>` 驱动执行与验证。
7. **质量关卡** — 可选的 `/yy:validate-gap` 和 `/yy:validate-design` 命令，在实施前将需求/设计与现有代码进行比对。
8. **状态追踪** — `/yy:status [spec]` 汇总进度和审批情况。

每个阶段都会暂停等待人工审查，除非明确绕过（例如传入 `-y` 或 CLI `--auto` 标志）。规格驱动开发依赖这些关卡进行质量控制，因此在生产工作中请保留手动审批，仅在严格控制的实验中使用自动审批。团队可将审查清单嵌入模板文件，使每个关卡都能反映本地的质量标准。

## 命令 → 产出物映射表

| 命令 | 目的 | 主要产出物 |
|------|------|-----------|
| `/yy:steering` | 建立/刷新项目记忆 | `.yy-dev/steering/*.md` |
| `/yy:feature <desc>` | 新功能 → 自动评估规模 → 实施或规划 | `.yy-dev/specs/<feature>/` |
| `/yy:fix <desc>` | 已知缺陷 → TDD 修复 → 代码审查 | `.yy-dev/specs/fix-<name>/` |
| `/yy:investigate <desc>` | 不确定问题 → 诊断 | `.yy-dev/specs/investigate-<name>/` |
| `/yy:spec-requirements <feature>` | 捕获需求与差距 | `requirements.md` |
| `/yy:spec-design <feature>` | 生成调研日志 + 实施设计 | `research.md`（需要时）、`design.md` |
| `/yy:spec-tasks <feature>` | 将设计拆解为带并行波次的任务 | `tasks.md`（含 P 标签） |
| `/yy:spec-impl <feature> <task-ids>` | 实施指定任务 | 代码 + 任务更新 |
| `/yy:validate-gap <feature>` | 可选：与现有代码的差距分析 | `gap-report.md` |
| `/yy:validate-design <feature>` | 可选：设计验证 | `design-validation.md` |
| `/yy:status [spec]` | 查看阶段、审批、待办任务 | CLI 摘要 |

## 自定义工作流

- **模板** — 调整 `{{KIRO_DIR}}/settings/templates/{requirements,design,tasks}.md` 以反映您的审查流程。yy-spec 会将这些文件复制到每个规格目录中。
- **审批** — 在模板头部嵌入检查清单或必要的签核项。Agent 将在每个阶段呈现这些内容。
- **产出物** — 通过额外章节（风险日志、测试计划等）扩展模板，使生成的文档符合公司标准。

## 新项目 vs. 现有项目

- **全新项目（Greenfield）** — 如果您已有项目级规范，先通过 `/yy:steering` 捕获；否则从 `/yy:feature`（Claude）或 `/yy:spec-init`（其他 Agent）开始，待规则逐渐明确后再完善 steering。
- **棕地项目（Brownfield）** — 先运行 `/yy:steering`，再使用 `/yy:validate-gap` 和 `/yy:validate-design` 确保新规格在实施前与现有系统保持一致。

## 相关资源

- [README 快速开始](../../README.md#-quick-start)
- [Claude Code 子 Agent 工作流](claude-subagents.md)
