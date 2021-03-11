import React, { useReducer } from "react"
import alertaReducer from "./alertaReducer"
import alertaContext from "./alertaContext"

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types"

const AlertaState = (props) => {
  const initial_state = {
    alerta: null
  }
  const [state, dispatch] = useReducer(alertaReducer, initial_state)

  const showAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria
      }
    })
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 5000)
  }

  return (
    <alertaContext.Provider value={{ alerta: state.alerta, showAlerta }}>
      {props.children}
    </alertaContext.Provider>
  )
}

export default AlertaState
