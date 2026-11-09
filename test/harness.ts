/**
 * Renders one corpus case through the kit's Svelte original and through the
 * Vue port, each on the server, each with the same id prefix.
 */
import { ChevronDown as SvelteChevron } from '@lucide/svelte';
import * as Kit from '@lyeve-labs/ui-kit';
import { createRawSnippet, type Component as SvelteComponent } from 'svelte';
import { render } from 'svelte/server';
import { createSSRApp, h, type Component, type Slots } from 'vue';
import { renderToString } from 'vue/server-renderer';
import * as Port from '../src/index';
import ChevronDown from '../src/internal/ChevronDown.vue';
import type { FieldWiring } from '../src/types';
import type { ComponentName, ParityCase } from './corpus';
import Nest from './fixtures/Nest.svelte';
import { ID_PREFIX } from './normalize';

type Props = Record<string, unknown>;

const svelteText = (text: string) =>
  createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));

function wiredInput(w: FieldWiring) {
  const describedBy = w.describedBy === undefined ? '' : ` aria-describedby="${w.describedBy}"`;
  return `<input id="${w.id}"${describedBy}>`;
}

const svelteWired = createRawSnippet((wiring: () => FieldWiring) => ({
  render: () => wiredInput(wiring()),
}));

function svelteComponent(name: ComponentName): SvelteComponent<Props> {
  return (Kit as unknown as Record<string, SvelteComponent<Props>>)[name];
}

export function renderSvelte(c: ParityCase): string {
  const props: Props = { ...c.props };
  if (c.children !== undefined) props.children = svelteText(c.children);
  for (const [name, text] of Object.entries(c.slots ?? {})) props[name] = svelteText(text);
  if (c.wired) props.children = svelteWired;
  if (c.icon) props.icon = SvelteChevron;
  if (c.items) {
    return render(Nest, {
      props: {
        outer: svelteComponent(c.component),
        outerProps: props,
        items: c.items.map((item) => ({ ...item, component: svelteComponent(item.component) })),
      },
      idPrefix: ID_PREFIX,
    }).body;
  }
  return render(svelteComponent(c.component), { props, idPrefix: ID_PREFIX }).body;
}

function vueComponent(name: ComponentName): Component {
  return (Port as unknown as Record<string, Component>)[name];
}

/** Svelte spells a listener prop `onclick`, and Vue spells it `onClick`. */
function vueProps(props: Props | undefined): Props {
  const out: Props = {};
  for (const [key, value] of Object.entries(props ?? {})) {
    out[/^on[a-z]/.test(key) ? `on${key[2].toUpperCase()}${key.slice(3)}` : key] = value;
  }
  return out;
}

export async function renderVue(c: ParityCase): Promise<string> {
  const props = vueProps(c.props);
  const slots: Record<string, (...args: never[]) => unknown> = {};
  if (c.children !== undefined) {
    const text = c.children;
    slots.default = () => h('span', text);
  }
  for (const [name, text] of Object.entries(c.slots ?? {})) slots[name] = () => h('span', text);
  if (c.wired) {
    slots.default = (w: FieldWiring) => h('input', { id: w.id, 'aria-describedby': w.describedBy });
  }
  if (c.icon) props.icon = ChevronDown;
  if (c.items) {
    const items = c.items;
    slots.default = () =>
      items.map((item) =>
        h(
          vueComponent(item.component),
          vueProps(item.props),
          item.children === undefined ? undefined : { default: () => h('span', item.children) },
        ),
      );
  }
  const app = createSSRApp({ render: () => h(vueComponent(c.component), props, slots as Slots) });
  app.config.idPrefix = ID_PREFIX;
  return renderToString(app);
}
