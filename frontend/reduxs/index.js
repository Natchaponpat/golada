import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './reducer'
import rootEpic from './epic'

const apiURL = process.env.API_URL || ''

export default () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { url: apiURL },
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
