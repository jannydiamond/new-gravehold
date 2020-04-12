import { combineReducers } from 'redux-loop'

import * as Name from './Name'
import * as BigPocketVariantConfig from './BigPocketVariantConfig'

///////////
// STATE //
///////////

export type State = {
  Name: Name.State
  BigPocketVariantConfig: BigPocketVariantConfig.State
}

export const initialState = {
  Name: Name.initialState,
  BigPocketVariantConfig: BigPocketVariantConfig.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  Name: Name.actions,
  BigPocketVariantConfig: BigPocketVariantConfig.actions,
}

export type Action = Name.Action
  | BigPocketVariantConfig.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  Name: Name.Reducer,
  BigPocketVariantConfig: BigPocketVariantConfig.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  Name: Name.selectors,
  BigPocketVariantConfig: BigPocketVariantConfig.selectors,
}
