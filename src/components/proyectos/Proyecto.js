import React, { useContext } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'

export default function Proyecto({ proyecto }) {
  const tareasContext = useContext(TareaContext)
  const { getTareas } = tareasContext

  const proyectosContext = useContext(ProyectoContext)
  const { proyectoActual } = proyectosContext

  function selectProyecto(id) {
    proyectoActual(id) //fijar proyecto actual
    getTareas(id) //fijar tareas asociadas al proyecto actual
  }

  return (
    <li>
      <button
        type='button'
        className='btn btn-blank'
        onClick={() => selectProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  )
}
