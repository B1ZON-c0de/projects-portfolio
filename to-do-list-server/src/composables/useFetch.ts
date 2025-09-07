import { ref } from 'vue';
import type { IOptions } from '../types/type';

export function useFetch() {
  const isLoading = ref(false);
  const error = ref('');

  async function fetchData(url: string, options: IOptions) {
    isLoading.value = true;
    error.value = '';
    try {
      const response = await fetch(url, {
        ...options,
      });
      if (!response.ok) {
        throw new Error('Не удалось получить задачи');
      }

      return response.json();
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message;
      } else {
        error.value = 'Неизвестная ошибка';
      }
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, error, fetchData };
}
