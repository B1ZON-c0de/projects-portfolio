<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import type { ICityOptions } from '../types/types';

interface IProps {
  cityOptions: ICityOptions[];
  label: string;
  name: string;
  required: boolean;
}

const { cityOptions, name, required, label } = defineProps<IProps>();
</script>

<template>
  <div class="form-group">
    <label class="form-label" :for="name">{{ label }} *</label>
    <div class="custom-select">
      <Field
        class="form-control"
        :id="name"
        :name="name"
        as="select"
        :required="required"
      >
        <option value="" disabled selected>Выберите {{ label }}</option>
        <option
          v-for="city in cityOptions"
          :value="city.value"
          :key="city.value"
        >
          {{ city.text }}
        </option>
      </Field>
      <ErrorMessage :name="name" class="message--error" />
    </div>
  </div>
</template>
