---
description: Systematic investigation workflow — diagnose issues with structured methodology
allowed-tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, LS, WebFetch, WebSearch
argument-hint: <issue-description>
---

# Investigation Workflow

<background_information>
- **Mission**: Systematically investigate an issue using structured debugging methodology, reach a conclusion, and optionally transition to a fix
- **Success Criteria**:
  - Root cause identified or clearly ruled out
  - Investigation documented with evidence
  - Clear conclusion: bug, not-a-bug, or needs-more-info
  - If bug confirmed and user approves, seamlessly transition to fix workflow
</background_information>

<instructions>
## Core Task
Investigate the issue described in **$ARGUMENTS** using a 4-phase systematic debugging methodology.

## Execution Steps

### Step 1: Check Prerequisites
- Verify `{{KIRO_DIR}}/steering/` exists and has core files (product.md, tech.md, structure.md)
- If missing: **Stop** and tell user to run `/yy:steering` first
- Load entire `{{KIRO_DIR}}/steering/` directory as project context

### Step 2: Create Spec
1. Generate a short kebab-case name from the issue description
2. Check `{{KIRO_DIR}}/specs/` for naming conflicts
3. Create directory: `{{KIRO_DIR}}/specs/investigate-<name>/`
4. Read template `{{KIRO_DIR}}/settings/templates/specs/init-investigation.json`
   - Replace `{{FEATURE_NAME}}`, `{{TIMESTAMP}}`, `{{LANG_CODE}}`
   - Write as `spec.json`
5. Read template `{{KIRO_DIR}}/settings/templates/specs/investigation.md`
   - Fill in issue description from $ARGUMENTS
   - Write as `investigation.md`

### Step 3: Systematic Investigation (4 Phases)

**Phase 1 — Root Cause Investigation**:
- Read error messages, logs, and stack traces
- Attempt to reproduce the issue
- Check recent changes (git log, git diff) for potential causes
- Document observations in `investigation.md`

**Phase 2 — Pattern Analysis**:
- Find working examples of similar functionality
- Compare working vs broken code paths
- Identify what's different
- Document patterns found

**Phase 3 — Hypothesis and Testing**:
- Form specific, testable hypotheses
- Test each hypothesis with single-variable changes
- Document results for each hypothesis
- Narrow down to root cause

**Phase 4 — Conclusion**:
- Synthesize findings into a clear conclusion
- Classify: **bug** / **not-a-bug** / **needs-more-info**
- Document evidence supporting the conclusion

### Step 4: Act on Conclusion

**If Bug**:
1. Update `spec.json`: set `is_bug: true`, `conclusion: "<summary>"`
2. Describe the trigger scenario and conditions
3. Ask user: "Bug confirmed. Would you like to proceed with the fix?"
4. If user confirms → Execute full fix workflow (same as `/yy:fix`):
   - TDD: Write failing test → Fix → Verify
   - Code review via `superpowers:requesting-code-review` skill if available; otherwise perform manual review of all changes
   - Generate fix-summary.md
   - Update changelog and spec.json (status: "closed")

**If Not a Bug**:
1. Update `spec.json`: set `is_bug: false`, `conclusion: "<summary>"`, `status: "closed"`
2. Document the explanation clearly
3. If it's a missing feature, suggest: "Consider `/yy:feature` for this capability"

**If Needs More Info**:
1. Update `spec.json`: set `conclusion: "needs-more-info"`, keep `status: "open"`
2. List specific information needed
3. Suggest next steps for the user

### Step 5: Update Documentation
- Finalize `investigation.md` with all findings
- Update changelog if a fix was applied

## Critical Constraints
- **Systematic**: Follow all 4 phases — do not skip to conclusions
- **Evidence-Based**: Every conclusion must cite specific evidence
- **Single Variable**: Test one hypothesis at a time
- **Document Everything**: All findings go into investigation.md
</instructions>

## Tool Guidance
- **Grep/Glob**: Search for error patterns, related code
- **Bash**: Run tests, check git history, reproduce issues
- **Read**: Examine code, configs, logs
- **WebSearch**: Look up error messages or library issues

## Output Description
Provide output in the language specified in spec.json:
1. **Issue**: Brief restatement
2. **Investigation Summary**: Key findings from each phase
3. **Conclusion**: Bug / Not-a-bug / Needs-more-info with evidence
4. **Action Taken**: Fix applied or recommendations
5. **Next Steps**: If applicable

**Format**: Structured Markdown, under 300 words.

## Safety & Fallback

**Steering Missing**:
- **Stop**: "Steering not found. Run `/yy:steering` first."

**Cannot Determine Root Cause**:
- Document all findings and hypotheses tested
- Set conclusion to "needs-more-info"
- Provide specific suggestions for further investigation

**Destructive Testing**:
- Never run destructive operations without user confirmation
- Use isolated test environments when possible
