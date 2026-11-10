<script setup lang="ts">
/**
 * A label, a control of the caller's own and the message under it, wired
 * together. The default slot receives what the control must carry, so the
 * label's `for` reaches it and the message is read with it.
 */
import { computed, useId } from 'vue';
import FieldLabel from '../internal/FieldLabel.vue';
import FieldMessage from '../internal/FieldMessage.vue';
import { FIELD_WRAP, describedBy } from '../internal/field';
import type { FieldWiring } from '../types';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  /** Overrides the generated id, for a control the caller has to address by name. */
  id?: string;
  label?: string;
  /** Kept for a screen reader and not drawn. */
  labelHidden?: boolean;
  /**
   * The control is a group. A label's `for` reaches one form control and
   * never a group, so the caption is drawn as text with an id instead, handed
   * over as `labeledBy`.
   */
  group?: boolean;
  hint?: string;
  /** Replaces the hint while it is set, and marks the wiring invalid. */
  error?: string;
  /** Draws the marker beside the label. Set `required` on the control as well. */
  required?: boolean;
}>();

defineSlots<{ default(wiring: FieldWiring): unknown }>();

// useId and not a random string, so the server render and hydration agree
// and the label's `for` keeps pointing at the control.
const uid = useId();
const fieldId = computed(() => props.id ?? uid);

const wiring = computed<FieldWiring>(() => ({
  id: fieldId.value,
  describedBy: describedBy(fieldId.value, props.error, props.hint),
  invalid: !!props.error,
  labeledBy: props.group && props.label ? `${fieldId.value}-label` : undefined,
}));
</script>

<template>
  <div data-field="" :class="[FIELD_WRAP, $attrs.class]">
    <template v-if="label">
      <FieldLabel
        v-if="group"
        :id="`${fieldId}-label`"
        :text="label"
        :required="required"
        :hidden="labelHidden"
      />
      <FieldLabel v-else :for="fieldId" :text="label" :required="required" :hidden="labelHidden" />
    </template>

    <slot v-bind="wiring" />

    <FieldMessage :base="fieldId" :error="error" :hint="hint" />
  </div>
</template>
