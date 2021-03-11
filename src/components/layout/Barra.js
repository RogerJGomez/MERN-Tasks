import React, { useEffect, useContext } from 'react'
import AuthContext from '../../context/autenticacion/authContext'

export default function Barra() {
  const authContext = useContext(AuthContext)
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext

  useEffect(() => {
    usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <header className='app-header'>
        {usuario ? (
          <p className='nombre-usuario'>
            Hola <span>{usuario.nombre}</span>
          </p>
        ) : null}

        <nav className='nav-principal'>
          <button
            className='btn btn-blank cerrar-sesion'
            onClick={() => cerrarSesion()}
          >
            Cerrar Sesion
          </button>
        </nav>
      </header>
    </div>
  )
}
