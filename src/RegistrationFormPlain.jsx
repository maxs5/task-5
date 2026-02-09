import React, { useEffect, useRef, useState } from 'react'

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
}

export function RegistrationFormPlain() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isValid, setIsValid] = useState(false)
  const submitButtonRef = useRef(null)

  const validate = (fieldValues) => {
    const newErrors = {}

    if (!fieldValues.email) {
      newErrors.email = 'Введите email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)) {
      newErrors.email = 'Некорректный email'
    }

    if (!fieldValues.password) {
      newErrors.password = 'Введите пароль'
    } else if (fieldValues.password.length < 6) {
      newErrors.password = 'Минимум 6 символов'
    }

    if (!fieldValues.confirmPassword) {
      newErrors.confirmPassword = 'Повторите пароль'
    } else if (fieldValues.confirmPassword !== fieldValues.password) {
      newErrors.confirmPassword = 'Пароли не совпадают'
    }

    return newErrors
  }

  useEffect(() => {
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setIsValid(Object.keys(nextErrors).length === 0)
  }, [values])

  useEffect(() => {
    if (isValid && submitButtonRef.current) {
      submitButtonRef.current.focus()
    }
  }, [isValid])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const nextIsValid = Object.keys(nextErrors).length === 0
    setIsValid(nextIsValid)

    if (!nextIsValid) return

    // eslint-disable-next-line no-console
    console.log('Форма отправлена (plain):', values)
  }

  const getError = (field) => {
    if (!touched[field]) return ''
    return errors[field] ?? ''
  }

  return (
    <section className="card">
      <h2 className="card__title">Регистрация (Plain React)</h2>
      <p className="card__subtitle">
        Валидация и состояние формы реализованы вручную.
      </p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span className="field__label">Email</span>
          <input
            className={`field__input ${getError('email') ? 'is-error' : ''}`}
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
          />
          {getError('email') && <span className="field__error">{getError('email')}</span>}
        </label>

        <label className="field">
          <span className="field__label">Пароль</span>
          <input
            className={`field__input ${getError('password') ? 'is-error' : ''}`}
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Минимум 6 символов"
          />
          {getError('password') && (
            <span className="field__error">{getError('password')}</span>
          )}
        </label>

        <label className="field">
          <span className="field__label">Повтор пароля</span>
          <input
            className={`field__input ${getError('confirmPassword') ? 'is-error' : ''}`}
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Повторите пароль"
          />
          {getError('confirmPassword') && (
            <span className="field__error">{getError('confirmPassword')}</span>
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
