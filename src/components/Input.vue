<script setup lang="ts">
/**
 * A single-line text field with its label and message. `class` lands on the
 * wrapper, and every other attribute the component does not name lands on
 * the input.
 */
import { computed, useAttrs, useId } from 'vue';
import FieldLabel from '../internal/FieldLabel.vue';
import FieldMessage from '../internal/FieldMessage.vue';
import {
  CONTROL_BASE,
  FIELD_WRAP,
  controlBorder,
  describedBy,
  joinIds,
} from '../internal/field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    type?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    /**
     * Ids of other elements that describe the input, separated by spaces, such
     * as the message a wrapping Field renders. They are read after the input's
     * own hint or error.
     */
    describedBy?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    /** Monospace for the control alone: a slug, a key, a locale tag. */
    mono?: boolean;
    /** Marks the control `data-no-ai` for a browser agent. */
    noAI?: boolean;
  }>(),
  { type: 'text', placeholder: '' },
);

const value = defineModel<string>('value', { default: '' });

const attrs = useAttrs();

const uid = useId();
const fieldId = computed(() => props.id ?? uid);

const rest = computed(() => {
  const { class: _class, ...others } = attrs;
  return others;
});

function onInput(e: Event) {
  value.value = (e.target as HTMLInputElement).value;
}
</script>

<template>
  <div data-field="" :data-no-ai="noAI ? '' : undefined" :class="[FIELD_WRAP, $attrs.class]">
    <FieldLabel v-if="label" :for="fieldId" :text="label" :required="required" />

    <input
      :id="fieldId"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :value="value"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="joinIds(describedBy(fieldId, error, hint), props.describedBy)"
      :class="[CONTROL_BASE, controlBorder(!!error), mono ? 'font-mono' : '']"
      @input="onInput"
      v-bind="rest"
    />

    <FieldMessage :base="fieldId" :error="error" :hint="hint" />
  </div>
</template>
