import { combineReducers, reduceReducers } from 'redux-loop'

import * as DraftExpedition from 'Redux/Store/DraftExpedition'

export type RootState = {
  DraftExpedition: DraftExpedition.State
}

export const initialState = {
  DraftExpedition: DraftExpedition.initialState
}

export const actions = {
  DraftExpedition: DraftExpedition.actions,
}

export type RootAction =
  | DraftExpedition.Action

export const RootReducer = reduceReducers(
  combineReducers<RootState>({
    DraftExpedition: DraftExpedition.Reducer,
  })
)

export const selectors = {
  DraftExpedition: DraftExpedition.selectors
}



