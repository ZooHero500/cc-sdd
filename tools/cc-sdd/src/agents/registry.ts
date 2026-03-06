export interface AgentLayoutDefaults {
  commandsDir: string;
  agentDir: string;
  docFile: string;
}

export interface AgentCommandHints {
  spec: string;
  steering: string;
  steeringCustom: string;
}

export interface AgentCompletionGuide {
  prependSteps?: string[];
  appendSteps?: string[];
}

export interface AgentDefinition {
  label: string;
  description: string;
  aliasFlags: string[];
  recommendedModels?: string[];
  layout: AgentLayoutDefaults;
  commands: AgentCommandHints;
  manifestId?: string;
  completionGuide?: AgentCompletionGuide;
  templateFallbacks?: Record<string, string>;
}

const codexCopyInstruction = String.raw`Move Codex Custom prompts to ~/.codex/prompts by running:
    mkdir -p ~/.codex/prompts \
      && cp -Ri ./.codex/prompts/. ~/.codex/prompts/ \
      && printf '\n==== COPY PHASE DONE ====\n' \
      && printf 'Remove original ./.codex/prompts ? [y/N]: ' \
      && IFS= read -r a \
      && case "$a" in [yY]) rm -rf ./.codex/prompts && echo 'Removed.' ;; *) echo 'Kept original.' ;; esac`;

