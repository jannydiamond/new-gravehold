import { combineReducers } from 'redux-loop'

import * as DraftRewardSupplyCard from './DraftRewardSupplyCard'
import * as DraftBranch from './DraftBranch'
import * as Branches from './Branches'

///////////
// STATE //
///////////

export type State = {
  DraftRewardSupplyCard: DraftRewardSupplyCard.State
  DraftBranch: DraftBranch.State
  Branches: Branches.State
}

export const initialState = {
  DraftRewardSupplyCard: DraftRewardSupplyCard.initialState,
  DraftBranch: DraftBranch.initialState,
  Branches: Branches.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  DraftRewardSupplyCard: DraftRewardSupplyCard.actions,
  DraftBranch: DraftBranch.actions,
  Branches: Branches.actions,
}

export type Action =
  | DraftRewardSupplyCard.Action
  | DraftBranch.Action
  | Branches.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  DraftRewardSupplyCard: DraftRewardSupplyCard.Reducer,
  DraftBranch: DraftBranch.Reducer,
  Branches: Branches.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  DraftRewardSupplyCard: DraftRewardSupplyCard.selectors,
  DraftBranch: DraftBranch.selectors,
  Branches: Branches.selectors,
}
