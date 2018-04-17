import { combineReducers } from 'redux'
import { auth } from './auth.reducer'
import { event } from './event.reducer'
import { game } from './game.reducer'
import { tournament } from './tournament.reducer'
import { series } from './series.reducer'
import { player } from './player.reducer'
import { query } from './query.reducer'

const rootReducer = combineReducers({
  auth,
  event,
  game,
  tournament,
  series,
  player,
  query
})

export default rootReducer
