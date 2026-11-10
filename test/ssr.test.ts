// @vitest-environment node
import { parseFragment } from 'parse5';
import { describe, expect, it } from 'vitest';
import { CASES } from './corpus';
import { renderVue } from './harness';

interface Node {
  nodeName: string;
  attrs?: { name: string; value: string }[];
  childNodes?: Node[];
}

/** Every element name and every attribute name in the output, so a script or a handler cannot hide. */
function scan(node: Node, found: { tags: Set<string>; handlers: string[] }) {
  found.tags.add(node.nodeName);
  for (const { name } of node.attrs ?? []) {
    if (/^on/i.test(name)) found.handlers.push(name);
  }
  for (const child of node.childNodes ?? []) scan(child, found);
  return found;
}

describe('server render', () => {
  it('runs with no browser global', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it.each(CASES.map((c) => [`${c.component}: ${c.name}`, c] as const))(
    '%s holds no script and no inline handler',
    async (_, c) => {
      const html = await renderVue(c);
      const found = scan(parseFragment(html) as unknown as Node, { tags: new Set(), handlers: [] });
      expect(found.tags.has('script')).toBe(false);
      expect(found.handlers).toEqual([]);
    },
  );
});
