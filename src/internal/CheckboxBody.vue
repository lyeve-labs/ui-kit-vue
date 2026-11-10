<script setup lang="ts">
/** The icon, label and description beside a checkbox's painted box. */
import type { Component } from 'vue';
import FieldLabel from './FieldLabel.vue';
import {
  CHOICE_DESCRIPTION,
  CHOICE_ICON_PX,
  CHOICE_LABEL_STACK,
  choiceIcon,
  choiceLabel,
  type ChoiceSize,
} from './choice';

defineProps<{
  fieldId: string;
  size: ChoiceSize;
  label?: string;
  labelHidden?: boolean;
  description?: string;
  icon?: Component;
  required?: boolean;
}>();
</script>

<template>
  <span v-if="label || description || icon" :class="CHOICE_LABEL_STACK">
    <span v-if="label || icon" class="flex items-center gap-2">
      <span v-if="icon" :class="choiceIcon(size)"
        ><component :is="icon" :size="CHOICE_ICON_PX[size]"
      /></span>
      <FieldLabel
        v-if="label"
        :id="`${fieldId}-label`"
        :text="label"
        :required="required"
        :label-class="choiceLabel(size)"
        :hidden="labelHidden"
      />
    </span>
    <span v-if="description" :id="`${fieldId}-description`" :class="CHOICE_DESCRIPTION">{{
      description
    }}</span>
  </span>
</template>
