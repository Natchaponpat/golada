import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './reducer'
import rootEpic from './epic'
import getConfig from 'next/config'


export default () => {


  const { publicRuntimeConfig } = getConfig()
  const { API_URL } = publicRuntimeConfig

  console.log('API_URL', API_URL)

  const epicMiddleware = createEpicMiddleware({
    dependencies: { url: API_URL },
  })
  const composeEnhancers =
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  )

  epicMiddleware.run(rootEpic)

  return store
}
