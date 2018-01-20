import { merge } from 'lodash'

import { gameConstants } from '../_constants'

const init = {
  isFetching: false,
  games: [],
  game: null,
  tournaments: []
}

export const game = (state = init, action) => {
  switch (action.type) {
    case gameConstants.GETALL_REQUEST:
      state.games = []
      return merge({}, state, {
        isFetching: true,
        games: action.games
      })
    case gameConstants.GET_REQUEST:
      return merge({}, state, {
        isFetching: true,
        game: action.game
      })
    case gameConstants.GETTOURNAMENTS_REQUEST:
      state.tournaments = []
      return merge({}, state, {
        isFetching: true,
        tournaments: action.tournaments
      })
    case gameConstants.GETALL_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        games: action.games
      })
    case gameConstants.GETALL_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        games: action.games
      })
    case gameConstants.GET_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        game: action.game
      })
    case gameConstants.GET_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        game: action.game
      })
    case gameConstants.GETTOURNAMENTS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        tournaments: action.tournaments
      })
    case gameConstants.GETTOURNAMENTS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        tournaments: action.tournaments
      })
    default:
      return state
  }
}