import { combineReducers } from 'redux-loop'

import * as DraftRewardConfig from './DraftRewardConfig'
import * as DraftRewardSupplyCard from './DraftRewardSupplyCard'
import * as DraftBranch from './DraftBranch'
import * as Branches from './Branches'

///////////
// STATE //
///////////

export type State = {
  DraftRewardConfig: DraftRewardConfig.State
  DraftRewardSupplyCard: DraftRewardSupplyCard.State
  DraftBranch: DraftBranch.State
  Branches: Branches.State
}

export const initialState = {
  DraftRewardConfig: DraftRewardConfig.initialState,
  DraftRewardSupplyCard: DraftRewardSupplyCard.initialState,
  DraftBranch: DraftBranch.initialState,
  Branches: Branches.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  DraftRewardConfig: DraftRewardConfig.actions,
  DraftRewardSupplyCard: DraftRewardSupplyCard.actions,
  DraftBranch: DraftBranch.actions,
  Branches: Branches.actions,
}

export type Action =
  | DraftRewardConfig.Action
  | DraftRewardSupplyCard.Action
  | DraftBranch.Action
  | Branches.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  DraftRewardConfig: DraftRewardConfig.Reducer,
  DraftRewardSupplyCard: DraftRewardSupplyCard.Reducer,
  DraftBranch: DraftBranch.Reducer,
  Branches: Branches.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  DraftRewardConfig: DraftRewardConfig.selectors,
  DraftRewardSupplyCard: DraftRewardSupplyCard.selectors,
  DraftBranch: DraftBranch.selectors,
  Branches: Branches.selectors,
}
