/**
 * One canonical form for server-rendered markup, so the Svelte original and
 * the Vue port compare as documents rather than as strings.
 *
 * It removes only what carries no meaning for the page: comments (Svelte's
 * hydration markers and Vue's fragment markers), whitespace-only text, runs
 * of whitespace, attribute order, class order, how a boolean attribute is
 * spelled, the spacing in a style, and the value a framework picks for a
 * generated id. Every other difference survives.
 */
import { parseFragment } from 'parse5';

/** The prefix both harnesses give the framework's id generator. */
export const ID_PREFIX = 'gen';

const BOOLEAN = new Set([
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  // Not an HTML attribute. Svelte writes it as a boolean and Vue as "true",
  // and the browser reads neither, so both spellings mean the same.
  'indeterminate',
  'inert',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'selected',
]);

/** Attributes whose value is, or lists, an id. */
const ID_REFS = new Set(['id', 'for', 'aria-describedby', 'aria-labelledby', 'aria-controls', 'name']);

const VOID = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

interface Node {
  nodeName: string;
  tagName?: string;
  value?: string;
  attrs?: { name: string; value: string }[];
  childNodes?: Node[];
  content?: Node;
}

function escapeText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function normalizeStyle(value: string): string {
  return value
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const at = d.indexOf(':');
      if (at < 0) return d.replace(/\s+/g, ' ');
      return `${d.slice(0, at).trim().toLowerCase()}: ${d
        .slice(at + 1)
        .trim()
        .replace(/\s+/g, ' ')}`;
    })
    .join('; ');
}

/** Normalizes one document fragment of server output. */
export function normalize(html: string): string {
  const generated = new RegExp(`\\b${ID_PREFIX}-s?\\d+\\b`, 'g');
  const ids = new Map<string, string>();
  const canonicalId = (raw: string) => {
    let id = ids.get(raw);
    if (id === undefined) {
      id = `id${ids.size + 1}`;
      ids.set(raw, id);
    }
    return id;
  };

  const lines: string[] = [];

  function attributes(node: Node): string {
    const out: string[] = [];
    const attrs = [...(node.attrs ?? [])].sort((a, b) => (a.name < b.name ? -1 : 1));
    for (const { name, value } of attrs) {
      let v = value;
      if (name === 'class') {
        const tokens = [...new Set(v.split(/\s+/).filter(Boolean))].sort();
        if (tokens.length === 0) continue;
        v = tokens.join(' ');
      } else if (name === 'style') {
        v = normalizeStyle(v);
      } else if (BOOLEAN.has(name)) {
        v = '';
      } else if (ID_REFS.has(name)) {
        v = v.replace(generated, canonicalId);
      }
      out.push(` ${name}="${escapeAttr(v)}"`);
    }
    return out.join('');
  }

  function children(node: Node): Node[] {
    const source = node.nodeName === 'template' && node.content ? node.content : node;
    const merged: Node[] = [];
    for (const child of source.childNodes ?? []) {
      if (child.nodeName === '#comment') continue;
      const last = merged[merged.length - 1];
      if (child.nodeName === '#text' && last?.nodeName === '#text') {
        merged[merged.length - 1] = { nodeName: '#text', value: `${last.value}${child.value}` };
      } else {
        merged.push(child);
      }
    }
    return merged.filter((c) => c.nodeName !== '#text' || /\S/.test(c.value ?? ''));
  }

  function walk(node: Node, depth: number) {
    const pad = '  '.repeat(depth);
    if (node.nodeName === '#text') {
      lines.push(`${pad}${escapeText((node.value ?? '').replace(/\s+/g, ' '))}`);
      return;
    }
    const tag = node.tagName ?? node.nodeName;
    lines.push(`${pad}<${tag}${attributes(node)}>`);
    if (VOID.has(tag)) return;
    for (const child of children(node)) walk(child, depth + 1);
    lines.push(`${pad}</${tag}>`);
  }

  for (const child of children(parseFragment(html) as unknown as Node)) walk(child, 0);
  return lines.join('\n');
}

/** A line diff of two normalized strings, for a failure message. */
export function diffLines(expected: string, actual: string): string {
  const a = expected.split('\n');
  const b = actual.split('\n');
  const lcs: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0),
  );
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const out: string[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      out.push(`  ${a[i]}`);
      i++;
      j++;
    } else if (j < b.length && (i === a.length || lcs[i][j + 1] >= lcs[i + 1][j])) {
      out.push(`+ ${b[j]}`);
      j++;
    } else {
      out.push(`- ${a[i]}`);
      i++;
    }
  }
  return out.join('\n');
}
