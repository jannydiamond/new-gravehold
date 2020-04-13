import { combineReducers } from 'redux-loop'

import * as Branches from './Branches'

///////////
// STATE //
///////////

export type State = {
  Branches: Branches.State
}

export const initialState = {
  Branches: Branches.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  Branches: Branches.actions,
}

export type Action = Branches.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  Branches: Branches.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  Branches: Branches.selectors,
}
