<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
interface IProps {
  label: string;
  name: string;
}

const { label, name } = defineProps<IProps>();
</script>

<template>
  <div class="form-group form-group--full-width">
    <label class="form-label" :for="name">{{ label }}</label>
    <Field class="form-control" :id="name" :name="name" as="textarea" />
    <ErrorMessage :name="name" class="message--error" />
  </div>
</template>
