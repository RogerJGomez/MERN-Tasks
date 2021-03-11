import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

export default function Login(props) {
  const alertaContext = useContext(AlertaContext)
  const { alerta, showAlerta } = alertaContext

  const authContext = useContext(AuthContext)
  const { mensaje, autenticado, iniciarSesion } = authContext

  //Em caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos')
    }

    if (mensaje) {
      showAlerta(mensaje.msg, mensaje.categoria)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history])

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  })

  const { email, password } = usuario

  const onChange = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = e => {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      showAlerta('Todos los campos son obligatorios', 'alerta-error')
    }

    iniciarSesion({ email, password })
  }

  return (
    <div className='form-usuario'>
      <div className='contenedor-form sombra-dark'>
        <h1>Iniciar Sesion</h1>
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Login'
            />
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
          Obtener cuenta
        </Link>
      </div>
    </div>
  )
}
