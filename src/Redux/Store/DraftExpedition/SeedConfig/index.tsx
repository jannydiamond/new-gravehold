import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'

///////////
// STATE //
///////////

export type State = string
export const initialState: State = ''

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_SEED = 'DraftExpedition/SeedConfig/SET_SEED',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  setSeed: (seed: string) => createAction(ActionTypes.SET_SEED, seed),
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
    case ActionTypes.SET_SEED: {
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

export type SeedStateSlice = {
  DraftExpedition: {
    SeedConfig: State
  }
}

const getSeed = (state: SeedStateSlice) => state.DraftExpedition.SeedConfig

export const selectors = {
  getSeed,
}
