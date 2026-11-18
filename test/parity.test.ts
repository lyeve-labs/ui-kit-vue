// @vitest-environment node
import { describe, expect, it } from 'vitest';
import * as Port from '../src/index';
import { CASES, COMPONENTS } from './corpus';
import { renderSvelte, renderVue } from './harness';
import { diffLines, normalize } from './normalize';

describe('corpus', () => {
  it('has a case for every ported component', () => {
    const covered = new Set(CASES.map((c) => c.component));
    expect(COMPONENTS.filter((name) => !covered.has(name))).toEqual([]);
  });

  it('names exactly the components the package exports', () => {
    const exported = Object.keys(Port).filter((key) => /^[A-Z][a-z]/.test(key));
    expect([...exported].sort()).toEqual([...COMPONENTS].sort());
  });

  it('gives every case its own name', () => {
    expect(new Set(CASES.map((c) => c.name)).size).toBe(CASES.length);
  });
});

describe('parity with the Svelte original', () => {
  it.each(CASES.map((c) => [`${c.component}: ${c.name}`, c] as const))('%s', async (_, c) => {
    const svelte = normalize(renderSvelte(c));
    const vue = normalize(await renderVue(c));
    if (vue !== svelte) {
      throw new Error(`markup differs (- Svelte, + Vue)\n${diffLines(svelte, vue)}`);
    }
    expect(vue).toBe(svelte);
  });
});
