<script lang="ts">
  /**
   * Renders a kit component around other kit components, which a raw snippet
   * cannot do: an Accordion's items read the name it sets in their context.
   */
  import type { Component } from 'svelte';

  interface Item {
    component: Component<Record<string, unknown>>;
    props: Record<string, unknown>;
    children?: string;
  }

  let {
    outer,
    outerProps,
    items,
  }: {
    outer: Component<Record<string, unknown>>;
    outerProps: Record<string, unknown>;
    items: Item[];
  } = $props();

  const Outer = $derived(outer);
</script>

<Outer {...outerProps}>
  {#each items as item, i (i)}
    {@const Inner = item.component}
    <Inner {...item.props}>
      {#if item.children !== undefined}<span>{item.children}</span>{/if}
    </Inner>
  {/each}
</Outer>
