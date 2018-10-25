import { combineEpics } from 'redux-observable'
import { mainInitEpic } from './main/epic'

export default combineEpics(
  mainInitEpic,
)
