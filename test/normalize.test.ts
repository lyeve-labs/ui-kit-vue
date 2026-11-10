// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { diffLines, normalize } from './normalize';

describe('normalize', () => {
  it('drops comments and whitespace-only text', () => {
    expect(normalize('<!--[--><div> <!---->\n <p>a</p> </div><!--]-->')).toBe(
      normalize('<div><p>a</p></div>'),
    );
  });

  it('collapses whitespace runs in text and keeps an edge space', () => {
    expect(normalize('<p>a \n  b</p>')).toBe(normalize('<p>a b</p>'));
    expect(normalize('<p><img> Acme</p>')).not.toBe(normalize('<p><img>Acme</p>'));
  });

  it('joins text that a comment split', () => {
    expect(normalize('<p>Ac<!---->me</p>')).toBe(normalize('<p>Acme</p>'));
  });

  it('sorts attributes', () => {
    expect(normalize('<a href="/x" class="c" id="k"></a>')).toBe(
      normalize('<a id="k" class="c" href="/x"></a>'),
    );
  });

  it('compares class as a token set and drops an empty one', () => {
    expect(normalize('<div class="b  a b "></div>')).toBe(normalize('<div class="a b"></div>'));
    expect(normalize('<div class=" "></div>')).toBe(normalize('<div></div>'));
    expect(normalize('<div class="a"></div>')).not.toBe(normalize('<div class="a b"></div>'));
  });

  it('writes boolean attributes as empty', () => {
    expect(normalize('<input disabled required="">')).toBe(
      normalize('<input disabled="disabled" required>'),
    );
    expect(normalize('<input indeterminate="true">')).toBe(normalize('<input indeterminate="">'));
  });

  it('normalizes style declarations', () => {
    expect(normalize('<div style="COLOR:red;  margin : 0 ;"></div>')).toBe(
      normalize('<div style="color: red; margin: 0"></div>'),
    );
  });

  it('canonicalizes generated ids by first appearance, in every attribute that refers to one', () => {
    const svelte =
      '<label for="gen-s1">A</label><input id="gen-s1" aria-describedby="gen-s1-hint"><p id="gen-s1-hint"></p><details name="accordion-gen-s2"></details>';
    const vue =
      '<label for="gen-0">A</label><input aria-describedby="gen-0-hint" id="gen-0"><p id="gen-0-hint"></p><details name="accordion-gen-1"></details>';
    expect(normalize(vue)).toBe(normalize(svelte));
    expect(normalize(svelte)).toContain('for="id1"');
    expect(normalize(svelte)).toContain('name="accordion-id2"');
  });

  it('keeps an id the caller gave and a generated id apart', () => {
    expect(normalize('<input id="email">')).not.toBe(normalize('<input id="gen-0">'));
  });

  it('keeps a wrongly paired reference', () => {
    expect(normalize('<label for="gen-0"></label><input id="gen-1">')).not.toBe(
      normalize('<label for="gen-s1"></label><input id="gen-s1">'),
    );
  });

  it('keeps differences in tags, text and attribute values', () => {
    expect(normalize('<h2>a</h2>')).not.toBe(normalize('<h3>a</h3>'));
    expect(normalize('<p>a</p>')).not.toBe(normalize('<p>b</p>'));
    expect(normalize('<a href="/a"></a>')).not.toBe(normalize('<a href="/b"></a>'));
    expect(normalize('<a role="list"></a>')).not.toBe(normalize('<a></a>'));
  });
});

describe('diffLines', () => {
  it('marks removed and added lines', () => {
    expect(diffLines('a\nb\nc', 'a\nx\nc')).toBe('  a\n+ x\n- b\n  c');
  });
});
