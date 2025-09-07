<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
interface IProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel';
  required: boolean;
}

const { name, type, label } = defineProps<IProps>();
</script>

<template>
  <div class="form-group">
    <label class="form-label" :for="name">{{ label }} *</label>
    <Field
      class="form-control"
      :name="name"
      :type="type"
      :id="name"
      :required="required"
    />
    <ErrorMessage :name="name" class="message--error" />
  </div>
</template>
