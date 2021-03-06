import React, { useReducer } from 'react'
import authReducer from './authReducer'
import authContext from './authContext'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types'

const AuthState = props => {
  const initial_state = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  }
  const [state, dispatch] = useReducer(authReducer, initial_state)

  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/users/', datos)
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      })
      //Obtener usuario
      usuarioAutenticado()
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  //Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      tokenAuth(token)
    }
    try {
      const respuesta = await clienteAxios.get('/api/auth')
      // console.log(respuesta)
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos)
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      })

      //Obtener usuario
      usuarioAutenticado()
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      })
    }
  }

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </authContext.Provider>
  )
}

export default AuthState