export const agentDefinitions = {
  'claude-code': {
    label: 'Claude Code',
    description:
      'Installs yy workflow commands in `.claude/commands/yy/`, shared settings in `{{KIRO_DIR}}/settings/` (default `.kiro/settings/`), and a CLAUDE.md quickstart.',
    aliasFlags: ['--claude-code', '--claude'],
    recommendedModels: ['Claude Opus 4.5 or newer'],
    layout: {
      commandsDir: '.claude/commands/yy',
      agentDir: '.claude',
      docFile: 'CLAUDE.md',
    },
    commands: {
      spec: '`/yy:feature <description>`',
      steering: '`/yy:steering`',
      steeringCustom: '',
    },
    templateFallbacks: {
      'CLAUDE.md': '../../CLAUDE.md',
    },
    manifestId: 'claude-code',
  },
  'claude-code-agent': {
    label: 'Claude Code Agents',
    description:
      'Installs yy workflow commands in `.claude/commands/yy/`, a Claude agent library in `.claude/agents/kiro/`, shared settings in `{{KIRO_DIR}}/settings/`, and a CLAUDE.md quickstart.',
    aliasFlags: ['--claude-code-agent', '--claude-agent'],
    recommendedModels: ['Claude Opus 4.5 or newer'],
    layout: {
      commandsDir: '.claude/commands/yy',
      agentDir: '.claude',
      docFile: 'CLAUDE.md',
    },
    commands: {
      spec: '`/yy:feature <description>`',
      steering: '`/yy:steering`',
      steeringCustom: '',
    },
    templateFallbacks: {
      'CLAUDE.md': '../../CLAUDE.md',
    },
    manifestId: 'claude-code-agent',
  },
  codex: {
    label: 'Codex CLI',
    description:
      'Installs yy prompts in `.codex/prompts/`, shared settings in `{{KIRO_DIR}}/settings/`, and an AGENTS.md quickstart.',
    aliasFlags: ['--codex', '--codex-cli'],
    recommendedModels: ['gpt-5.2-codex', 'gpt-5.2'],
    layout: {
      commandsDir: '.codex/prompts',
      agentDir: '.codex',
      docFile: 'AGENTS.md',
    },
    commands: {
      spec: '`/prompts:yy-spec-init <what-to-build>`',
      steering: '`/prompts:yy-steering`',
      steeringCustom: '`/prompts:yy-steering-custom <what-to-create-custom-steering-document>`',
    },
    completionGuide: {
      prependSteps: [codexCopyInstruction],
    },
    manifestId: 'codex',
  },
  cursor: {
    label: 'Cursor IDE',
    description:
      'Installs yy prompts in `.cursor/commands/yy/`, shared settings in `{{KIRO_DIR}}/settings/`, and an AGENTS.md quickstart.',
    aliasFlags: ['--cursor'],
    recommendedModels: ['Claude Opus 4.5 or newer', 'gpt-5.2-codex', 'gpt-5.2'],
    layout: {
      commandsDir: '.cursor/commands/yy',
      agentDir: '.cursor',
      docFile: 'AGENTS.md',
    },
    commands: {
      spec: '`/yy/spec-init <what-to-build>`',
      steering: '`/yy/steering`',
      steeringCustom: '`/yy/steering-custom <what-to-create-custom-steering-document>`',
    },
    manifestId: 'cursor',
  },
  'github-copilot': {
    label: 'GitHub Copilot',
    description:
      'Installs yy prompts in `.github/prompts/`, shared settings in `{{KIRO_DIR}}/settings/`, and an AGENTS.md quickstart.',
    aliasFlags: ['--copilot', '--github-copilot'],
    recommendedModels: ['Claude Opus 4.5 or newer', 'gpt-5.2-codex', 'gpt-5.2'],
    layout: {
      commandsDir: '.github/prompts',
      agentDir: '.github',
      docFile: 'AGENTS.md',
    },
    commands: {
      spec: '`/yy-spec-init <what-to-build>`',
      steering: '`/yy-steering`',
      steeringCustom: '`/yy-steering-custom <what-to-create-custom-steering-document>`',
    },
    manifestId: 'github-copilot',
  },
  'gemini-cli': {
    label: 'Gemini CLI',
    description:
      'Installs yy prompts in `.gemini/commands/yy/`, shared settings in `{{KIRO_DIR}}/settings/`, and a GEMINI.md quickstart.',
    aliasFlags: ['--gemini-cli', '--gemini'],
    recommendedModels: ['Gemini 3 Flash or newer'],
    layout: {
      commandsDir: '.gemini/commands/yy',
      agentDir: '.gemini',
      docFile: 'GEMINI.md',
    },
    commands: {
      spec: '`/yy:spec-init <what-to-build>`',
      steering: '`/yy:steering`',
      steeringCustom: '`/yy:steering-custom <what-to-create-custom-steering-document>`',
    },
    manifestId: 'gemini-cli',
  },
  windsurf: {
    label: 'Windsurf IDE',
    description:
      'Installs yy workflows in `.windsurf/workflows/`, shared settings in `{{KIRO_DIR}}/settings/`, and an AGENTS.md quickstart.',
    aliasFlags: ['--windsurf'],
    recommendedModels: ['Claude Opus 4.5 or newer', 'gpt-5.2-codex', 'gpt-5.2'],
    layout: {
      commandsDir: '.windsurf/workflows',
      agentDir: '.windsurf',
      docFile: 'AGENTS.md',
    },
    commands: {
      spec: '`/yy-spec-init <what-to-build>`',
      steering: '`/yy-steering`',
      steeringCustom: '`/yy-steering-custom <what-to-create-custom-steering-document>`',
    },
    manifestId: 'windsurf',
  },
  'qwen-code': {
    label: 'Qwen Code',
    description:
      'Installs yy prompts in `.qwen/commands/yy/`, shared settings in `{{KIRO_DIR}}/settings/`, and a QWEN.md quickstart.',
    aliasFlags: ['--qwen-code', '--qwen'],
    layout: {
      commandsDir: '.qwen/commands/yy',
      agentDir: '.qwen',
      docFile: 'QWEN.md',
    },
    commands: {
      spec: '`/yy:spec-init <what-to-build>`',
      steering: '`/yy:steering`',
      steeringCustom: '`/yy:steering-custom`',
    },
    manifestId: 'qwen-code',
  },
  'opencode': {
    label: 'OpenCode',
    description:
      'Installs yy prompts in `.opencode/commands/`, shared settings in `{{KIRO_DIR}}/settings/`, and an AGENTS.md quickstart.',
    aliasFlags: ['--opencode'],
    recommendedModels: ['gpt-5.2-codex', 'gpt-5.2'],
    layout: {
      commandsDir: '.opencode/commands',
      agentDir: '.opencode',
      docFile: 'AGENTS.md',
    },
    commands: {
      spec: '`/yy-spec-init <what-to-build>`',
      steering: '`/yy-steering`',
      steeringCustom: '`/yy-steering-custom <what-to-create-custom-steering-document>`',
    },
    manifestId: 'opencode',
  },
  'opencode-agent': {
    label: 'OpenCode Agents',
    description:
      'Installs yy commands in `.opencode/commands/`, a yy agent library in `.opencode/agents/kiro/`, shared settings in `{{KIRO_DIR}}/settings/`, and an AGENTS.md quickstart.',
    aliasFlags: ['--opencode-agent'],
    recommendedModels: ['gpt-5.2-codex', 'gpt-5.2'],
    layout: {
      commandsDir: '.opencode/commands',
      agentDir: '.opencode',
      docFile: 'AGENTS.md',
    },
    commands: {
      spec: '`/yy-spec-quick <what-to-build>`',
      steering: '`/yy-steering`',
      steeringCustom: '`/yy-steering-custom <what-to-create-custom-steering-document>`',
    },
    templateFallbacks: {
      'AGENTS.md': '../../AGENTS.md',
    },
    manifestId: 'opencode-agent',
  },
} as const satisfies Record<string, AgentDefinition>;

export type AgentType = keyof typeof agentDefinitions;

export const getAgentDefinition = (agent: AgentType): AgentDefinition => {
  const definition = agentDefinitions[agent];
  if (!definition) {
    throw new Error(`Unknown agent: ${agent as string}`);
  }
  return definition as AgentDefinition;
};

export const agentList = Object.keys(agentDefinitions) as AgentType[];
