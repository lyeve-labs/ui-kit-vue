<script setup lang="ts">
/** A multi-line text field with its label and message. `class` lands on the wrapper. */
import { computed, useId } from 'vue';
import FieldLabel from '../internal/FieldLabel.vue';
import FieldMessage from '../internal/FieldMessage.vue';
import { CONTROL_MULTILINE, FIELD_WRAP, controlBorder, describedBy } from '../internal/field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    maxlength?: number;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    resize?: boolean;
    error?: string;
    hint?: string;
    /** Monospace for the control alone: code, JSON, a key. */
    mono?: boolean;
    /** Marks the control `data-no-ai` for a browser agent. */
    noAI?: boolean;
  }>(),
  { rows: 4, resize: true },
);

const emit = defineEmits<{ input: [e: Event]; blur: [e: FocusEvent] }>();

const value = defineModel<string>('value', { default: '' });

const uid = useId();
const fieldId = computed(() => props.id ?? uid);

function onInput(e: Event) {
  value.value = (e.target as HTMLTextAreaElement).value;
  emit('input', e);
}
</script>

<template>
  <div data-field="" :data-no-ai="noAI ? '' : undefined" :class="[FIELD_WRAP, $attrs.class]">
    <FieldLabel v-if="label" :for="fieldId" :text="label" :required="required" />

    <textarea
      :id="fieldId"
      :name="name"
      :rows="rows"
      :maxlength="maxlength"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy(fieldId, error, hint)"
      :class="[
        CONTROL_MULTILINE,
        controlBorder(!!error),
        resize ? 'resize-y' : 'resize-none',
        mono ? 'font-mono' : '',
      ]"
      :value="value"
      @input="onInput"
      @blur="emit('blur', $event)"
    ></textarea>

    <FieldMessage :base="fieldId" :error="error" :hint="hint" />
  </div>
</template>
