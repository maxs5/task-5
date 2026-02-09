import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required('Введите email').email('Некорректный email'),
  password: yup.string().required('Введите пароль').min(6, 'Минимум 6 символов'),
  confirmPassword: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
})

export function RegistrationFormRHF() {
  const submitButtonRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (isValid && submitButtonRef.current) {
      submitButtonRef.current.focus()
    }
  }, [isValid])

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log('Форма отправлена (RHF + Yup):', data)
  }

  return (
    <section className="card">
      <h2 className="card__title">Регистрация (React Hook Form + Yup)</h2>
      <p className="card__subtitle">
        Валидация и состояние формы через библиотеку.
      </p>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span className="field__label">Email</span>
          <input
            className={`field__input ${errors.email ? 'is-error' : ''}`}
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="field__error">{errors.email.message}</span>
          )}
        </label>

        <label className="field">
          <span className="field__label">Пароль</span>
          <input
            className={`field__input ${errors.password ? 'is-error' : ''}`}
            type="password"
            placeholder="Минимум 6 символов"
            {...register('password')}
          />
          {errors.password && (
            <span className="field__error">{errors.password.message}</span>
          )}
        </label>

        <label className="field">
          <span className="field__label">Повтор пароля</span>
          <input
            className={`field__input ${errors.confirmPassword ? 'is-error' : ''}`}
            type="password"
            placeholder="Повторите пароль"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className="field__error">{errors.confirmPassword.message}</span>
          )}
        </label>

        <button
          className="button"
          type="submit"
          ref={submitButtonRef}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </section>
  )
}
