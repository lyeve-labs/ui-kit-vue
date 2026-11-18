<script setup lang="ts">
/**
 * A checkbox with its label, description and message. The native input is
 * transparent and covers the painted box, so a click on what the reader sees
 * lands on it. The label names the input through `aria-labelledby`, so the
 * description stays a description.
 */
import { computed, useId, type Component, type InputHTMLAttributes } from 'vue';
import CheckboxBody from '../internal/CheckboxBody.vue';
import CheckboxMark from '../internal/CheckboxMark.vue';
import FieldMessage from '../internal/FieldMessage.vue';
import {
  CHOICE_FOCUS,
  CHOICE_INPUT,
  choiceWrap,
  type ChoiceSize,
  type ChoiceVariant,
} from '../internal/choice';
import { FIELD_WRAP } from '../internal/field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    /** Kept for a screen reader and not drawn, for a checkbox in a table cell. */
    labelHidden?: boolean;
    /** Secondary line under the label. */
    description?: string;
    hint?: string;
    error?: string;
    /** Drawn before the label. */
    icon?: Component;
    size?: ChoiceSize;
    /** 'card' draws a bordered option whose whole surface is the target. */
    variant?: ChoiceVariant;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    /** Marks the control `data-no-ai` for a browser agent. */
    noAI?: boolean;
  }>(),
  { size: 'md', variant: 'inline' },
);

const emit = defineEmits<{ change: [checked: boolean] }>();

const checked = defineModel<boolean>('checked', { default: false });
/** Partly checked. Announced as aria-checked="mixed". */
const indeterminate = defineModel<boolean>('indeterminate', { default: false });

const uid = useId();
const fieldId = computed(() => props.id ?? uid);

// Error, then hint, then description. A screen reader announces one message,
// so the most urgent one has to win.
const messageId = computed(() =>
  props.error
    ? `${fieldId.value}-error`
    : props.hint
      ? `${fieldId.value}-hint`
      : props.description
        ? `${fieldId.value}-description`
        : undefined,
);

const on = computed(() => checked.value || indeterminate.value);

// A card fills its column. An inline option must not, or the label swallows
// the empty space beside it and a stray click far from the box toggles it.
const rootClass = computed(() =>
  props.variant === 'card' ? FIELD_WRAP : `${FIELD_WRAP} items-start`,
);

const control = computed<InputHTMLAttributes & { indeterminate?: true }>(() => ({
  type: 'checkbox',
  id: fieldId.value,
  name: props.name,
  value: props.value,
  required: props.required,
  disabled: props.disabled,
  checked: checked.value,
  indeterminate: indeterminate.value || undefined,
  'aria-checked': indeterminate.value ? ('mixed' as const) : undefined,
  'aria-invalid': props.error ? ('true' as const) : undefined,
  'aria-labelledby': props.label ? `${fieldId.value}-label` : undefined,
  'aria-describedby': messageId.value,
  class: CHOICE_INPUT,
}));

const body = computed(() => ({
  fieldId: fieldId.value,
  size: props.size,
  label: props.label,
  labelHidden: props.labelHidden,
  description: props.description,
  icon: props.icon,
  required: props.required,
}));

function handleChange(e: Event) {
  const input = e.currentTarget as HTMLInputElement;
  // The native attribute is the only thing that stops a real click, so a
  // change arriving any other way puts the input and the value back.
  if (props.disabled) {
    input.checked = !input.checked;
    checked.value = input.checked;
    return;
  }
  // The browser clears indeterminate on the first click, so the prop follows.
  indeterminate.value = false;
  checked.value = input.checked;
  emit('change', checked.value);
}
</script>

<template>
  <div data-field="" :data-no-ai="noAI ? '' : undefined" :class="[rootClass, $attrs.class]">
    <!-- The input covers the whole card, so the card surface is the element
         the focus ring reaches, and one control gets one indicator. -->
    <label v-if="variant === 'card'" class="relative block">
      <input v-bind="control" @change="handleChange" />
      <span :class="[choiceWrap('card', on, disabled), CHOICE_FOCUS]">
        <CheckboxMark :size="size" :checked="checked" :indeterminate="indeterminate" />
        <CheckboxBody v-bind="body" />
      </span>
    </label>
    <label v-else :class="choiceWrap('inline', on, disabled)">
      <span class="relative flex shrink-0 items-center justify-center">
        <input v-bind="control" @change="handleChange" />
        <CheckboxMark :size="size" :checked="checked" :indeterminate="indeterminate" />
      </span>
      <CheckboxBody v-bind="body" />
    </label>

    <FieldMessage :base="fieldId" :error="error" :hint="hint" />
  </div>
</template>
