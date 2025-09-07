<script setup lang="ts">
import { ref } from 'vue';

const newTodoText = defineModel();
const emit = defineEmits(['add-todo']);

const error = ref('');

const handleSubmit = () => {
  if (!newTodoText.value) {
    error.value = 'Название задачи не должно быть пустым';
    return;
  }
  emit('add-todo');
  newTodoText.value = '';
  error.value = '';
};

defineExpose({ newTodoText });
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__group form__group--todo">
      <input
        class="form-control"
        type="text"
        placeholder="Новая задача"
        v-model.trima="newTodoText"
      />
      <button class="btn btn--add-todo" type="submit">Добавить</button>
    </div>
    <span v-if="error" class="error-msg">{{ error }}</span>
  </form>
</template>
