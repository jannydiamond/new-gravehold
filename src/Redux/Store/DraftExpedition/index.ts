import { combineReducers } from 'redux-loop'

import * as Name from './Name'
import * as SeedConfig from './SeedConfig'
import * as BigPocketVariantConfig from './BigPocketVariantConfig'
import * as InitialBarracksConfig from './InitialBarracksConfig'
import * as SequenceConfig from './SequenceConfig'

///////////
// STATE //
///////////

export type State = {
  Name: Name.State
  SeedConfig: SeedConfig.State
  BigPocketVariantConfig: BigPocketVariantConfig.State
  InitialBarracksConfig: InitialBarracksConfig.State
  SequenceConfig: SequenceConfig.State
}

export const initialState = {
  Name: Name.initialState,
  SeedConfig: SeedConfig.initialState,
  BigPocketVariantConfig: BigPocketVariantConfig.initialState,
  InitialBarracksConfig: InitialBarracksConfig.initialState,
  SequenceConfig: SequenceConfig.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  Name: Name.actions,
  SeedConfig: SeedConfig.actions,
  BigPocketVariantConfig: BigPocketVariantConfig.actions,
  InitialBarracksConfig: InitialBarracksConfig.actions,
  SequenceConfig: SequenceConfig.actions,
}

export type Action =
  | Name.Action
  | SeedConfig.Action
  | BigPocketVariantConfig.Action
  | InitialBarracksConfig.Action
  | SequenceConfig.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  Name: Name.Reducer,
  SeedConfig: SeedConfig.Reducer,
  BigPocketVariantConfig: BigPocketVariantConfig.Reducer,
  InitialBarracksConfig: InitialBarracksConfig.Reducer,
  SequenceConfig: SequenceConfig.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  Name: Name.selectors,
  SeedConfig: SeedConfig.selectors,
  BigPocketVariantConfig: BigPocketVariantConfig.selectors,
  InitialBarracksConfig: InitialBarracksConfig.selectors,
  SequenceConfig: SequenceConfig.selectors,
}
