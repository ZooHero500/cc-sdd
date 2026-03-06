import { describe, it, expect } from 'vitest';
import { parseArgs, type ParsedArgs } from '../src/cli/args';

describe('parseArgs', () => {
  it('parses basic flags with explicit values', () => {
    const args = parseArgs([
      '--agent', 'claude-code',
      '--lang', 'zh',
      '--os', 'auto',
      '--overwrite', 'prompt',
      '--kiro-dir', '.yy-dev',
    ]);
    const expected: ParsedArgs = {
      agent: 'claude-code',
      lang: 'zh',
      os: 'auto',
      overwrite: 'prompt',
      kiroDir: '.yy-dev',
    };
    expect(args).toEqual(expected);
  });

  it('supports boolean flags and short aliases', () => {
    const args = parseArgs(['--dry-run', '-y']);
    expect(args.dryRun).toBe(true);
    expect(args.yes).toBe(true);
  });

  it('parses supported languages', () => {
    expect(parseArgs(['--lang', 'en']).lang).toBe('en');
    expect(parseArgs(['--lang', 'zh']).lang).toBe('zh');
  });

  it('parses backup with and without value', () => {
    expect(parseArgs(['--backup']).backup).toBe(true);
    expect(parseArgs(['--backup', '.yy-spec.backup']).backup).toBe('.yy-spec.backup');
    expect(parseArgs(['--backup=.yy-spec.backup/custom']).backup).toBe('.yy-spec.backup/custom');
  });

  it('supports agent alias flags and detects conflicts', () => {
    expect(parseArgs(['--gemini-cli']).agent).toBe('gemini-cli');
    expect(parseArgs(['--qwen-code']).agent).toBe('qwen-code');
    expect(parseArgs(['--claude-code']).agent).toBe('claude-code');
    expect(parseArgs(['--claude-agent']).agent).toBe('claude-code-agent');
    expect(parseArgs(['--claude-code-agent']).agent).toBe('claude-code-agent');
    expect(parseArgs(['--windsurf']).agent).toBe('windsurf');

    expect(() => parseArgs(['--agent', 'qwen-code', '--gemini-cli'])).toThrowError(/agent.*conflict/i);
    expect(() => parseArgs(['--gemini-cli', '--qwen-code'])).toThrowError(/agent.*conflict/i);
  });

  it('validates enum values for os/lang/overwrite/agent', () => {
    expect(() => parseArgs(['--os', 'macos'])).toThrowError(/os.*invalid/i);
    expect(() => parseArgs(['--lang', 'jp'])).toThrowError(/lang.*invalid/i);
    expect(() => parseArgs(['--overwrite', 'replace'])).toThrowError(/overwrite.*invalid/i);
    expect(() => parseArgs(['--agent', 'unknown'])).toThrowError(/agent.*invalid/i);
  });

  it('rejects unknown flags', () => {
    expect(() => parseArgs(['--unknown-flag'])).toThrowError(/unknown flag/i);
  });
});
