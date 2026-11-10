<script setup lang="ts">
/**
 * A button, or a link drawn as one when it has an `href`. Attributes the
 * component does not name land on whichever element renders.
 */
import { computed, useAttrs } from 'vue';
import Spinner from '../internal/Spinner.vue';
import { safeHref } from '../internal/href';
import { TOUCH_GROW } from '../internal/touch';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'violet';
type Size = 'sm' | 'md' | 'lg' | 'icon';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    full?: boolean;
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
);

const attrs = useAttrs();

/** A filled button draws an outline in forced colors, where its fill is replaced by the canvas. */
const FILLED_EDGE =
  'forced-colors:outline-solid forced-colors:outline-1 forced-colors:-outline-offset-1 ' +
  'forced-colors:outline-[color:ButtonText] forced-colors:disabled:outline-[color:GrayText]';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand bg-lift bg-origin-border text-ink border border-transparent hover:bg-brand-light ' +
    `active:bg-brand-deep inset-shadow-bevel shadow-raised ${FILLED_EDGE}`,
  violet: `bg-violet text-ink hover:brightness-110 active:brightness-90 border border-transparent inset-shadow-bevel shadow-raised ${FILLED_EDGE}`,
  secondary:
    'bg-surface-2 text-fg border border-line-strong hover:bg-line active:bg-line-strong/30 inset-shadow-highlight shadow-raised',
  danger: `bg-danger text-ink hover:brightness-110 active:brightness-90 border border-transparent inset-shadow-bevel shadow-raised ${FILLED_EDGE}`,
  ghost:
    'text-muted border border-transparent hover:bg-surface-2 hover:text-fg active:bg-line active:text-fg',
  outline:
    'border border-line-strong text-fg hover:border-brand hover:text-brand active:bg-brand/10',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-md',
  md: 'px-4 py-2 text-sm gap-2 rounded-lg',
  lg: 'px-5 py-2.5 text-base gap-2 rounded-lg',
  icon: 'p-1.75 rounded-lg',
};

const spinnerSize = computed(() => (props.size === 'lg' ? 16 : 14));

const cls = computed(
  () =>
    `inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors ` +
    `disabled:opacity-50 disabled:cursor-not-allowed select-none ${TOUCH_GROW} ` +
    `${props.full ? 'w-full' : ''} ${variants[props.variant]} ${sizes[props.size]}`,
);

const resolvedHref = computed(() => safeHref(props.href));

// An anchor has no `disabled`, so a disabled or loading link drops its href
// and its click handler, which takes it out of the tab order and stops it.
const inert = computed(() => props.disabled || props.loading);

const rest = computed(() => {
  const { class: _class, ...others } = attrs;
  if (!props.href || !inert.value) return others;
  const { onClick: _onClick, ...linked } = others;
  return linked;
});
</script>

<template>
  <a
    v-if="href"
    :href="inert ? undefined : resolvedHref"
    :class="[cls, inert ? 'pointer-events-none opacity-50' : '', $attrs.class]"
    :aria-disabled="inert ? 'true' : undefined"
    :tabindex="inert ? -1 : undefined"
    v-bind="rest"
  >
    <!-- The space before the label matches the original's output, where a
         label of plain text starts with one. -->
    <Spinner v-if="loading" :size="spinnerSize" /> <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading ? 'true' : undefined"
    :class="[cls, $attrs.class]"
    v-bind="rest"
  >
    <Spinner v-if="loading" :size="spinnerSize" /> <slot />
  </button>
</template>
