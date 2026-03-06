---
description: Complete bugfix workflow — TDD fix with auto code review
allowed-tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, LS, WebFetch, WebSearch
argument-hint: <bug-description>
---

# Bugfix Workflow

<background_information>
- **Mission**: End-to-end bugfix — from problem description to verified fix with code review
- **Success Criteria**:
  - Root cause identified and documented
  - Failing test written before fix (TDD)
  - All tests pass after fix with no regressions
  - Code review passed
  - Spec and changelog updated
</background_information>

<instructions>
## Core Task
Fix the bug described in **$ARGUMENTS** using a complete TDD workflow with automatic code review.

## Execution Steps

### Step 1: Check Prerequisites
- Verify `{{KIRO_DIR}}/steering/` exists and has core files (product.md, tech.md, structure.md)
- If missing: **Stop** and tell user to run `/yy:steering` first
- Load entire `{{KIRO_DIR}}/steering/` directory as project context

### Step 2: Create Spec
1. Generate a short kebab-case name from the bug description
2. Check `{{KIRO_DIR}}/specs/` for naming conflicts (append number suffix if needed)
3. Create directory: `{{KIRO_DIR}}/specs/fix-<name>/`
4. Read template `{{KIRO_DIR}}/settings/templates/specs/init-bugfix.json`
   - Replace `{{FEATURE_NAME}}`, `{{TIMESTAMP}}`, `{{LANG_CODE}}`
   - Write as `spec.json`
5. Read template `{{KIRO_DIR}}/settings/templates/specs/investigation.md`
   - Fill in bug description from $ARGUMENTS
   - Write as `investigation.md`

### Step 3: Locate Problem
- Analyze the bug description
- Search codebase for relevant code
- Identify root cause
- Document findings in `investigation.md`

### Step 4: TDD Fix
Follow Kent Beck's TDD cycle:

1. **RED — Write Failing Test**:
   - Write a test that reproduces the bug
   - Verify the test fails

2. **GREEN — Fix the Bug**:
   - Implement the minimal fix to make the test pass
   - Focus only on the root cause

3. **REFACTOR — Clean Up**:
   - Improve code if needed
   - Ensure all tests still pass

4. **VERIFY**:
   - Run full test suite
   - Confirm no regressions

### Step 5: Auto-Complete
1. **Code Review**: Invoke the `superpowers:requesting-code-review` skill if available. If the skill is not available, perform a manual review: re-read all changed files, check for bugs, security issues, code style violations, and missing edge cases.
   - If issues found → fix them → re-review → repeat until clean
2. **Generate fix-summary.md** in the spec directory:
   - Root cause analysis
   - Fix description
   - Affected files
   - Test coverage
3. **Update changelog**: Read template `{{KIRO_DIR}}/settings/templates/specs/changelog.md` if changelog doesn't exist in spec dir, create it. Append entry with date, description, and affected files.
4. **Update spec.json**: Set `status: "closed"` and `updated_at` to current timestamp

### Step 6: Output Summary
Brief summary of:
- What was wrong (root cause)
- What was fixed
- Tests added/modified
- Files changed

## Critical Constraints
- **TDD Mandatory**: Test MUST be written before the fix
- **Steering Required**: Do not proceed without steering
- **No Scope Creep**: Fix only the reported bug
- **Auto-Review**: Always run code review before completing
</instructions>

## Tool Guidance
- **Read first**: Load steering and related code before any changes
- **Test first**: Write failing test before implementing fix
- Use **Grep/Glob** to locate relevant code
- Use **WebSearch/WebFetch** for library documentation when needed

## Output Description
Provide output in the language specified in spec.json:
1. **Root Cause**: 1-2 sentence description
2. **Fix Applied**: What was changed
3. **Tests**: New/modified tests
4. **Files Changed**: Bullet list
5. **Status**: Spec closed

**Format**: Concise, under 200 words. Use Markdown.

## Safety & Fallback

**Steering Missing**:
- **Stop**: "Steering not found. Run `/yy:steering` first to establish project context."

**Cannot Reproduce**:
- Document findings in investigation.md
- Suggest using `/yy:investigate` for deeper analysis

**Test Failures After Fix**:
- Do not mark as complete
- Report failing tests and ask for guidance
