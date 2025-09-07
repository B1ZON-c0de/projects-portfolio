import * as yup from 'yup';

const regExpPhone =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g;

export const validateSchema = yup.object({
  firstName: yup.string().required('Введите имя'),
  lastName: yup.string().required('Введите Фамилию'),
  country: yup.string().required('Введите страну'),
  city: yup
    .string()
    .oneOf(['msc', 'ovb', 'spb', 'other', 'svx'], 'Выбирите город из списка')
    .required('Выбирите город из списка'),
  phone: yup
    .string()
    .min(10, 'Минимальная длина номера телефона 10 цифр')
    .max(15, 'Максимальная длина номера телефона 15 цифр')
    .matches(regExpPhone, 'Введите правильный номер телефона')
    .required('Введите номер телефона'),
  email: yup
    .string()
    .email('Введите правильный email')
    .required('Введите email'),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 симфволов')
    .required('Придумайте пароль'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Введите еще раз пароль'),

  comments: yup.string(),
  terms: yup
    .bool()
    .oneOf([true], 'Вы должны принять условия')
    .required('Подтвердите что вы соглашаетесь с условиями'),
});
