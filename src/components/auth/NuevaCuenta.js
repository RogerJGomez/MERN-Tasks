import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

export default function NuevaCuenta(props) {
  const alertaContext = useContext(AlertaContext)
  const { alerta, showAlerta } = alertaContext

  const authContext = useContext(AuthContext)
  const { mensaje, autenticado, registrarUsuario } = authContext

  //En caso de que el usuario se haya registrado o sea un registro duplicado
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
    password: '',
    confirmedPwd: '',
    nombre: ''
  })

  const { nombre, email, password, confirmedPwd } = usuario

  const onChange = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = e => {
    e.preventDefault()

    if (
      nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmedPwd.trim() === ''
    ) {
      showAlerta('Todos los campos son obligatorios', 'alerta-error')
      return
    }
    if (password.length < 6) {
      showAlerta('La contraseña debe ser de al menos 6 caracteres', 'error')
      return
    }
    if (password !== confirmedPwd) {
      showAlerta('Las contraseñas no coinciden', 'alerta-error')
      return
    }
    registrarUsuario({ nombre, email, password })
  }

  return (
    <div className='form-usuario'>
      <div className='contenedor-form sombra-dark'>
        <h1>Registrarse</h1>
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className='campo-form'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              name='nombre'
              id='nombre'
              placeholder='Nombre'
              value={nombre}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor='password'>Confirmar Password</label>
            <input
              type='password'
              name='confirmedPwd'
              id='confirmar'
              placeholder='Repetir password'
              value={confirmedPwd}
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Registrarme'
            />
          </div>
        </form>
        <Link to={'/'} className='enlace-cuenta'>
          Iniciar Sesion
        </Link>
      </div>
    </div>
  )
}
