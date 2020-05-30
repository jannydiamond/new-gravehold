import { combineReducers } from 'redux-loop'

import * as DraftBranch from './DraftBranch'
import * as Branches from './Branches'

///////////
// STATE //
///////////

export type State = {
  DraftBranch: DraftBranch.State
  Branches: Branches.State
}

export const initialState = {
  DraftBranch: DraftBranch.initialState,
  Branches: Branches.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  DraftBranch: DraftBranch.actions,
  Branches: Branches.actions,
}

export type Action = DraftBranch.Action
  | Branches.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  DraftBranch: DraftBranch.Reducer,
  Branches: Branches.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  DraftBranch: DraftBranch.selectors,
  Branches: Branches.selectors,
}
