import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import AlertaContext from '../../context/alertas/alertaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function Listado() {
  const { proyectos, mensaje, getProyectos } = useContext(ProyectoContext)
  const { alerta, showAlerta } = useContext(AlertaContext)

  useEffect(() => {
    //Si hay un error
    if (mensaje) {
      showAlerta(mensaje.msg, mensaje.categoria)
    }
    getProyectos()
    // eslint-disable-next-line
  }, [mensaje])

  if (proyectos.length === 0) return <p>No hay proyectos</p>

  return (
    <ul className='listado-proyectos'>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition key={proyecto._id} timeout={200} classNames='proyecto'>
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
}
