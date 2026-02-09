import React, { useState } from 'react'
import { RegistrationFormPlain } from './RegistrationFormPlain.jsx'
import { RegistrationFormRHF } from './RegistrationFormRHF.jsx'

export function App() {
  const [variant, setVariant] = useState('plain')

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__badge">Vite + React</div>
        <h1 className="hero__title">Регистрация нового пользователя</h1>
        <p className="hero__subtitle">
          Два варианта реализации: чистый React и React Hook Form + Yup.
        </p>
        <div className="segmented">
          <button
            className={`segmented__button ${variant === 'plain' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setVariant('plain')}
          >
            Plain React
          </button>
          <button
            className={`segmented__button ${variant === 'rhf' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setVariant('rhf')}
          >
            React Hook Form + Yup
          </button>
        </div>
      </header>

      <main className="content">
        {variant === 'plain' ? <RegistrationFormPlain /> : <RegistrationFormRHF />}
      </main>
    </div>
  )
}
