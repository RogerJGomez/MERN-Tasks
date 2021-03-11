import React, { useReducer } from 'react'
import TareaReducer from './tareaReducer'
import TareaContext from './TareaContext'
import clienteAxios from '../../config/axios'
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA
} from '../../types'

export default function TareaState(props) {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaActual: null
  }
  const [state, dispatch] = useReducer(TareaReducer, initialState)

  const getTareas = async proyecto => {
    try {
      const respuesta = await clienteAxios.get('/api/tareas/', {
        params: { proyecto }
      })
      dispatch({
        type: TAREAS_PROYECTO,
        payload: respuesta.data.tareas
      })
    } catch (error) {
      console.log(error)
    }
  }

  const addTareas = async tarea => {
    try {
      const resultado = clienteAxios.post('/api/tareas/', tarea)
      console.log(resultado)
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      })
    } catch (error) {
      console.log(error)
    }
  }

  const showErrorTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  const removeTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      )
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tareaActual
      })
    } catch (error) {
      console.log(error)
    }
  }

  const saveTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  return (
    <TareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaActual: state.tareaActual,
        getTareas,
        addTareas,
        showErrorTarea,
        removeTarea,
        saveTareaActual,
        updateTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  )
}
