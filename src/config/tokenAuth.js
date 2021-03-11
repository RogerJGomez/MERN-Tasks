import clienteAxios from './axios'

//Funcion encargada de enviar el token via headers para usarse en las peticiones de axios al servidor
const tokenAuth = token => {
  if (token) {
    clienteAxios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete clienteAxios.defaults.headers.common['x-auth-token']
  }
}

export default tokenAuth
