import { computed, reactive, ref } from 'vue';
import { useFetch } from './useFetch';
import { URL_DB } from '../constants/constants';
import type { Todo } from '../types/type';

export function useTodos() {
  const { isLoading, error, fetchData } = useFetch();

  const todos = reactive<Todo[]>([]);
  const newTodoText = ref('');

  const fetchTodos = async () => {
    const data = await fetchData(URL_DB, { method: 'GET' });
    todos.splice(0, todos.length, ...data);
  };

  const checkTodo = (id: string) => {
    const completedPost = {
      completed: true,
    };
    fetchData(`${URL_DB}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(completedPost),
    }).then(() => {
      fetchTodos();
    });
  };

  const removeTodo = (id: string) => {
    fetchData(`${URL_DB}/${id}`, {
      method: 'DELETE',
    }).then(() => {
      fetchTodos();
    });
  };

  const unCompletedTodosCount = computed(() => {
    return [...todos].filter((todo) => !todo.completed).length;
  });

  const clearAllTodos = async () => {
    await Promise.all(todos.map((el) => removeTodo(el.id))).then(() => {
      fetchTodos();
    });
  };

  const clearCompletedTodos = async () => {
    await Promise.all(
      todos.map((el) => el.completed && removeTodo(el.id))
    ).then(() => {
      fetchTodos();
    });
  };

  const addTodo = () => {
    const newTodo = {
      id: Date.now().toString(),
      text: newTodoText.value,
      completed: false,
    };
    fetchData(URL_DB, {
      method: 'POST',
      body: JSON.stringify(newTodo),
    }).then(() => {
      fetchTodos();
    });
  };

  return {
    fetchTodos,
    checkTodo,
    unCompletedTodosCount,
    clearAllTodos,
    clearCompletedTodos,
    addTodo,
    removeTodo,
    isLoading,
    error,
    todos,
    newTodoText,
  };
}
