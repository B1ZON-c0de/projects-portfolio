<script setup lang="ts">
import TodoListItem from './components/TodoListItem.vue';
import TodoForm from './components/TodoForm.vue';
import { useTodos } from './composables/useTodos';
import { onMounted } from 'vue';

const {
  fetchTodos,
  checkTodo,
  unCompletedTodosCount,
  clearAllTodos,
  clearCompletedTodos,
  addTodo,
  isLoading,
  error,
  newTodoText,
  todos,
  removeTodo,
} = useTodos();

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="container todo-app">
    <h1 class="title">Todo List</h1>

    <TodoForm v-model="newTodoText" @add-todo="addTodo" />

    <div class="todo-app__main">
      <span v-if="isLoading">Получение задач</span>
      <ul v-else-if="todos.length > 0" class="todo-list">
        <li
          v-for="(todo, idx) in todos"
          class="todo-list__item"
          :class="{ 'todo-list__item--completed': todo.completed }"
          :key="todo.id"
        >
          <TodoListItem
            :="todo"
            :id="idx"
            @complete-todo.once="checkTodo(todo.id)"
            @remove-todo="removeTodo(todo.id)"
          />
        </li>
      </ul>
      <span v-else-if="error" class="error-msg">{{ error }}</span>
      <div v-else class="todo-list__empty">
        <p>Список задач пуст</p>
      </div>
    </div>

    <div v-if="todos.length > 0" class="todo-app__footer">
      <p class="todo-app__footer-text">
        Осталось {{ unCompletedTodosCount }} задания(й)
      </p>
      <button class="btn btn--clear" @click="clearCompletedTodos">
        Удалить завершенные
      </button>
      <button class="btn btn--clear" @click="clearAllTodos">
        Очистить список
      </button>
    </div>
  </div>
</template>

<style src="./style.css"></style>
