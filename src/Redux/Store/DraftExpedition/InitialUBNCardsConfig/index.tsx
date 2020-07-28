import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'

///////////
// STATE //
///////////

export type State = string[]

export const initialState: State = []

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_UBN_CARDS = 'DraftExpedition/InitialUBNCardsConfig/SET_UBN_CARDS',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  setUBNCards: (upgradedBasicNemesisCards: string[]) =>
    createAction(ActionTypes.SET_UBN_CARDS, upgradedBasicNemesisCards),
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
    case ActionTypes.SET_UBN_CARDS: {
      return action.payload
    }

    default: {
      return state
    }
  }
}

///////////////
// SELECTORS //
///////////////

export type InitialUBNCardsConfigStateSlice = {
  DraftExpedition: {
    InitialUBNCardsConfig: State
  }
}

const getInitialUBNCardsConfig = (state: InitialUBNCardsConfigStateSlice) =>
  state.DraftExpedition.InitialUBNCardsConfig

export const selectors = {
  getInitialUBNCardsConfig,
}
