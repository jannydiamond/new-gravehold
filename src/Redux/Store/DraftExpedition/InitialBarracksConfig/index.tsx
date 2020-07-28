import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'

import * as aerTypes from 'aer-types'
import { createSelector } from 'reselect'

///////////
// STATE //
///////////

export type State = aerTypes.Barracks

export const initialState: State = {
  mageIds: [],
  supplyIds: [],
  treasureIds: [],
}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_MAGES = 'DraftExpedition/InitialBarracksConfig/SET_MAGES',
  SET_SUPPLY_CARDS = 'DraftExpedition/InitialBarracksConfig/SET_SUPPLY_CARDS',
  SET_TREASURES = 'DraftExpedition/InitialBarracksConfig/SET_TREASURES',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  setMages: (mages: string[]) => createAction(ActionTypes.SET_MAGES, mages),
  setSupplyCards: (supplyCards: string[]) =>
    createAction(ActionTypes.SET_SUPPLY_CARDS, supplyCards),
  setTreasures: (treasures: string[]) =>
    createAction(ActionTypes.SET_TREASURES, treasures),
}

export type Action = ActionsUnion<typeof actions>

/////////////
// REDUCER //
/////////////

export const Reducer: LoopReducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SET_MAGES: {
      return {
        ...state,
        mageIds: action.payload,
      }
    }

    case ActionTypes.SET_SUPPLY_CARDS: {
      return {
        ...state,
        supplyIds: action.payload,
      }
    }

    case ActionTypes.SET_TREASURES: {
      return {
        ...state,
        treasureIds: action.payload,
      }
    }

    default: {
      return state
    }
  }
}

///////////////
// SELECTORS //
///////////////

export type InitialBarracksConfigStateSlice = {
  DraftExpedition: {
    InitialBarracksConfig: State
  }
}

const getInitialBarracksConfig = (state: InitialBarracksConfigStateSlice) =>
  state.DraftExpedition.InitialBarracksConfig

const getBarrackMages = createSelector(
  [getInitialBarracksConfig],
  (barracks: aerTypes.Barracks) => barracks.mageIds
)

const getBarrackSupplyCards = createSelector(
  [getInitialBarracksConfig],
  (barracks: aerTypes.Barracks) => barracks.supplyIds
)

const getBarrackTreasures = createSelector(
  [getInitialBarracksConfig],
  (barracks: aerTypes.Barracks) => barracks.treasureIds
)

export const selectors = {
  getInitialBarracksConfig,
  getBarrackMages,
  getBarrackSupplyCards,
  getBarrackTreasures,
}
