<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { ref } from 'vue';
interface IProps {
  name: string;
  label: string;
  required: boolean;
}

const { name, label, required } = defineProps<IProps>();

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="form-group form-group--password">
    <label class="form-label" :for="name">{{ label }} *</label>
    <Field
      class="form-control"
      :type="showPassword ? 'text' : 'password'"
      :name="name"
      :id="name"
      :required="required"
    />
    <button
      @click="toggleShowPassword"
      class="btn-icon btn-icon--password"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          d="M12 4.5C6.5 4.5 2 9 2 12s4.5 7.5 10 7.5S22 14.5 22 12s-4.5-7.5-10-7.5zm0 13c-3.1 0-5.5-2.4-5.5-5.5S8.9 7.5 12 7.5s5.5 2.4 5.5 5.5S15.1 17.5 12 17.5z"
        />
        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2z" />
      </svg>
    </button>
    <ErrorMessage :name="name" class="message--error" />
  </div>
</template>
