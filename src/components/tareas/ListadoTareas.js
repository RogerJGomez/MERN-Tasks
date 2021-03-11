import React, { useContext } from 'react'
import Tarea from './Tarea'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function ListadoTareas() {
  const tareasContext = useContext(TareaContext)
  const proyectosContext = useContext(ProyectoContext)

  const { proyecto, removeProyecto } = proyectosContext
  const { tareasProyecto } = tareasContext

  if (!proyecto) return <h2>Selecciona un proyecto</h2>

  return (
    <>
      <h2>{proyecto.nombre}</h2>
      <ul className='listado-tareas'>
        {tareasProyecto.length === 0 ? (
          <li className='tarea'>
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map(tarea => (
              <CSSTransition key={tarea._id} timeout={200} classNames='tarea'>
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type='button'
        className='btn btn-primario'
        onClick={() => removeProyecto(proyecto._id)}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  )
}
