import React, { useRef } from 'react'
import { publicApiInstance } from '../../http-common'
import { useAuth } from '../../providers/AuthProvider'

export default function Signin() {
  const form = useRef()
  const { login } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(form)

    publicApiInstance.post('/auth/login', {
      email: form.current[0].value,
      password: form.current[1].value
    })
    .then((response) => {
      login(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <div>
      <form ref={form} onSubmit={handleSubmit}>
          <input placeholder='login' name='login' required />
          <input placeholder='password' name='password' type='password' required />
          <input type='submit'/>
      </form>
    </div>
  )
}
