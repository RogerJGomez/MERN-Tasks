import React, { useContext } from 'react'
import TareaContext from '../../context/tareas/TareaContext'
import ProyectoContext from '../../context/proyectos/ProyectoContext'

export default function Tarea({ tarea }) {
  const proyectosContext = useContext(ProyectoContext)
  const { proyecto } = proyectosContext

  const tareasContext = useContext(TareaContext)
  const { removeTarea, updateTarea, getTareas, saveTareaActual } = tareasContext

  function handleRemove(id) {
    removeTarea(id, proyecto._id)
    getTareas(proyecto._id)
  }

  function handleComplete(tarea) {
    tarea.estado = !tarea.estado
    updateTarea(tarea)
  }

  return (
    <li className='tarea sombra'>
      <p>{tarea.nombre}</p>
      <div className='estado'>
        {tarea.estado ? (
          <button
            type='button'
            className='completo'
            onClick={() => handleComplete(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type='button'
            className='incompleto'
            onClick={() => handleComplete(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className='acciones'>
        <button
          type='button'
          className='btn btn-primario'
          onClick={() => saveTareaActual(tarea)}
        >
          Editar
        </button>
        <button
          type='button'
          className='btn btn-secundario'
          onClick={() => handleRemove(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}
