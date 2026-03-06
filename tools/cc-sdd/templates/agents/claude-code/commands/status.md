---
description: Show specification status and progress
allowed-tools: Bash, Read, Glob, Write, Edit, MultiEdit, Update
argument-hint: [spec-name]
---

# Specification Status

<background_information>
- **Mission**: Display comprehensive status and progress for specifications
- **Success Criteria**:
  - Show current status and type for each spec
  - Identify next actions
  - Provide clear visibility into progress
</background_information>

<instructions>
## Core Task
Show status for spec **$1**, or list all specs if no argument given.

## Execution Steps

### If $1 is provided: Single Spec Status

#### Step 1: Load Spec Context
- Read `{{KIRO_DIR}}/specs/$1/spec.json` for metadata and status
- Check `{{KIRO_DIR}}/specs/$1/` directory for available files
- Read existing files as needed: `requirements.md`, `design.md`, `tasks.md`, `investigation.md`, `fix-summary.md`, `changelog.md`

#### Step 2: Analyze Status by Type

**For type: "feature"**:
- Check size (small/large) and current status
- If has tasks.md: count completed vs total tasks (parse `- [x]` vs `- [ ]`)
- Identify next action based on status

**For type: "bugfix"**:
- Check if investigation.md and fix-summary.md exist
- Show root cause and fix status

**For type: "investigation"**:
- Check conclusion and is_bug fields
- Show investigation progress and findings

#### Step 3: Generate Report
Create report in the language specified in spec.json:
1. **Spec Overview**: Name, type, status, dates
2. **Progress**: Type-specific progress details
3. **Next Action**: What command to run next
4. **Issues**: Any blockers

### If no argument: List All Specs

1. Scan `{{KIRO_DIR}}/specs/` for all spec directories
2. Read each `spec.json` for metadata
3. Display table/list with: name, type, status, last updated
4. Group by status (open → planned → closed)

## Critical Constraints
- Use language from spec.json
- Calculate accurate status
- Suggest specific next action commands using `/yy:` prefix
</instructions>

## Tool Guidance
- **Read**: Load spec.json first, then other files as needed
- **Glob**: Check which spec files/directories exist

## Output Description

Provide status report in the language specified in spec.json:

### Single Spec:
1. **Overview**: Name, type, status, created/updated dates
2. **Progress**: Type-specific details with completion indicators
3. **Next Action**: Specific `/yy:` command to run next
4. **Issues**: Any blockers or missing elements

### All Specs:
- Table format with columns: Name | Type | Status | Updated
- Summary counts: X open, Y planned, Z closed

**Format**: Clear, scannable format with status indicators (✅/⏳/❌)

## Safety & Fallback

**Spec Not Found**:
- "No spec found for `$1`. Available specs:"
- List all spec directories

**No Specs Exist**:
- "No specs found. Start with `/yy:feature`, `/yy:fix`, or `/yy:investigate`."

**Incomplete Spec**:
- Identify missing files
- Suggest next action
