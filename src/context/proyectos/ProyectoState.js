import React, { useReducer } from 'react'
import ProyectoContext from './ProyectoContext'
import proyectoReducer from './proyectoReducer'
import clienteAxios from '../../config/axios'
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORM,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from '../../types'

export default function ProyectoState(props) {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorForm: false,
    proyecto: null,
    mensaje: null
  }

  //Alerta por si ocurre un error
  const alerta = {
    msg: 'Hubo un error',
    categoria: 'alerta-error'
  }

  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  const showFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  //Get proyectos
  const getProyectos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos')
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos
      })
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  //Add proyecto
  const addProyecto = async proyecto => {
    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto)
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      })
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  //Validar formulario
  const showError = () => {
    dispatch({
      type: VALIDAR_FORM
    })
  }

  //Seleccionar un proyecto específico
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  //Seleccionar un proyecto específico
  const removeProyecto = async proyectoId => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorForm: state.errorForm,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        showFormulario,
        getProyectos,
        addProyecto,
        showError,
        proyectoActual,
        removeProyecto
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  )
}
