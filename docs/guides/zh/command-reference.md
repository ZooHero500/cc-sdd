# 命令参考

> 📖 **简体中文指南（本页）** | [English](../command-reference.md)

所有 yy-spec 命令的完整参考，包含详细用法、示例和故障排查。

> **注意**：本参考基于 Claude Code 命令模板（13 条命令：6 条自动工作流 + 7 条分步工作流）。其他 Agent（Cursor、Gemini CLI、Codex CLI、GitHub Copilot、Qwen Code、Windsurf）共享相同的分步命令，但使用 `spec-init` 代替自动工作流命令。命令分隔符因 Agent 而异——请查看您的 Agent 所安装的命令以了解确切语法。

> 关于安装、CLI 设置和工作区前提条件，请参见[项目 README](../../README.md)。关于附加文档和指南的概览，请从[文档 README](../README.md)开始。

## 快速索引

### 自动工作流命令（端到端，自动完成）
- [`/yy:steering`](#yysteering) - 创建/更新项目记忆
- [`/yy:feature`](#yyfeature) - 新功能 → 自动评估规模 → 实施或规划
- [`/yy:fix`](#yyfix) - 已知缺陷 → TDD 修复 → 代码审查
- [`/yy:investigate`](#yyinvestigate) - 不确定问题 → 系统性诊断
- [`/yy:plan-exec`](#yyplan-exec) - 执行大型功能计划
- [`/yy:status`](#yystatus) - 检查规格进度

### 分步工作流命令（每阶段手动控制）
- [`/yy:spec-requirements`](#yyspec-requirements) - 生成需求
- [`/yy:spec-design`](#yyspec-design) - 创建技术设计
- [`/yy:spec-tasks`](#yyspec-tasks) - 拆解为任务
- [`/yy:spec-impl`](#yyspec-impl) - 执行实施

### 验证命令（可选质量关卡）
- [`/yy:validate-gap`](#yyvalidate-gap) - 分析现有代码与需求的差距
- [`/yy:validate-design`](#yyvalidate-design) - 审查设计质量
- [`/yy:validate-impl`](#yyvalidate-impl) - 验证实施结果

---

### 命令矩阵

| 命令 | 参数 | 主要目的 | 典型下一步 |
|------|------|---------|-----------|
| `/yy:steering` | – | 引导或同步项目记忆 | `/yy:feature` 或分步流程 |
| `/yy:feature` | `<description>` | 新功能 → 自动评估规模 → 实施或规划 | 自动完成（小型）或 `/yy:plan-exec`（大型） |
| `/yy:fix` | `<description>` | 已知缺陷 → TDD 修复 → 代码审查 | 自动完成 |
| `/yy:investigate` | `<description>` | 不确定问题 → 系统性诊断 | 得出结论 → 可转入 `/yy:fix` |
| `/yy:plan-exec` | `[spec-name]` | 执行大型功能计划 | 自动完成 |
| `/yy:status` | `[spec-name]` | 检查规格进度 | 按建议命令恢复 |
| `/yy:spec-requirements` | `<feature-name>` | 生成 EARS 需求 | `/yy:spec-design <feature>` |
| `/yy:validate-gap` | `<feature-name>` | （可选）分析现有代码差距 | `/yy:spec-design <feature>` |
| `/yy:spec-design` | `<feature-name> [-y]` | 生成 `research.md`（需要时）+ 技术设计 | `/yy:spec-tasks <feature>` |
| `/yy:validate-design` | `<feature-name>` | （可选）审查设计质量 | `/yy:spec-tasks <feature>` |
| `/yy:spec-tasks` | `<feature-name> [-y]` | 将设计拆解为带并行安全块（P#）的实施任务 | `/yy:spec-impl <feature> [tasks]` |
| `/yy:spec-impl` | `<feature-name> [task-numbers]` | 使用 TDD 执行任务 | `/yy:validate-impl [feature] [tasks]` |
| `/yy:validate-impl` | `[feature-name] [task-numbers]` | 验证实施质量 | `/yy:status <feature>` |

---

## Steering 命令

### `/yy:steering`

**目的**：创建或更新项目记忆（steering），使每条命令都能引用共享规则、架构约束和产品级指南。它*不*用于功能特定的实施说明。

**参数**：无

**用法**：
```bash
/yy:steering
```

**执行内容**：
分析代码库并生成/更新三个核心 steering 文档，捕获长期有效的指导（而非每个功能的细节）：
- `{{KIRO_DIR}}/steering/structure.md` - 架构模式、目录组织、命名约定
- `{{KIRO_DIR}}/steering/tech.md` - 技术栈、框架决策、技术约束
- `{{KIRO_DIR}}/steering/product.md` - 业务上下文、产品目的、核心能力

<details>
<summary><strong>示例输出（引导初始化）</strong></summary>

```
✅ Steering Created

## Generated:
- product.md: Next.js SaaS platform for team collaboration
- tech.md: Next.js 14, TypeScript, Prisma, PostgreSQL
- structure.md: Feature-first organization under src/features/

Review and approve as Source of Truth.
```

</details>

<details>
<summary><strong>示例输出（同步更新）</strong></summary>

```
✅ Steering Updated

## Changes:
- tech.md: React 18 → 19
- structure.md: Added API route pattern

## Code Drift:
- Components not following import conventions

## Recommendations:
- Consider creating api-standards.md for consistent API patterns
```

</details>

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "No codebase found" | 在空目录中运行 | 从包含实际代码的项目根目录运行 |
| ❌ "Permission denied" | 文件权限不足 | 检查 `.yy-dev/` 目录的写权限 |
| ⚠️ Steering 过于通用 | 代码库较小或全新 | 手动向 `{{KIRO_DIR}}/steering/` 添加领域特定文件 |
| ⚠️ 更新覆盖了自定义内容 | 用户自定义丢失 | Steering 会保留用户内容——如未生效请报告问题 |

**专业提示**：
- 💡 为获得最佳效果，请在创建规格**之前**运行 steering
- 💡 保持内容高层级：架构规则、命名、UX 原则。将功能特定细节存储在 spec/research/design 中
- 💡 Steering 捕获**模式**，而非文件列表——保持可维护性
- 💡 审查生成的 steering 文件并按需自定义
- 💡 定期重新运行以保持 AI 上下文新鲜

**相关命令**：
- [`/yy:feature`](#yyfeature) - 下一步：开始新功能
- [`/yy:fix`](#yyfix) - 修复已知缺陷
- [`/yy:investigate`](#yyinvestigate) - 调查不确定问题

---

## 自动工作流命令

### `/yy:feature`

**目的**：端到端功能开发——自动创建规格、评估范围，并直接实施（小型）或生成详细计划（大型）。

**参数**：`<description>`

**用法**：
```bash
/yy:feature <description>
```

**执行内容**：
1. 检查 steering 是否存在（缺失时提示运行 `/yy:steering`）
2. 自动创建规格目录：`{{KIRO_DIR}}/specs/<feature-name>/`
3. 审查代码库并评估范围：
   - **小型**（≤3 个文件，无架构变更）：生成简化设计 → 使用 TDD 实施 → 代码审查后自动完成
   - **大型**：生成需求、设计、调研 → 创建详细计划 → 提示运行 `/yy:plan-exec`

**示例**：
```bash
/yy:feature Add user authentication with OAuth 2.0
```

---

### `/yy:fix`

**目的**：端到端缺陷修复工作流——TDD 修复，含自动代码审查和规格更新。

**参数**：`<description>`

**用法**：
```bash
/yy:fix <description>
```

**执行内容**：
1. 检查 steering，自动创建规格：`{{KIRO_DIR}}/specs/fix-<name>/`
2. 定位问题代码
3. TDD：编写失败测试 → 修复 → 验证
4. 自动完成：代码审查 → 修复摘要 → 变更日志更新

---

### `/yy:investigate`

**目的**：不确定问题的系统性诊断——遵循 4 阶段方法论得出结论。

**参数**：`<description>`

**用法**：
```bash
/yy:investigate <description>
```

**执行内容**：
1. 检查 steering，自动创建规格：`{{KIRO_DIR}}/specs/investigate-<name>/`
2. 四阶段调查：
   - **根本原因调查** — 读取错误、复现、检查近期变更
   - **模式分析** — 找到可用示例进行比对
   - **假设验证** — 形成假设，单变量测试
   - **结论** — 确定是缺陷、缺失功能还是预期行为
3. 确认为缺陷后 → 用户可批准转入 `/yy:fix` 工作流

---

### `/yy:plan-exec`

**目的**：执行由 `/yy:feature` 生成的大型功能计划。

**参数**：`[spec-name]`

**用法**：
```bash
/yy:plan-exec [spec-name]
```

**执行内容**：
1. 加载规格上下文和计划文件（未指定 spec-name 时自动检测）
2. 分阶段执行计划
3. 自动完成：代码审查 → 变更日志更新

---

### `/yy:status`

**目的**：显示一个或所有规格的进度和状态。

**参数**：`[spec-name]`

**用法**：
```bash
/yy:status                    # 列出所有规格
/yy:status user-auth-oauth    # 指定规格的详细状态
```

**执行内容**：
1. 列出所有规格及其类型、状态和完成度
2. 针对指定规格：显示阶段状态、任务进度和下一步操作
3. 建议合适的下一条命令

---

## 分步工作流命令

> **注意**：分步命令需要一个已存在的规格目录。使用 `/yy:feature` 自动创建，或手动创建。其他 Agent（Cursor、Gemini 等）使用 `spec-init` 进行初始化。

### `/yy:spec-requirements`

**目的**：根据功能描述，以 EARS 格式生成全面的、可测试的需求。

**参数**：`<feature-name>`

**用法**：
```bash
/yy:spec-requirements <feature-name>
```

**参数说明**：
- `<feature-name>`（必填）：功能目录名（来自 `/yy:feature` 或手动创建）

**执行内容**：
1. 从所有 steering 文件加载项目上下文
2. 从初始 `requirements.md` 读取功能描述
3. 使用 EARS 格式生成结构化需求
4. 更新 `requirements.md` 并在 `spec.json` 中标记阶段为完成

**EARS 格式**（Easy Approach to Requirements Syntax）：
```
WHEN <trigger> THE <system> SHALL <action>
IF <condition> THEN THE <system> SHALL <action>
WHERE <feature> THE <system> SHALL <action>
THE <system> SHALL <action>
```

**示例**：
```bash
/yy:spec-requirements user-auth-oauth
```

<details>
<summary><strong>示例输出</strong></summary>

```
## Generated Requirements Summary
- User Authentication: Login, logout, session management
- OAuth 2.0 Integration: Google and GitHub providers
- JWT Token Management: Generation, validation, refresh
- Security: HTTPS enforcement, CSRF protection, rate limiting
- Error Handling: Clear error messages for auth failures

## Document Status
✓ Updated .yy-dev/specs/user-auth-oauth/requirements.md (87 acceptance criteria)
✓ Updated spec.json metadata (phase: requirements-generated)

## Next Steps
1. Review requirements.md and verify all expected functionality is covered
2. Approve by running: /yy:spec-design user-auth-oauth
  Or refine requirements and run this command again
```

</details>

<details>
<summary><strong>生成的需求结构</strong></summary>

```markdown
# Requirements: User Auth OAuth

## 1. Functional Requirements

### 1.1 User Authentication
**FR-1.1.1**: Login with OAuth
- WHEN user clicks "Login with Google" THE system SHALL redirect to Google OAuth consent screen
- WHEN OAuth callback received THE system SHALL validate authorization code
- IF validation succeeds THEN THE system SHALL create user session with JWT token

### 1.2 Session Management
...

## 2. Non-Functional Requirements

### 2.1 Security
- THE system SHALL enforce HTTPS for all authentication endpoints
...
```

</details>

**适用场景**：
- ✅ 规格目录已存在（通过 `/yy:feature` 或手动创建）后
- ✅ 需要在设计之前**明确需求**时
- ✅ 需要**迭代**需求时（可多次运行以精炼）

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "Missing project description" | requirements.md 为空 | 按提示提供功能详情 |
| ❌ "Spec not found" | 功能名称错误 | 检查 `.yy-dev/specs/` 中的正确名称 |
| ⚠️ 需求过于通用 | 缺少 steering 上下文 | 先运行 `/yy:steering` 以获得更好的上下文 |
| ⚠️ 缺少某些需求 | 描述不完整 | 审查后重新运行，或手动添加到 requirements.md |
| ⚠️ 未使用 EARS 格式 | 模板问题 | 检查 `{{KIRO_DIR}}/settings/rules/ears-format.md` |

**专业提示**：
- 💡 **迭代过程** - 可多次运行以精炼需求
- 💡 检查 EARS 语句的清晰度——应可测试和可验证
- 💡 AI 生成初始版本后会请求反馈——回应所需变更
- 💡 如有需要可直接编辑 `requirements.md`——AI 会保留您的编辑

**相关命令**：
- [`/yy:validate-gap`](#yyvalidate-gap) - 可选：分析现有代码差距
- [`/yy:spec-design`](#yyspec-design) - 下一步：创建技术设计
- [`/yy:status`](#yystatus) - 检查需求进度

---

### `/yy:spec-design`

**目的**：创建全面的技术设计，将需求（WHAT）转化为架构设计（HOW）。

**参数**：`<feature-name> [-y]`

**用法**：
```bash
/yy:spec-design <feature-name> [-y]
```

**参数说明**：
- `<feature-name>`（必填）：功能目录名
- `[-y]`（可选）：无需确认自动批准需求

**执行内容**：
1. **验证**需求已批准（或使用 `-y` 自动批准）
2. 通过调研和分析**探索**合适的架构
3. 将发现**记录**到 `research.md`（不需要调研时自动跳过）
4. **生成**包含组件、接口、数据模型的技术设计
5. 为复杂架构**创建** Mermaid 图表
6. **更新** `design.md` 和元数据

**探索过程**：
命令根据功能复杂度自动确定调研深度（仅在阶段产生新发现时才写入 `research.md`）：
- **复杂/新功能** → 完整探索（WebSearch 寻找模式、API、库）
- **扩展功能** → 轻量探索（集成点、现有模式）
- **简单新增** → 最小化探索（快速模式检查）

**示例**：
```bash
# 标准流程，含审批提示
/yy:spec-design user-auth-oauth

# 快速模式，自动审批
/yy:spec-design user-auth-oauth -y
```

<details>
<summary><strong>示例输出</strong></summary>

```
## Discovery Phase
Analyzing feature type: Complex Integration (OAuth + JWT)
Executing full discovery process...

✓ Researched OAuth 2.0 best practices and security considerations
✓ Verified JWT library compatibility (jsonwebtoken@9.0.2)
✓ Analyzed existing authentication patterns in codebase
✓ Identified integration points: API routes, middleware, database

## Design Generated
✓ Updated .yy-dev/specs/user-auth-oauth/research.md with discovery notes
✓ Created .yy-dev/specs/user-auth-oauth/design.md

Summary:
- Architecture: NextAuth.js integration with custom JWT provider
- Components: 7 core components (AuthProvider, TokenManager, OAuthHandler...)
- Data Models: User, Session, RefreshToken (PostgreSQL schema)
- Integration: 3 existing API routes modified
- Security: HTTPS, CSRF tokens, rate limiting, secure cookies

## Next Steps
Review design.md and approve to continue:
/yy:spec-tasks user-auth-oauth
```

</details>

<details>
<summary><strong>生成的设计结构</strong></summary>

```markdown
# Design: User Auth OAuth

## 1. Architecture Overview
[Mermaid diagram showing component relationships]

## 2. Component Specifications

### 2.1 AuthProvider
**Purpose**: React context provider for auth state
**Interfaces**:
- Props: { children: ReactNode }
- Returns: AuthContext with user, login(), logout()
**Dependencies**: TokenManager, API client
**Implementation Notes**: SSR-compatible, handles token refresh

### 2.2 TokenManager
...

## 3. Data Models
[Database schema with relationships]

## 4. Integration Points
[How this integrates with existing codebase]

## 5. Security Considerations
[Threat model and mitigations]

## 6. Testing Strategy
[Test coverage requirements]
```

</details>

**适用场景**：
- ✅ 需求已**批准**（手动或使用 `-y`）后
- ✅ 需要**架构指导**后再实施时
- ✅ 需要调研和设计决策的**复杂功能**

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "Requirements not approved" | 缺少审批步骤 | 审查 requirements.md 并批准，或使用 `-y` 标志 |
| ❌ "Design phase failed" | 调研期间网络问题 | 检查 WebSearch/WebFetch 的网络连接 |
| ⚠️ 设计过于浅显 | 自动检测为简单功能 | 如需更多细节可手动请求 |
| ⚠️ 缺少图表 | 复杂架构 | 验证 Mermaid 语法，如需要可手动添加 |
| ⚠️ 设计不符合代码库 | Steering 不完整 | 使用当前模式更新 `/yy:steering` |

**自动审批（`-y` 标志）**：
- ⚠️ **谨慎使用** - 跳过了人工需求审查
- ✅ **适合**：开发期间的迭代、可信赖的需求
- ❌ **避免用于**：生产功能、关键系统、首次工作流

**专业提示**：
- 💡 **审查探索发现** - AI 调研外部依赖和 API
- 💡 设计是**可编辑的** - 可按需自定义并重新运行（合并模式）
- 💡 **Mermaid 图表**为复杂架构自动生成——验证其是否能正确渲染
- 💡 集成点显示**新代码如何融入**现有系统

**相关命令**：
- [`/yy:validate-design`](#yyvalidate-design) - 可选：任务生成前的质量审查
- [`/yy:spec-tasks`](#yyspec-tasks) - 下一步：拆解为实施任务
- [`/yy:status`](#yystatus) - 检查设计进度

---

### `/yy:spec-tasks`

**目的**：生成详细的、可操作的实施任务，将设计转化为可执行的工作项，包括带有 `P0`、`P1` 等标签的并行友好波次。

**参数**：`<feature-name> [-y]`

**用法**：
```bash
/yy:spec-tasks <feature-name> [-y]
```

**参数说明**：
- `<feature-name>`（必填）：功能目录名
- `[-y]`（可选）：无需确认自动批准需求和设计

**执行内容**：
1. **验证**需求和设计已批准（或使用 `-y` 自动批准）
2. 将所有需求**映射**到具体的实施任务
3. 将任务**规模化**为每个 1-3 小时，以便管理
4. 以逻辑层次和进度**组织**任务
5. 用 `P#` 标签**标记**执行波次，使团队了解哪些任务可以并行
6. **更新** `tasks.md` 和元数据

**任务结构**：
```
P0 — 串行关卡（必须在 P1 之前完成）
  主任务（1, 2, 3...）
    子任务（1.1, 1.2...），规模为 1-3 小时，各含验收标准

P1 — 并行波次（多个主任务可以并发运行）
  主任务（4, 5...）
    子任务（4.1, 4.2...）
```

**示例**：
```bash
# 标准流程，含审批提示
/yy:spec-tasks user-auth-oauth

# 快速模式，自动审批
/yy:spec-tasks user-auth-oauth -y
```

<details>
<summary><strong>示例输出</strong></summary>

```
## Status
✓ Generated tasks at .yy-dev/specs/user-auth-oauth/tasks.md

## Task Summary
- Total: 8 major tasks, 24 sub-tasks
- All 15 requirements covered
- Average task size: 1-3 hours per sub-task
- Estimated completion: 48-72 hours

## Next Steps
Review tasks.md and start implementation:
/yy:spec-impl user-auth-oauth 1.1,1.2
```

</details>

<details>
<summary><strong>生成的任务结构</strong></summary>

```markdown
# Implementation Tasks: User Auth OAuth

P0 — Backend Foundation
## 1. Database Schema and Models
- [ ] 1.1 Create User table with OAuth fields (email, provider, providerId, tokens)
- [ ] 1.2 Create Session table for JWT token management
- [ ] 1.3 Create RefreshToken table for token rotation
- [ ] 1.4 Add database migrations and rollback scripts

P1 — Service Integration
## 2. OAuth Provider Configuration
- [ ] 2.1 Set up Google OAuth client credentials and redirect URLs
- [ ] 2.2 Set up GitHub OAuth application and callback endpoints
- [ ] 2.3 Implement environment variable configuration for OAuth secrets
- [ ] 2.4 Create OAuth provider abstraction layer

P1 — Service Integration
## 3. Authentication API Routes
- [ ] 3.1 Implement /api/auth/[provider]/login endpoint
- [ ] 3.2 Implement /api/auth/callback handler for OAuth flow
- [ ] 3.3 Implement /api/auth/logout endpoint
- [ ] 3.4 Implement /api/auth/refresh for token renewal

...
```

</details>

**任务原则**：
- ✅ **自然语言** - "Create User table" 而非 "Define UserSchema class"
- ✅ **自包含** - 每个任务都有明确范围，可独立完成
- ✅ **增量式** - 每个任务完成后与系统集成（无孤立工作）
- ✅ **可测试** - 每个任务都有明确的验收标准
- ✅ **并行感知** - `P0` 用于阻塞性工作，相同 `P#` 可以并发执行
- ✅ **必要时顺序执行** - P0 先于 P1，主任务仍按编号排列以保持清晰

**适用场景**：
- ✅ 设计已**批准**（手动或使用 `-y`）后
- ✅ 需要有清晰里程碑的**实施路线图**时
- ✅ 开始实际编码前了解范围

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "Design not approved" | 缺少审批步骤 | 审查 design.md 并批准，或使用 `-y` 标志 |
| ❌ "Tasks too large" | 需求复杂 | AI 应自动调整为 1-3 小时——如未调整请报告 |
| ⚠️ 孤立任务 | 任务未集成 | 验证 tasks.md 遵循集成原则 |
| ⚠️ 需求缺失 | 映射不完整 | 检查所有需求是否有对应任务 |
| ⚠️ 层级过多 | 嵌套过深 | 任务限制为 2 层（主任务 + 子任务）——如需更深层请手动编辑 |

**任务编号**：
- 主任务：`1, 2, 3, 4...`（顺序，不重复）
- 子任务：每个主任务下 `1.1, 1.2, 1.3...`
- ❌ **禁止**：`1.1.1`（无第三层）
- ✅ **始终**：任务完成后集成（无"稍后实施"的占位符）

**自动审批（`-y` 标志）**：
- ⚠️ 同时批准**需求和设计**
- ✅ **适合**：快速原型、迭代
- ❌ **避免用于**：未经人工审查的生产功能

**专业提示**：
- 💡 **审查任务顺序** - 应遵循逻辑实施顺序
- 💡 任务是**复选框** - `[ ]` 未完成，`[x]` 由 `/yy:spec-impl` 完成
- 💡 **自由编辑** - 按需添加、删除或重新排序任务
- 💡 运行 `/yy:status` 追踪完成进度

**相关命令**：
- [`/yy:spec-impl`](#yyspec-impl) - 下一步：执行实施任务
- [`/yy:status`](#yystatus) - 追踪任务完成度
- [`/yy:validate-impl`](#yyvalidate-impl) - 实施后验证

---

### `/yy:spec-impl`

**目的**：使用测试驱动开发（TDD）方法论执行实施任务。

**参数**：`<feature-name> [task-numbers]`

**用法**：
```bash
/yy:spec-impl <feature-name> [task-numbers]
```

**参数说明**：
- `<feature-name>`（必填）：功能目录名
- `[task-numbers]`（可选）：要执行的逗号分隔任务 ID
  - 格式：`1.1,1.2,1.3` 或 `1,2,3`
  - 如省略：执行**所有待完成**的未勾选任务

**执行内容**：
遵循 **Kent Beck 的 TDD 循环**执行任务：
1. **🔴 RED** - 首先编写失败测试
2. **🟢 GREEN** - 编写最少代码通过测试
3. **🔵 REFACTOR** - 在保持测试通过的情况下清理代码
4. **✅ VERIFY** - 确保无回归
5. **📝 MARK COMPLETE** - 在 tasks.md 中更新复选框

**示例**：
```bash
# 执行指定任务
/yy:spec-impl user-auth-oauth 1.1,1.2,1.3

# 执行功能中所有待完成任务
/yy:spec-impl user-auth-oauth

# 执行单个任务
/yy:spec-impl user-auth-oauth 2.1

# 执行主任务（所有子任务）
/yy:spec-impl user-auth-oauth 1
```

<details>
<summary><strong>示例实施会话</strong></summary>

```
## Executing Tasks for user-auth-oauth

### Task 1.1: Create User table with OAuth fields
🔴 RED: Writing test...
✓ Created tests/models/user.test.ts
  - Test: User.create() with OAuth fields
  - Expected to fail: User model doesn't exist

🟢 GREEN: Implementing...
✓ Created src/models/User.ts
✓ Added OAuth fields: email, provider, providerId
✓ Tests passing

🔵 REFACTOR: Cleaning up...
✓ Extracted schema validation to helper
✓ Added TypeScript types
✓ All tests still passing

✅ VERIFY: Final checks...
✓ Unit tests: 5/5 passing
✓ No regressions in existing tests
✓ Code coverage: +15 lines

📝 Updated tasks.md: [x] 1.1 Create User table with OAuth fields
```

</details>

**TDD 工作流详情**：

**🔴 RED 阶段**：
- 在实施代码**之前**编写测试
- 测试应该**失败**（代码尚不存在）
- 使用描述性测试名称

**🟢 GREEN 阶段**：
- 编写**最少代码**通过测试
- 不要过度设计
- 只专注于让**这个测试**通过

**🔵 REFACTOR 阶段**：
- 改善代码结构
- 消除重复
- 应用模式
- **测试必须仍然通过**

**适用场景**：
- ✅ 任务已在 spec.json 中**批准**后
- ✅ 准备好**编写实际代码**时
- ✅ **增量实施**（指定任务编号）
- ✅ **完成所有待完成任务**（不指定任务编号）

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "Tasks not approved" | spec.json 中缺少批准 | 审查 tasks.md 并批准，或检查 spec.json |
| ❌ "Feature not found" | 功能名称错误 | 验证名称与 `.yy-dev/specs/` 目录匹配 |
| ❌ "Invalid task number" | 任务 ID 不存在 | 检查 tasks.md 中有效的任务编号 |
| ❌ "Tests failing" | 实施不完整 | 在继续下一个任务前修复失败测试 |
| ⚠️ 测试未优先编写 | 未遵循 TDD | AI 应先编写测试——如跳过请报告 |
| ⚠️ 检测到回归 | 破坏了现有功能 | 在继续之前修复以维护质量 |

**任务选择**：
```bash
# 指定子任务
/yy:spec-impl feature 1.1,1.2,1.3

# 主任务 1 的所有子任务
/yy:spec-impl feature 1

# 混合主任务和子任务
/yy:spec-impl feature 1,2.1,2.2,3

# 所有待完成任务（空复选框）
/yy:spec-impl feature
```

**验证步骤**：
每个任务完成后：
- ✅ 所有测试通过（新测试 + 现有测试）
- ✅ 现有功能无回归
- ✅ 代码覆盖率维持或提升
- ✅ 实施遵循 design.md 规范
- ✅ tasks.md 中的复选框已更新

**专业提示**：
- 💡 **从小做起** - 初始时每次执行 1-2 个任务
- 💡 **TDD 是必须的** - 测试在实施之前编写
- 💡 **检查回归** - 现有测试必须继续通过
- 💡 **增量提交** - 每个任务或小批次后提交
- 💡 频繁运行 `/yy:status` 追踪进度
- 💡 实施后使用 `/yy:validate-impl`

**相关命令**：
- [`/yy:validate-impl`](#yyvalidate-impl) - 验证已完成的实施
- [`/yy:status`](#yystatus) - 检查实施进度
- [`/yy:spec-tasks`](#yyspec-tasks) - 查看任务列表

---

## 验证命令

### `/yy:validate-gap`

**目的**：分析需求与现有代码库之间的差距，为实施策略提供参考（棕地项目的可选质量关卡）。

**参数**：`<feature-name>`

**用法**：
```bash
/yy:validate-gap <feature-name>
```

**参数说明**：
- `<feature-name>`（必填）：功能目录名

**执行内容**：
1. 加载需求和**所有 steering 上下文**
2. 使用 Grep 和 Read 工具分析现有代码库
3. 识别缺失能力和集成挑战
4. 评估多种实施方案
5. 生成差距分析报告

**适用场景**：
- ✅ **棕地项目** - 有新需求的现有代码库
- ✅ **设计阶段之前** - 为技术决策提供参考
- ✅ **复杂集成** - 先了解现有模式
- ❌ **全新项目** - 新代码库跳过此步骤

**示例**：
```bash
/yy:validate-gap user-auth-oauth
```

<details>
<summary><strong>差距分析示例</strong></summary>

```
## Gap Analysis Summary

### Scope
Adding OAuth 2.0 authentication to existing username/password system

### Key Findings
- ✅ Authentication middleware exists (src/middleware/auth.ts)
- ✅ User model already has email field
- ❌ No OAuth provider integration
- ❌ Missing JWT token management
- ⚠️ Current session uses cookies, needs JWT migration

### Implementation Approaches

**Option 1: Extend Existing Auth (Recommended)**
Pros: Preserves current users, gradual migration
Cons: Dual auth systems temporarily
Effort: Medium (3-4 days)
Risk: Low

**Option 2: Replace with OAuth-Only**
Pros: Clean architecture, modern approach
Cons: Requires user migration, breaking change
Effort: High (5-7 days)
Risk: Medium

**Option 3: Parallel Systems**
Pros: Zero downtime, safe rollback
Cons: Complex maintenance
Effort: High (6-8 days)
Risk: Low

### Recommendations
1. Start with Option 1 (extend existing)
2. Phase 1: Add OAuth alongside current auth
3. Phase 2: Migrate existing users to OAuth
4. Phase 3: Deprecate username/password (6 months)

### Areas Requiring Research
- JWT library selection (jsonwebtoken vs jose)
- OAuth provider rate limits and quotas
- Token refresh strategy (sliding window vs absolute expiry)

## Next Steps
Proceed to design phase with this analysis:
/yy:spec-design user-auth-oauth
```

</details>

**分析框架**：
1. **现有能力** - 已实施的内容
2. **缺失能力** - 需要构建的内容
3. **集成点** - 新代码连接的位置
4. **多种方案** - 带权衡分析的可行方法
5. **调研需求** - 需要深入调研的领域

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "Requirements not found" | 功能名称错误或阶段不对 | 先运行 `/yy:spec-requirements` |
| ⚠️ 分析过于浅显 | 代码库较小 | 如需要可手动提供更多上下文 |
| ⚠️ 缺少集成点 | Steering 不完整 | 使用当前架构更新 `/yy:steering` |
| 💡 "能否跳过？" | 全新项目 | 可以——这对新代码库是可选的 |

**专业提示**：
- 💡 **非强制性** - 可选质量关卡，对棕地项目尤为有用
- 💡 为**设计决策**提供参考——在 spec-design 阶段使用发现结果
- 💡 **多种方案** - AI 评估权衡以辅助决策
- 💡 差距分析可以**早期识别风险**
- 💡 标记设计之前需要**进一步调研**的领域

**相关命令**：
- [`/yy:spec-requirements`](#yyspec-requirements) - 必须在差距分析之前运行
- [`/yy:spec-design`](#yyspec-design) - 差距分析后的下一步
- [`/yy:validate-design`](#yyvalidate-design) - 创建后的设计验证

---

### `/yy:validate-design`

**目的**：交互式技术设计质量审查，确保准备好进入实施阶段（可选质量关卡）。

**参数**：`<feature-name>`

**用法**：
```bash
/yy:validate-design <feature-name>
```

**参数说明**：
- `<feature-name>`（必填）：功能目录名

**执行内容**：
1. 加载设计文档和所有上下文
2. 进行交互式质量审查
3. 识别**最多 3 个关键问题**
4. 认可设计优点
5. 提供带理由的 **GO/NO-GO 决策**

**适用场景**：
- ✅ **复杂架构** - 高风险或复杂设计
- ✅ **任务拆解之前** - 早期发现问题
- ✅ **团队审查** - 结构化审查流程
- ❌ **简单功能** - 直接实施时跳过

**示例**：
```bash
/yy:validate-design user-auth-oauth
```

<details>
<summary><strong>设计审查示例</strong></summary>

```
## Design Review: user-auth-oauth

### Review Summary
Design is comprehensive with well-defined components and security considerations.
Minor gaps in error handling and testing strategy require attention before implementation.

### Critical Issues

**1. Token Refresh Race Condition (High Priority)**
Current design doesn't handle concurrent refresh requests. If multiple tabs
refresh simultaneously, could invalidate tokens incorrectly.

Recommendation: Implement token refresh lock mechanism using Redis or in-memory store.

**2. Missing OAuth State Validation (Security)**
Design lacks CSRF protection via OAuth state parameter. Vulnerable to authorization
code interception attacks.

Recommendation: Generate and validate cryptographic state parameter in OAuth flow.

**3. Error Handling Incomplete (Medium Priority)**
Design specifies happy path but lacks comprehensive error scenarios:
- OAuth provider downtime
- Token expiry during request
- Revoked OAuth permissions

Recommendation: Add error handling section with retry strategies and user feedback.

### Design Strengths
- ✅ Well-architected component separation (AuthProvider, TokenManager, OAuthHandler)
- ✅ Database schema includes proper indexes and constraints
- ✅ Security considerations comprehensive (HTTPS, rate limiting, secure cookies)

### Final Assessment
**🟡 CONDITIONAL GO**

Design is solid but requires addressing the 3 critical issues before task generation.
All issues are addressable within existing architecture - no fundamental redesign needed.

Estimated fix time: 2-3 hours of design refinement.

### Next Steps
1. Update design.md to address the 3 issues above
2. Re-run validation or proceed directly to tasks if confident
3. Generate tasks: /yy:spec-tasks user-auth-oauth
```

</details>

**决策类型**：
- **🟢 GO** - 设计已准备好进入实施
- **🟡 CONDITIONAL GO** - 有少量问题需要处理，但可以继续
- **🔴 NO-GO** - 存在需要重新设计的根本性问题

**审查标准**：
- ✅ 需求覆盖
- ✅ 组件接口与契约
- ✅ 与现有系统的集成
- ✅ 安全考量
- ✅ 错误处理与边缘情况
- ✅ 可测试性
- ✅ 性能影响

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "Design not found" | 功能名称错误或阶段不对 | 先运行 `/yy:spec-design` |
| ⚠️ 关键问题过多 | 设计复杂或不完整 | 解决问题后重新运行验证 |
| ⚠️ 审查过于宽松 | 简单功能 | 验证仅关注关键风险 |
| 💡 "是否需要？" | 不确定是否必要 | 可选——用于复杂/高风险设计 |

**关键问题指南**：
- **最多 3 个问题** - 聚焦最重要的
- **显著影响成功** - 非吹毛求疵或风格偏好
- **可操作** - 提供明确建议
- **按优先级排序** - 按严重程度/风险排列

**专业提示**：
- 💡 **非强制性** - 任务生成前的可选质量关卡
- 💡 **交互式过程** - 与 AI 就关切点进行对话
- 💡 仅关注**关键风险**，而非追求完美
- 💡 **均衡评估** - 也认可设计优点
- 💡 用于**同行评审** - 为团队讨论提供结构化格式

**相关命令**：
- [`/yy:spec-design`](#yyspec-design) - 必须在设计验证之前运行
- [`/yy:spec-tasks`](#yyspec-tasks) - GO 决策后的下一步
- [`/yy:validate-gap`](#yyvalidate-gap) - 可选的设计前验证

---

### `/yy:validate-impl`

**目的**：根据需求、设计和任务验证实施结果，确保质量和完整性。

**参数**：`[feature-name] [task-numbers]`

**用法**：
```bash
/yy:validate-impl [feature-name] [task-numbers]
```

**参数说明**：
- `[feature-name]`（可选）：要验证的功能
  - 如省略：从对话历史中自动检测
- `[task-numbers]`（可选）：要验证的具体任务
  - 格式：`1.1,1.2,1.3`
  - 如省略：验证所有已完成的任务（`[x]`）

**执行内容**：
1. **检测**已完成的实施（从历史或复选框）
2. **加载**需求、设计、任务和 steering 上下文
3. **验证**：
   - ✅ 测试存在且通过
   - ✅ 需求可追溯性（EARS 需求已覆盖）
   - ✅ 设计结构在代码中有体现
   - ✅ 现有功能无回归
4. **报告**验证结果

**示例**：
```bash
# 从最近的 /yy:spec-impl 命令自动检测
/yy:validate-impl

# 验证指定功能（所有已完成任务）
/yy:validate-impl user-auth-oauth

# 验证指定任务
/yy:validate-impl user-auth-oauth 1.1,1.2,1.3
```

<details>
<summary><strong>实施验证示例</strong></summary>

```
## Implementation Validation: user-auth-oauth

### Detected Implementations
From conversation history:
- Task 1.1: Create User table with OAuth fields ✅
- Task 1.2: Create Session table for JWT token management ✅
- Task 1.3: Create RefreshToken table ✅

### Validation Results

#### ✅ Task 1.1: User Table
**Tests**: 5/5 passing
- ✓ User.create() with OAuth fields
- ✓ Validation for required fields
- ✓ Unique constraint on email+provider
- ✓ Database migration rollback

**Requirements Coverage**:
- ✓ FR-1.1.1: Store user OAuth provider data
- ✓ FR-1.1.2: Unique user identification

**Design Alignment**:
- ✓ Matches User model specification in design.md
- ✓ Includes all specified fields
- ✓ Implements specified constraints

**Code Quality**: No issues

---

#### ⚠️ Task 1.3: RefreshToken Table
**Tests**: 3/4 passing
- ✓ Token rotation
- ✓ Revocation handling
- ❌ FAILING: Concurrent refresh test (race condition)

**Recommendation**: Fix race condition before proceeding

---

### Summary
- ✅ 2/3 tasks fully validated
- ⚠️ 1/3 tasks with issues requiring attention
- Overall: 12/13 tests passing (92%)
- Requirements coverage: 5/6 (83%)

### Next Steps
1. Fix Task 1.3 race condition
2. Re-run validation: /yy:validate-impl user-auth-oauth 1.3
3. Continue with Task 2.x when ready
```

</details>

**验证检查项**：
1. **测试覆盖**
   - 已实施功能存在对应测试
   - 所有测试通过
   - 现有测试无回归

2. **需求可追溯性**
   - EARS 需求已映射到实施
   - 所有指定功能存在

3. **设计一致性**
   - 代码结构遵循 design.md
   - 组件符合规范
   - 接口正确实施

4. **代码质量**
   - 无明显问题或反模式
   - 遵循 steering 中的项目约定

**适用场景**：
- ✅ **实施后** - 验证已完成任务
- ✅ **PR/合并之前** - 代码审查的质量关卡
- ✅ **调试** - 当功能不工作时识别差距
- ✅ **进度检查** - 验证实施完整性

**常见问题**：

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| ❌ "No implementation found" | 没有已完成的任务 | 先运行 `/yy:spec-impl` |
| ❌ "Tests failing" | 实施不完整或有错误 | 在验证通过前修复失败测试 |
| ⚠️ 缺失需求 | 实施不完整 | 实施缺失的功能 |
| ⚠️ 设计不符 | 代码未遵循设计 | 重构以符合 design.md 规范 |
| 💡 自动检测不工作 | 无历史记录 | 明确指定功能和任务编号 |

**自动检测**：
扫描对话历史中的：
```bash
/yy:spec-impl user-auth-oauth 1.1,1.2,1.3
```
提取：`user-auth-oauth` 和任务 `1.1, 1.2, 1.3`

**专业提示**：
- 💡 **每次实施会话后**运行以早期发现问题
- 💡 在持续对话中**自动检测**效果很好
- 💡 作为移向下一个主任务前的**质量关卡**
- 💡 **回归**会被标记——现有测试必须仍然通过
- 💡 与 `/yy:status` 配合使用，获得完整的进度视图

**相关命令**：
- [`/yy:spec-impl`](#yyspec-impl) - 实施执行
- [`/yy:status`](#yystatus) - 功能整体进度
- [`/yy:spec-tasks`](#yyspec-tasks) - 查看任务列表

---

## 状态与实用工具

### `/yy:status`

**目的**：显示某个规格在所有阶段的综合状态和进度。

**参数**：`<feature-name>`

**用法**：
```bash
/yy:status <feature-name>
```

**参数说明**：
- `<feature-name>`（必填）：要检查的功能目录名

**执行内容**：
1. 从 `spec.json` 加载规格元数据
2. 分析所有规格文件（需求、设计、任务）
3. 计算完成百分比
4. 识别下一步操作
5. 报告任何阻塞项

**状态指示器**：
- ✅ **完成** - 阶段已完成并批准
- ⏳ **进行中** - 阶段已开始，尚未完成
- ❌ **阻塞** - 无法继续（缺少依赖）
- 🔄 **待审查** - 已生成但未批准

**适用场景**：
- ✅ **检查进度** - 了解功能状态
- ✅ **中断后** - 恢复工作
- ✅ **规划** - 估算剩余工作量
- ✅ **调试** - 识别缺失的批准或文件
- ✅ **状态更新** - 向团队分享进度

**专业提示**：
- 💡 **频繁运行**以追踪进度
- 💡 **估算**有助于规划和排期
- 💡 **阻塞项**章节突出显示阻碍进度的内容
- 💡 用于上下文切换后**恢复工作**
- 💡 非常适合**团队会议中的状态更新**

**相关命令**：
- [`/yy:spec-impl`](#yyspec-impl) - 继续实施
- [`/yy:validate-impl`](#yyvalidate-impl) - 验证已完成工作
- 根据当前阶段使用其他所有 spec 命令

---

## 工作流示例

<details>
<summary><strong>自动工作流（推荐用于 Claude Code）</strong></summary>

```bash
# 1. 建立项目上下文（运行一次）
/yy:steering

# 2. 使用适当的自动工作流命令：
/yy:feature Add user authentication with OAuth 2.0    # 新功能
/yy:fix Login fails when email has uppercase letters   # 已知缺陷
/yy:investigate Why are sessions expiring early        # 不确定问题

# 3. 对于大型功能，执行生成的计划：
/yy:plan-exec user-auth-oauth

# 4. 随时检查进度：
/yy:status user-auth-oauth
```

</details>

<details>
<summary><strong>分步工作流（手动控制）</strong></summary>

```bash
# 1. 项目设置
/yy:steering

# 2. 通过 /yy:feature 创建规格（自动创建规格目录）
/yy:feature User authentication with OAuth 2.0 and JWT tokens

# 3. 手动分步控制
/yy:spec-requirements user-auth-oauth
/yy:validate-gap user-auth-oauth          # 可选：棕地项目
/yy:spec-design user-auth-oauth
/yy:validate-design user-auth-oauth       # 可选：复杂设计
/yy:spec-tasks user-auth-oauth

# 4. 增量实施
/yy:spec-impl user-auth-oauth 1.1,1.2
/yy:spec-impl user-auth-oauth 1.3,1.4

# 5. 检查进度和验证
/yy:status user-auth-oauth
/yy:validate-impl user-auth-oauth
```

</details>

---

## 常见模式

<details>
<summary><strong>迭代精炼</strong></summary>

```bash
# 生成初始版本
/yy:spec-requirements feature

# 审查并精炼（可多次运行）
/yy:spec-requirements feature  # 根据反馈更新

# 设计和任务同理
/yy:spec-design feature
/yy:spec-design feature  # 根据审查精炼
```

</details>

<details>
<summary><strong>增量实施</strong></summary>

```bash
# 每次实施一个主任务
/yy:spec-impl feature 1
/yy:validate-impl feature

/yy:spec-impl feature 2
/yy:validate-impl feature

# 检查整体进度
/yy:status feature
```

</details>

### 质量关卡
```bash
# 每个阶段的可选关卡
/yy:spec-requirements feature
/yy:validate-gap feature          # 可选：仅棕地项目

/yy:spec-design feature
/yy:validate-design feature       # 可选：复杂设计

/yy:spec-tasks feature

/yy:spec-impl feature 1.1,1.2
/yy:validate-impl feature         # 可选：每次会话后
```

---

## 提示与最佳实践

### 通用
- 🎯 **始终先运行 steering**（现有项目）——大幅提升质量
- 🎯 **每次一个功能** - 避免并行规格开发
- 🎯 **频繁提交** - 每个完成的任务或阶段后
- 🎯 **审查后再批准** - 生产功能不要自动审批（`-y`）

### Steering
- 💡 现有项目**首先**运行 `/yy:steering`
- 💡 **重大重构后**重新运行以更新上下文
- 💡 手动向 `{{KIRO_DIR}}/steering/` 添加领域特定文件以涵盖专业模式
- 💡 Steering 是**累积的** - 保留您的自定义内容

### 需求
- 💡 描述要**具体** - 包含约束和上下文
- 💡 **自由迭代** - 可多次运行以精炼
- 💡 验证 **EARS 格式**以获得可测试的验收标准
- 💡 所有需求应**可测试和可验证**

### 设计
- 💡 **谨慎使用** `-y` 标志 - 跳过了需求审查
- 💡 让 AI **进行调研** - 探索阶段发现最佳实践
- 💡 **审查图表** - 确保 Mermaid 语法能正确渲染
- 💡 设计可以**编辑和重新生成**（合并模式）

### 任务
- 💡 任务应为 **1-3 小时**——如更大请提出问题
- 💡 **自然语言**描述——要做什么，而非代码结构
- 💡 验证**所有需求**都有对应任务
- 💡 检查**任务顺序** - 应遵循逻辑顺序

### 实施
- 💡 **TDD 是必须的** - 测试先于代码
- 💡 从**小批次**开始 - 初始时 1-2 个任务
- 💡 关注**回归** - 现有测试必须通过
- 💡 频繁运行 `/yy:status` 追踪进度
- 💡 **每次会话后**使用 `/yy:validate-impl`

### 验证
- 💡 **validate-gap**：用于棕地项目，全新项目跳过
- 💡 **validate-design**：用于复杂/高风险设计
- 💡 **validate-impl**：每次实施会话后使用
- 💡 验证是**可选的** - 质量关卡，不是阻塞器

---

## 故障排查

### "Feature not found"
**原因**：功能名称错误或规格不存在
**解决方案**：检查 `.yy-dev/specs/` 目录中的正确名称

### "Requirements/Design not approved"
**原因**：阶段在 spec.json 中未标记为已批准
**解决方案**：审查文档并批准，或使用 `-y` 标志

### "Template missing"
**原因**：安装损坏或不完整
**解决方案**：重新安装 yy-spec：`npx yy-spec@latest`

### 任务未完成
**原因**：tasks.md 中的复选框格式不正确
**解决方案**：确保格式完全为 `- [ ]`（未完成）或 `- [x]`（已完成）

### 实施期间测试失败
**原因**：实施不完整或不正确
**解决方案**：在继续下一个任务之前修复失败测试（TDD RED→GREEN→REFACTOR）

### Steering 似乎已过时
**原因**：自上次 steering 更新后代码库已变更
**解决方案**：重新运行 `/yy:steering` 与当前代码同步

### AI 建议与项目不符
**原因**：Steering 上下文不完整或缺失
**解决方案**：运行 `/yy:steering` 并向 `{{KIRO_DIR}}/steering/` 添加领域特定文件

---

## 快速参考卡

```
┌─────────────────────────────────────────────────────────────┐
│ yy-spec 命令快速参考（Claude Code：13 条命令）               │
├─────────────────────────────────────────────────────────────┤
│ 自动工作流（端到端，自动完成）                              │
│  /yy:steering              创建/更新项目记忆               │
│  /yy:feature <desc>        新功能 → 自动评估规模            │
│  /yy:fix <desc>            已知缺陷 → TDD 修复             │
│  /yy:investigate <desc>    不确定问题 → 诊断               │
│  /yy:plan-exec [spec]      执行大型功能计划                 │
│  /yy:status [spec]         检查规格进度                    │
├─────────────────────────────────────────────────────────────┤
│ 分步工作流（每阶段手动控制）                                │
│  /yy:spec-requirements <f> 生成需求                        │
│  /yy:spec-design <f> [-y]  创建技术设计                    │
│  /yy:spec-tasks <f> [-y]   拆解为实施任务                  │
│  /yy:spec-impl <f> [tasks] 使用 TDD 执行                   │
├─────────────────────────────────────────────────────────────┤
│ 验证（可选质量关卡）                                        │
│  /yy:validate-gap <f>      分析现有代码与需求差距           │
│  /yy:validate-design <f>   审查设计质量                    │
│  /yy:validate-impl [f] [t] 验证实施结果                    │
└─────────────────────────────────────────────────────────────┘

说明：<f> = feature-name，[t] = task-numbers，[-y] = 自动批准
```

---

## 相关文档

- [规格驱动开发工作流](spec-driven.md) - 概念概览与方法论
- [Claude Code 子 Agent](claude-subagents.md) - 子 Agent 工作流模式
- [项目 README](../../README.md) - 安装与快速开始

---

**最后更新**：2026-03-05
**版本**：2.1.1
