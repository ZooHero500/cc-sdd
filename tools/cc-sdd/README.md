# cc-sdd: Spec-driven development for your team's workflow

[![npm version](https://img.shields.io/npm/v/cc-sdd?logo=npm)](https://www.npmjs.com/package/cc-sdd?activeTab=readme)
[![install size](https://packagephobia.com/badge?p=cc-sdd)](https://packagephobia.com/result?p=cc-sdd)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](../../LICENSE)

<div align="center" style="margin-bottom: 1rem; font-size: 1.1rem;"><sub>
English | <a href="./README_zh.md">简体中文</a>
</sub></div>

✨ **Transform Claude Code / Cursor IDE / Gemini CLI / Codex CLI / GitHub Copilot / Qwen Code / OpenCode / Windsurf from prototype to production-ready development.**

👻 **Kiro-inspired** — Similar Spec-Driven, AI-DLC style as Kiro IDE, so existing Kiro specs remain compatible and portable.

**What's New in v2.0.0:**
- ✅ **Fast-to-Review Designs** — Structured format with summary tables makes reviews 5x faster
- ✅ **Separate Research** — Keep discovery notes (Research.md) separate from final design (Design.md)
- ✅ **Quality Gates** — validate-gap/design/impl commands catch integration issues before coding
- ✅ **Customize Once** — Adapt templates to your team's process; all agents follow the same workflow
- ✅ **Universal Workflow** — 8 agents × 13 languages share the same 11-command process

---

> Need the legacy flow? Use `npx cc-sdd@1.1.5`. Upgrading from v1.x?
> See the Migration Guide: [English](../../docs/guides/migration-guide.md) | [简体中文](../../docs/guides/zh/migration-guide.md).

## 🚀 Installation

Run one command to install **AI-DLC** (AI Driven Development Lifecycle) with **SDD** (Spec-Driven Development) workflows across your preferred AI coding agent. cc-sdd also scaffolds team-aligned templates so generated requirements, design reviews, task plans, and steering docs fit your approval flow.

```bash
# Basic installation (defaults: English docs, Claude Code)
npx cc-sdd@latest

# With language options (default: --lang en)
npx cc-sdd@latest --lang zh    # Simplified Chinese
npx cc-sdd@latest --lang es    # Spanish
... (en, ja, zh-TW, zh, es, pt, de, fr, ru, it, ko, ar, el supported)

# With agent options (default: claude-code / --claude)
npx cc-sdd@latest --claude        # Claude Code (6 workflow commands, en/zh/...)
npx cc-sdd@latest --claude-agent --lang zh  # Claude Code Agents (6 commands + 9 subagents)
npx cc-sdd@latest --cursor --lang es        # Cursor IDE (choose any supported lang)
npx cc-sdd@latest --gemini --lang es        # Gemini CLI
npx cc-sdd@latest --codex --lang fr         # Codex CLI
npx cc-sdd@latest --copilot --lang pt       # GitHub Copilot
npx cc-sdd@latest --qwen --lang de          # Qwen Code
npx cc-sdd@latest --opencode --lang en      # OpenCode (11 commands)
npx cc-sdd@latest --opencode-agent --lang zh # OpenCode Subagents (12 commands + 9 subagents)
npx cc-sdd@latest --windsurf --lang zh      # Windsurf IDE

# Note: @next is now reserved for future alpha/beta versions
```

## 🌐 Supported Languages

| Language | Code |  |
|----------|------|------|
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

**Usage**: `npx cc-sdd@latest --lang <code>` (e.g., `--lang ja` for Japanese)

## ✨ Quick Start

### For Claude Code (`--claude` / `--claude-agent`)
```bash
# Establish project context first (essential for existing projects)
/yy:steering                                                   # AI learns project context

# Then use self-contained workflow commands
/yy:feature Build a user authentication system with OAuth      # Auto-sizes → small: implement / large: plan
/yy:fix Login fails when email has uppercase letters            # TDD fix → code review → update specs
/yy:investigate Why are sessions expiring early                 # Systematic diagnosis → conclusion → can fix
/yy:plan-exec auth-system                                      # Execute a large feature plan
/yy:status auth-system                                         # Check spec progress
```

![design.md - System Flow Diagram](https://raw.githubusercontent.com/gotalab/cc-sdd/refs/heads/main/assets/design-system_flow.png)
*Example of system flow during the design phase `design.md`*

### For Other Agents (Cursor, Gemini, Codex, Copilot, etc.)

> Command separator varies by agent — see table below or check your agent's installed commands.

| Agent | Separator | Example |
|-------|-----------|---------|
| Gemini, Qwen | `/yy:` | `/yy:steering` |
| Cursor | `/yy/` | `/yy/steering` |
| Copilot, Windsurf, OpenCode | `/yy-` | `/yy-steering` |
| Codex | `/prompts:yy-` | `/prompts:yy-steering` |

```bash
# Workflow (shown with Gemini/Qwen syntax — adapt separator for your agent)
/yy:steering                                                   # AI learns existing project context
/yy:spec-init Add OAuth to existing auth system                # AI creates enhancement plan
/yy:spec-requirements oauth-enhancement                        # AI asks clarifying questions
/yy:validate-gap oauth-enhancement                             # Optional: Analyze existing vs requirements
/yy:spec-design oauth-enhancement                              # Human validates, AI designs
/yy:validate-design oauth-enhancement                          # Optional: Validate design integration
/yy:spec-tasks oauth-enhancement                               # Break into implementation tasks
/yy:spec-impl oauth-enhancement                                # Execute with TDD
```

**30-second setup** → **AI-driven "bolts" (not sprints)** → **Hours-to-delivery results**

### Why teams install cc-sdd
1. **Single source specs** – requirements, design, tasks, and supporting references stay in sync, so reviewers approve faster.
2. **Greenfield or brownfield** – net-new features boot in minutes, while validate gates and project memory keep legacy upgrades safe.
3. **Mix any agent** – the same templates and rules power Claude, Cursor, Codex, Gemini, Copilot, Qwen, and Windsurf simultaneously.
4. **Customize once** – edit `.kiro/settings/templates/` or `.kiro/settings/rules/` and every agent/slash command reflects your workflow.

## ✨ Key Features

- **🚀 AI-DLC Methodology** - AI-native processes with human approval. Core pattern: AI executes, human validates
- **📋 Spec-First Development** - Comprehensive specifications as single source of truth driving entire lifecycle
- **⚡ "Bolts" not Sprints** - [AI-DLC terminology](https://aws.amazon.com/jp/blogs/news/ai-driven-development-life-cycle/) for intensive hours/days cycles replacing weeks-long sprints. Escape the 70% administrative overhead
- **🧠 Persistent Project Memory** - AI maintains comprehensive context (architecture, patterns, rules, domain knowledge) across all sessions via steering documents  
- **🛠 Template flexibility** - Tweak `{{KIRO_DIR}}/settings/templates` (steering, requirements, design, tasks) to mirror your team's deliverables
- **🔄 AI-Native + Human Gates** - AI Plans → AI Asks → Human Validates → AI Implements (rapid cycles with quality control)
- **🌍 Team-Ready** - 13-language support, cross-platform, standardized workflows with quality gates

## 🤖 Supported AI Agents

| Agent | Status | Commands |
|-------|--------|----------|
| **Claude Code** | ✅ Full | 13 commands (`/yy:*`): 6 auto-workflow + 7 step-by-step |
| **Claude Code Agents** | ✅ Full | 13 commands (`/yy:*`) + 9 subagents |
| **Cursor IDE** | ✅ Full | 11 commands |
| **Gemini CLI** | ✅ Full | 11 commands |
| **Codex CLI** | ✅ Full | 11 prompts |
| **GitHub Copilot** | ✅ Full | 11 prompts |
| **Qwen Code** | ✅ Full | 11 commands |
| **Windsurf IDE** | ✅ Full | 11 workflows |
| Others (Factory AI Droid) | 📅 Planned | - |
 
## 📋 Commands

### Claude Code Workflow (`/yy:*`)

**Auto Workflow** (end-to-end, self-closing):
```bash
/yy:steering                              # Create/update project context (run first)
/yy:feature <description>                 # New feature → auto-size → implement or plan
/yy:fix <description>                     # Known bug → TDD fix → code review
/yy:investigate <description>             # Uncertain issue → systematic diagnosis
/yy:plan-exec [spec-name]                 # Execute a large feature plan
/yy:status [spec-name]                    # Check spec progress
```

**Step-by-Step Workflow** (manual control per phase):
```bash
/yy:spec-requirements <feature_name>      # Generate requirements
/yy:spec-design <feature_name>            # Create technical design
/yy:spec-tasks <feature_name>             # Break into implementation tasks
/yy:spec-impl <feature_name> <tasks>      # Execute with TDD
/yy:validate-gap <feature_name>           # Analyze existing functionality gaps
/yy:validate-design <feature_name>        # Review design compatibility
/yy:validate-impl <feature_name>          # Validate implementation against specs
```

### Other Agents Workflow (`/yy:*`)
```bash
/yy:spec-init <description>              # Initialize feature spec
/yy:spec-requirements <feature_name>     # Generate requirements
/yy:spec-design <feature_name>           # Create technical design
/yy:spec-tasks <feature_name>            # Break into implementation tasks
/yy:spec-impl <feature_name> <tasks>     # Execute with TDD
/yy:spec-status <feature_name>           # Check progress
/yy:validate-gap <feature_name>          # Analyze existing functionality gaps
/yy:validate-design <feature_name>       # Review design compatibility
/yy:validate-impl <feature_name>         # Validate implementation against specs
```

> **Specifications as the Foundation**: Based on [Kiro's specs](https://kiro.dev/docs/specs/) - specs transform ad-hoc development into systematic workflows, bridging ideas to implementation with clear AI-human collaboration points.

📖 **[Complete Command Reference](https://github.com/gotalab/cc-sdd/blob/main/docs/guides/command-reference.md)** - Detailed usage, parameters, examples, and troubleshooting for all commands

### Project Memory & Context
```bash
/yy:steering                              # Claude Code
/yy:steering                              # Other agents
```

> **Critical Foundation**: Steering creates persistent project memory. **Run first for existing projects** to improve spec quality.

## 🎨 Customization

Edit templates in `{{KIRO_DIR}}/settings/templates/` to match your workflow. Keep the core structure (requirement numbers, checkboxes, headings) and add your team's context—AI adapts automatically.

**Common customizations**:
- **PRD-style requirements** with business context and success metrics
- **Frontend/Backend designs** optimized for React components or API specs
- **Approval gates** for security, architecture, or compliance reviews
- **JIRA/Linear-ready tasks** with estimation, priority, and labels
- **Domain steering** for API standards, testing conventions, or coding guidelines

📖 **[Customization Guide](https://github.com/gotalab/cc-sdd/blob/main/docs/guides/customization-guide.md)** — 7 practical examples with copy-paste snippets


## ⚙️ Configuration

```bash
# Language and platform
npx cc-sdd@latest --lang zh            # macOS / Linux / Windows (auto-detected)
npx cc-sdd@latest --lang zh --os mac   # Optional explicit override (legacy flag)

# Safe operations  
npx cc-sdd@latest --dry-run --backup

# Custom directory
npx cc-sdd@latest --kiro-dir docs
```

## 📁 Project Structure

After installation, your project gets:

```
project/
├── .claude/commands/yy/      # 6 workflow commands (Claude Code)
├── .codex/prompts/           # 11 prompt commands (Codex CLI)
├── .github/prompts/          # 11 prompt commands (GitHub Copilot)
├── .windsurf/workflows/      # 11 workflow files (Windsurf IDE)
├── .kiro/settings/           # Shared rules & templates (variables resolved with {{KIRO_DIR}})
├── .kiro/specs/              # Feature specifications
├── .kiro/steering/           # AI guidance rules
└── CLAUDE.md (Claude Code)    # Project configuration
```

> Note: only the directories for the agent(s) you install will be created. The tree above shows the full superset for reference.

## 📚 Documentation & Support

- Command Reference: [English](../../docs/guides/command-reference.md) | [简体中文](../../docs/guides/zh/command-reference.md)
- Customization Guide: [English](../../docs/guides/customization-guide.md) | [简体中文](../../docs/guides/zh/customization-guide.md)
- Spec-Driven Guide: [English](../../docs/guides/spec-driven.md) | [简体中文](../../docs/guides/zh/spec-driven.md)
- Claude Subagents Guide: [English](../../docs/guides/claude-subagents.md) | [简体中文](../../docs/guides/zh/claude-subagents.md)
- Migration Guide: [English](../../docs/guides/migration-guide.md) | [简体中文](../../docs/guides/zh/migration-guide.md)
- **[Issues & Support](https://github.com/gotalab/cc-sdd/issues)** - Bug reports and questions
- **[Kiro IDE](https://kiro.dev)**

---

**Stable Release v2.0.0** - Production-ready. [Report issues](https://github.com/gotalab/cc-sdd/issues) | MIT License

### Platform Support
- Supported OS: macOS, Linux, Windows (auto-detected by default).
- Unified command templates across operating systems; `--os` override is optional for legacy automation.

> **Heads-up:** Passing `--os` still works for backward compatibility, but all platforms now receive the same command set.
