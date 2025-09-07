<script setup lang="ts">
import FormCheckbox from './components/FormCheckbox.vue';
import FormBaseInput from './components/FormBaseInput.vue';
import FormPassword from './components/FormPassword.vue';
import FormSelect from './components/FormSelect.vue';
import FormTextArea from './components/FormTextArea.vue';
import { initialFormData } from './constants/constants';
import { Form } from 'vee-validate';
import { validateSchema } from './schema/validateSchema';
import type { ICityOptions, IForm } from './types/types';
import { onMounted, ref } from 'vue';
import { fetchData } from './utils/fetchData';
import { addData } from './utils/addData';

const isSuccess = ref(false);
const isLoading = ref(false);
const error = ref('');
const formRef = ref<HTMLFormElement>();
const cities = ref<ICityOptions[]>([]);

const register = async (values: any) => {
  const existingValues = Object.fromEntries(
    Object.entries(values as IForm).filter(([, value]) => value !== '')
  );
  error.value = '';
  isLoading.value = true;
  console.log(existingValues);
  const newUser = { ...existingValues };
  try {
    const oldUsers = await fetchData<IForm>('users');
    const existingUser = oldUsers.find((doc) => doc.email === newUser.email);
    if (existingUser) {
      error.value = 'Пользователь с таким e-mail уже существует';
      isLoading.value = false;
      return;
    } else {
      addData('users', newUser);
      console.log(newUser);
      isSuccess.value = true;
      formRef.value?.resetForm();
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = e?.message;
    } else {
      error.value = 'Неизвестная ошибка';
    }
  } finally {
    isLoading.value = false;
  }
};

const fetchCities = async () => {
  isLoading.value = true;
  error.value = '';
  try {
    cities.value = await fetchData<ICityOptions>('cities');
  } catch (e) {
    if (e instanceof Error) {
      error.value = e?.message;
    } else {
      error.value = 'Неизвестная ошибка';
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCities();
});
</script>

<template>
  <div class="container">
    <h1 class="title">Регистрация</h1>
    <div v-if="isLoading" class="overlay">Идет загрузка данныx</div>
    <Form
      @submit="register"
      ref="formRef"
      class="registration-form"
      :validation-schema="validateSchema"
      :initial-values="initialFormData"
    >
      <FormBaseInput
        label="Имя"
        name="firstName"
        type="text"
        :required="true"
      />
      <FormBaseInput
        label="Фамилия"
        name="lastName"
        type="text"
        :required="true"
      />

      <FormBaseInput
        label="Страна/Регион"
        name="country"
        type="text"
        :required="true"
      />
      <FormSelect
        :cityOptions="cities"
        label="Город"
        name="city"
        :required="true"
      />
      <FormBaseInput label="Телефон" name="phone" type="tel" :required="true" />
      <FormBaseInput label="Email" name="email" type="email" :required="true" />
      <FormPassword name="password" label="Пароль" :required="true" />
      <FormPassword
        name="confirmPassword"
        label="Подтвердите пароль"
        :required="true"
      />
      <FormCheckbox
        label="Я согласен c условиями пользования и политикой конфиденциальности"
        name="terms"
        :required="true"
      />
      <FormTextArea label="Дополнительная информация" name="comments" />
      <button class="btn" type="submit">Зарегистрироваться</button>
      <button class="btn" type="reset">Очистить форму</button>
    </Form>
    <div v-if="error" class="message msg--error">{{ error }}</div>
    <div v-else-if="isSuccess" class="message message--success">
      Регистрация прошла успешно!
    </div>
  </div>
</template>

<style src="./style.css"></style>
