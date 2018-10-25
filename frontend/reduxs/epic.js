import { combineEpics } from 'redux-observable'
import main from './main/reducer'

export default combineEpics(
  main,
)
