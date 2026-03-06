# Claude Code Agents Workflow

> 📖 **简体中文版:** [Claude 子代理工作流指南](zh/claude-subagents.md)

This guide explains how the **Claude Code Agents** install target (`--claude-agent` / `--claude-code-agent`) extends the standard Claude Code setup with a subagent library for deeper analysis.

## Installation Recap

- Install with `npx yy-spec@latest --claude-agent --lang <code>`.
- Files are placed under:
  - `.claude/commands/yy/` – 6 workflow commands (feature, fix, investigate, plan-exec, status, steering).
  - `.claude/agents/kiro/` – 9 subagent definitions for analysis, expansion, and reporting.
  - `CLAUDE.md` – quickstart and usage tips.

## Workflow Commands

The primary interface is through `/yy:*` workflow commands — each is a self-contained, end-to-end flow:

| Command | Purpose |
|---------|---------|
| `/yy:steering` | Create/sync project context (run first for existing projects) |
| `/yy:feature <desc>` | New feature → auto-size → small: implement / large: generate plan |
| `/yy:fix <desc>` | Known bug → TDD fix → code review → update specs |
| `/yy:investigate <desc>` | Uncertain issue → systematic diagnosis → conclusion |
| `/yy:plan-exec [spec]` | Execute a large feature plan (use in a new session) |
| `/yy:status [spec]` | View spec status and progress |

Auto Workflow commands (feature/fix/investigate) auto-create spec directories, run code review on completion, and update the changelog. Step-by-step and utility commands (steering/status/spec-*/validate-*) do not auto-create specs or run code review.

## Subagent Library

The `.claude/agents/kiro/` directory contains 9 subagent definitions that provide specialized analysis capabilities. These are invoked by mentioning `@agents-<name>` in Claude Code chat:

- `@agents-spec-requirements` – Requirements analysis
- `@agents-spec-design` – Design document generation
- `@agents-spec-tasks` – Task breakdown
- `@agents-spec-impl` – Implementation guidance
- `@agents-validate-gap` – Gap analysis between existing code and requirements
- `@agents-validate-design` – Design review
- `@agents-validate-impl` – Implementation validation
- `@agents-steering` – Steering management
- `@agents-steering-custom` – Custom steering document creation

> **Note**: The subagent library uses legacy `kiro:` naming internally. This does not affect the primary `/yy:*` commands.

## Recommended Usage Pattern

1. Run `npx yy-spec@latest --claude-agent --lang <code>` to install.
2. Prepare project context via `/yy:steering`.
3. Use `/yy:feature`, `/yy:fix`, or `/yy:investigate` for development tasks.
4. For large features, `/yy:feature` generates a plan → execute with `/yy:plan-exec` in a new session.
5. Check progress with `/yy:status`.

## Customising Behaviour

1. **Shared templates/rules** – Update `{{KIRO_DIR}}/settings/templates/*.md` and `{{KIRO_DIR}}/settings/rules/*.md` to reflect your team's checklists and review criteria.
2. **Subagent prompts** – Edit `.claude/agents/kiro/*.md` to add company-specific heuristics (prioritization, risk classification, testing policies).
3. **Keep prompts concise** – Place detailed descriptions in templates/rules; keep subagent prompts focused on essentials.

## Troubleshooting

- **Subagent not triggering** – Ensure you installed with `--claude-agent` flag and that `.claude/agents/kiro/` exists.
- **Too many files analysed** – Edit the file pattern expansion step in the relevant subagent prompt to narrow the search.
- **Outputs differ from templates** – Update `{{KIRO_DIR}}/settings/templates` so that summaries reference the latest document sections.

## See Also

- [Spec-Driven Development Workflow](spec-driven.md)
- [Project README Installation Matrix](../../README.md#-supported-coding-agents)
