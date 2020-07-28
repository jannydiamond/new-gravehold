import { combineReducers } from 'redux-loop'

import * as Name from './Name'
import * as SeedConfig from './SeedConfig'
import * as BigPocketVariantConfig from './BigPocketVariantConfig'
import * as SequenceConfig from './SequenceConfig'

///////////
// STATE //
///////////

export type State = {
  Name: Name.State
  SeedConfig: SeedConfig.State
  BigPocketVariantConfig: BigPocketVariantConfig.State
  SequenceConfig: SequenceConfig.State
}

export const initialState = {
  Name: Name.initialState,
  SeedConfig: SeedConfig.initialState,
  BigPocketVariantConfig: BigPocketVariantConfig.initialState,
  SequenceConfig: SequenceConfig.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  Name: Name.actions,
  SeedConfig: SeedConfig.actions,
  BigPocketVariantConfig: BigPocketVariantConfig.actions,
  SequenceConfig: SequenceConfig.actions,
}

export type Action =
  | Name.Action
  | SeedConfig.Action
  | BigPocketVariantConfig.Action
  | SequenceConfig.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  Name: Name.Reducer,
  SeedConfig: SeedConfig.Reducer,
  BigPocketVariantConfig: BigPocketVariantConfig.Reducer,
  SequenceConfig: SequenceConfig.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  Name: Name.selectors,
  SeedConfig: SeedConfig.selectors,
  BigPocketVariantConfig: BigPocketVariantConfig.selectors,
  SequenceConfig: SequenceConfig.selectors,
}
