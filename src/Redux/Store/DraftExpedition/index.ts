import { combineReducers } from 'redux-loop'

import * as Name from './Name'
import * as BigPocketVariantConfig from './BigPocketVariantConfig'
import * as SequenceConfig from './SequenceConfig'

///////////
// STATE //
///////////

export type State = {
  Name: Name.State
  BigPocketVariantConfig: BigPocketVariantConfig.State
  SequenceConfig: SequenceConfig.State
}

export const initialState = {
  Name: Name.initialState,
  BigPocketVariantConfig: BigPocketVariantConfig.initialState,
  SequenceConfig: SequenceConfig.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  Name: Name.actions,
  BigPocketVariantConfig: BigPocketVariantConfig.actions,
  SequenceConfig: SequenceConfig.actions,
}

export type Action =
  | Name.Action
  | BigPocketVariantConfig.Action
  | SequenceConfig.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  Name: Name.Reducer,
  BigPocketVariantConfig: BigPocketVariantConfig.Reducer,
  SequenceConfig: SequenceConfig.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  Name: Name.selectors,
  BigPocketVariantConfig: BigPocketVariantConfig.selectors,
  SequenceConfig: SequenceConfig.selectors,
}
