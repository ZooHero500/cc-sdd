# Spec-Driven Development Workflow (WIP)

> 📖 **简体中文版:** [规格驱动开发工作流](zh/spec-driven.md)

This document explains how yy-spec implements Spec-Driven Development (SDD) inside the AI-Driven Development Life Cycle (AI-DLC). Use it as a reference when deciding which slash command to run, what artifact to review, and how to adapt the workflow to your team.

## Lifecycle Overview

### Auto Workflow (Claude Code)

For Claude Code users, the auto-workflow commands handle the full lifecycle:

1. **Steering** – `/yy:steering` gathers architecture, conventions, and domain knowledge.
2. **Feature/Fix/Investigate** – `/yy:feature`, `/yy:fix`, or `/yy:investigate` auto-creates specs and drives the workflow end-to-end.
3. **Plan Execution** – `/yy:plan-exec [spec]` executes large feature plans in a new session.
4. **Status** – `/yy:status [spec]` tracks progress across all specs.

### Step-by-Step Workflow (All Agents)

For manual control or other agents:

1. **Steering (Context Capture)** – `/yy:steering` gathers architecture, conventions, and domain knowledge into steering docs.
2. **Spec Initiation** – Create the feature workspace via `/yy:feature` (Claude) or `/yy:spec-init` (other agents).
3. **Requirements** – `/yy:spec-requirements <feature>` collects clarifications and produces `requirements.md`.
4. **Design** – `/yy:spec-design <feature>` first emits/updates `research.md` with investigation notes (skipped when no research is needed), then yields `design.md` for human approval.
5. **Task Planning** – `/yy:spec-tasks <feature>` creates `tasks.md`, mapping deliverables to implementable chunks and tagging each wave with `P0`, `P1`, etc. so teams know which tasks can run in parallel.
6. **Implementation** – `/yy:spec-impl <feature> <task-ids>` drives execution and validation.
7. **Quality Gates** – optional `/yy:validate-gap` and `/yy:validate-design` commands compare requirements/design against existing code before implementation.
8. **Status Tracking** – `/yy:status [spec]` summarises progress and approvals.

Each phase pauses for human review unless you explicitly bypass it (for example by passing `-y` or the CLI `--auto` flag). Because Spec-Driven Development relies on these gates for quality control, keep manual approvals in place for production work and only use auto-approval in tightly controlled experiments. Teams can embed their review checklists in the template files so that each gate reflects local quality standards.

## Command → Artifact Map

| Command | Purpose | Primary Artefact(s) |
|---------|---------|---------------------|
| `/yy:steering` | Build / refresh project memory | `.yy-dev/steering/*.md`
| `/yy:feature <desc>` | New feature → auto-size → implement or plan | `.yy-dev/specs/<feature>/`
| `/yy:fix <desc>` | Known bug → TDD fix → code review | `.yy-dev/specs/fix-<name>/`
| `/yy:investigate <desc>` | Uncertain issue → diagnosis | `.yy-dev/specs/investigate-<name>/`
| `/yy:spec-requirements <feature>` | Capture requirements & gaps | `requirements.md`
| `/yy:spec-design <feature>` | Produce investigation log + implementation design | `research.md` (when needed), `design.md`
| `/yy:spec-tasks <feature>` | Break design into tasks with parallel waves | `tasks.md` (with P-labels)
| `/yy:spec-impl <feature> <task-ids>` | Implement specific tasks | Code + task updates
| `/yy:validate-gap <feature>` | Optional gap analysis vs existing code | `gap-report.md`
| `/yy:validate-design <feature>` | Optional design validation | `design-validation.md`
| `/yy:status [spec]` | See phase, approvals, open tasks | CLI summary

## Customising the Workflow

- **Templates** – adjust `{{KIRO_DIR}}/settings/templates/{requirements,design,tasks}.md` to mirror your review process. yy-spec copies these into every spec.
- **Approvals** – embed checklists or required sign-offs in template headers. Agents will surface them during each phase.
- **Artifacts** – extend templates with additional sections (risk logs, test plans, etc.) to make the generated documents match company standards.

## New vs Existing Projects

- **Greenfield** – if you already have project-wide guardrails, capture them via `/yy:steering` first; otherwise start with `/yy:feature` (Claude) or `/yy:spec-init` (other agents) and let steering evolve as those rules become clear.
- **Brownfield** – start with `/yy:steering`, then use `/yy:validate-gap` and `/yy:validate-design` to ensure new specs reconcile with the existing system before implementation.

## Related Resources

- [Quick Start in README](../../README.md#-quick-start)
- [Claude Code Subagents Workflow](claude-subagents.md)
