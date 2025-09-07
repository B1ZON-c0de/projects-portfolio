<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
interface IProps {
  label: string;
  name: string;
  required: boolean;
}

const { label, name, required } = defineProps<IProps>();
</script>

<template>
  <div class="form-group form-group--full-width">
    <label class="form-label form-label--checkbox" :for="name">
      <Field
        type="checkbox"
        :id="name"
        :name="name"
        :required="required"
        :value="true"
        :unchecked-value="false"
      />
      {{ label }}
    </label>
    <ErrorMessage :name="name" class="message--error" />
  </div>
</template>
