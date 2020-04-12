import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'

///////////
// STATE //
///////////

export type State = string | undefined
export const initialState: State = undefined

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_EXPEDITION_NAME = 'DraftExpedition/Name/SET_EXPEDITION_NAME',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  setExpeditionName: (name: string) =>
    createAction(ActionTypes.SET_EXPEDITION_NAME, name),
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
    case ActionTypes.SET_EXPEDITION_NAME: {
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

export type NameStateSlice = {
  DraftExpedition: {
    Name: State
  }
}

const getExpeditionName = (state: NameStateSlice) => state.DraftExpedition.Name

export const selectors = {
  getExpeditionName,
}
