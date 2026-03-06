# cc-sdd 迁移指南

> 📖 **简体中文指南（本页）** | [English](../migration-guide.md)

cc-sdd 1.x（尤其是 1.1.5）与 2.0.0 共享相同的 AI-DLC 理念和命令列表，但**设计产出物、模板和 steering 结构已从头重建**。使用本指南选择以下两条明确路径之一——要么继续运行 1.1.5，要么接受这一不连续性并迁移到 2.0.0，从而通过模板/规则实现即时自定义。

---

## TL;DR — 选择您的路径

| 目标 | 推荐操作 |
| --- | --- |
| 保持旧版 1.x 工作流不变 | 每次安装/刷新文件时运行 `npx cc-sdd@1.1.5`。继续直接编辑 Agent 专属提示词文件夹（仅包含最初的 8 个 spec/steering 命令）。 |
| 采用统一模板、research/design 分离，以及所有 8 个支持 Agent 的一致行为 | 使用 `npx cc-sdd@latest`（= 2.0.0）重新安装，仅自定义 `.kiro/settings/templates/*` 和 `.kiro/settings/rules/`（完整的 11 命令集，包含 validate-*）。 |

> ⚠️ 不支持在同一个 `.kiro` 目录树中混用 1.x 和 2.x 布局。每个仓库/分支请选择一条路径。

### 无需更改即可沿用的内容

- 已编写的 `.kiro/specs/<feature>/` 目录仍然是有效的输入；准备好时只需重新生成较新的模板即可。
- `.kiro/steering/`（或单个 `steering.md`）可以直接复用——其内容仍作为项目记忆逐字消费。
- 11 个 AI-DLC 命令（`spec-*`、`validate-*`、`steering*`）以及高层级的 spec→design→tasks→impl 流程保持不变；只有模板内部已移至即时、Agent 式的风格。

---

## 1. 继续使用 cc-sdd 1.1.5（备选方案）

1.1.5 已不再是 `@latest`，但您可以明确固定版本：

```bash
npx cc-sdd@1.1.5 --claude-code   # 旧版标志名（其他 Agent 使用 --cursor / --gemini 等）
npx cc-sdd@1.1.5 --lang ja       # 旧版 i18n 标志仍然有效
```

- 您可以继续直接编辑各 Agent 专属文件夹（`.claude/commands/*`、`.cursor/prompts/*`、`.codex/prompts/*` 等）。
- Agent 专属目录布局与 v1 完全相同。
- 此版本不会新增功能——后续工作仅面向 `@latest`。
- validate 命令（`/yy:validate-gap`、`-design`、`-impl`）在 1.1.5 中**不存在**。如果依赖这些关卡，请迁移到 v2。

---

## 2. 为什么值得升级到 2.0.0

> AI-DLC 工作流（spec-init → design → tasks → impl，含验证关卡）和 11 个命令入口点保持不变。改变的是**您在哪里自定义以及生成文档所提供的结构有多丰富**。

- **模板 & 规则驱动的自定义** — 不再修改命令；只需编辑一次 `.kiro/settings/templates/` 和 `.kiro/settings/rules/`，所有 Agent 都会采用。
- **规格保真度** — `research.md` 捕获探索日志，而 `design.md` 通过摘要表、需求覆盖、参考引用以及更轻量的组件/接口块变得对审查者更友好。
- **Steering = 项目记忆** — 将结构化知识分散到 `.kiro/steering/*.md` 文件中，每条命令都会消费这些内容。
- **棕地项目防护** — `/yy:validate-gap`、`validate-design`、`validate-impl` 加上 research/design 分离，使差距分析和现有系统升级更加安全。
- **统一覆盖** — 所有 8 个支持的 Agent（Claude Code、Claude Subagents、Cursor、Codex CLI、Gemini CLI、GitHub Copilot、Qwen Code、OpenCode、Windsurf）运行相同的 11 命令工作流，因此混用 Agent（例如 Cursor + Claude）无需重写规格。

---

## 3. 推荐迁移步骤

1. **备份**
   ```bash
   cp -r .kiro .kiro.backup
   cp -r .claude .claude.backup   # 对 .cursor、.codex 等重复操作
   ```

2. **干净安装 v2（复用交互式选择）**
   ```bash
   npx cc-sdd@latest                 # 默认（Claude Code）
   npx cc-sdd@latest --cursor        # 其他 Agent
   npx cc-sdd@latest --claude-agent  # 子 Agent 模式
   ```
   - 安装程序现在会按文件组提示选择（覆盖 / 追加 / 保留）。您可以选择"追加"来合并现有 steering/specs 文档，或选择"保留"跳过未改动的资产。

3. **重新生成并合并模板/规则**
   - 新布局：`.kiro/settings/templates/`（集中化）+ `.kiro/settings/rules/`。
   - 将新模板与您之前在 Agent 提示词文件夹中保存的自定义逻辑进行比对，将可复用的部分移入模板/规则。

4. **迁移自定义规则**
   - 将 Markdown 文件放置于 `.kiro/settings/rules/` 下。每条 spec/design/tasks 命令都会读取这些文件。
   - 之前硬编码在提示词中的内容变为规则条目（"DO / DO NOT …"）。

5. **重建 steering（可选）**
   - 将项目记忆拆分为 `project-context.md`、`architecture.md`、`domain-knowledge.md` 等文件。
   - research/design 模板会引用此文件夹，因此将现有笔记迁移至此。

6. **更新自动化脚本**
   - 将所有脚本/文档指向 `npx cc-sdd@latest`；停用 `@next` 用法。
   - 将旧版手动命令调用映射到 11 个支持的命令（`spec-*`、`validate-*`、`steering*`）。

---

## 4. 旧版编辑到 v2 的映射

| 旧版接触点 | v2 替代 | 说明 |
| --- | --- | --- |
| `.claude/commands/spec-design.prompt.md` 等 Agent 专属命令文件 | `.kiro/settings/templates/specs/design.md` | 模板现在位于 `.kiro/settings/templates/`，可自动生成摘要/参考引用。 |
| `.claude/commands/<cmd>.prompt`、`.cursor/prompts/*` | `.kiro/settings/rules/*.md` | 将提示词编辑替换为共享规则语句，使每个 Agent 接收相同的指导。 |
| `.kiro/steering/`（单文件或无文件） | `.kiro/steering/*.md`，包含更清晰的原则/指南 | 路径相同；v2 鼓励将内容拆分为专注的项目记忆指南。 |
| 设计文档中夹杂的调研笔记 | `.kiro/specs/<feature>/research.md` + "参考引用"章节 | 设计文档对审查者保持友好；调研文档保留原始发现，不污染主体。 |

---

## 5. 常见问题 / 故障排查

**能否在 v2 中复用旧模板？** — 技术上可以，但会失去需求覆盖和参考引用，生成质量会下降。建议将内容移植到新的模板/规则中。

**能否在同一仓库中切换 1.1.5 和 2.0.0？** — 只有在按分支隔离 `.kiro` 或自动切换目录的情况下才行；两种布局存在冲突。

**编辑模板后，应运行哪些命令？** — 至少需要运行：`/yy:steering`、`/yy:spec-init`、`/yy:spec-design`，以使用新格式重新生成 Research/Design/Tasks。

---

## 6. 总结

- 如果只需要旧版工作流，请**继续使用 1.1.5**——固定版本，按原来的方式继续。
- 如果需要统一模板、参考引用、research/design 分离以及通过规则实现最低维护成本，请**迁移到 2.0.0**。
- 未来的功能和修复面向 v2+，升级可解锁完整的规格驱动开发体验。
