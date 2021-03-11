import React, { useContext, useState } from "react"
import ProyectoContext from "../../context/proyectos/ProyectoContext"

export default function NuevoProyecto() {
  const proyectosContext = useContext(ProyectoContext)
  const {
    formulario,
    errorForm,
    showFormulario,
    addProyecto,
    showError
  } = proyectosContext

  const [proyecto, setProyecto] = useState({
    nombre: ""
  })
  const { nombre } = proyecto

  const onChange = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (nombre === "") {
      showError()
      return
    }

    addProyecto(proyecto)

    setProyecto({
      nombre: ""
    })
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showFormulario()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChange}
          />
          <input
            type="submit"
            className="btn btn-block btn-primario"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorForm ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </>
  )
}
