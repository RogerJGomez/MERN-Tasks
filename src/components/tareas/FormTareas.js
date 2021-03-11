import React, { useContext, useState, useEffect } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'

export default function FormTareas() {
  const proyectosContext = useContext(ProyectoContext)
  const tareasContext = useContext(TareaContext)

  const { proyecto } = proyectosContext
  const {
    tareaActual,
    addTareas,
    errorTarea,
    showErrorTarea,
    getTareas,
    updateTarea
  } = tareasContext

  const [tarea, setTarea] = useState({
    nombre: ''
  })

  //Effect que detecta si hay una tarea seleccionada para editar
  useEffect(() => {
    if (!tareaActual) {
      setTarea({
        nombre: ''
      })
    } else {
      setTarea(tareaActual)
    }
  }, [tareaActual])

  if (!proyecto) return null

  const { nombre } = tarea

  const handleChange = e => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    if (nombre.trim() === '') {
      showErrorTarea()
      return
    }

    //Validar si es edicion o si es nueva tarea
    if (tareaActual) {
      updateTarea(tarea)
    } else {
      tarea.proyecto = proyecto._id
      addTareas(tarea)
    }

    //Filtrar las tareas del proyecto actual
    getTareas(proyecto._id)

    setTarea({
      nombre: ''
    })
  }

  return (
    <div className='formulario' onSubmit={onSubmit}>
      <form>
        <div className='contenedor-input'>
          <input
            type='text'
            className='input-text'
            placeholder='Nombre Tarea...'
            name='nombre'
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className='contenedor-input'>
          <input
            type='submit'
            className='btn btn-primario btn-submit btn-block'
            value={tareaActual ? 'Editar tarea' : 'Agregar tarea'}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className='mensaje error'>El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  )
}
