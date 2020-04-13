import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'

///////////
// STATE //
///////////

export type State = boolean
export const initialState: State = false

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_BIG_POCKET_VARIANT_CONFIG = 'DraftExpedition/BigPocketVariantConfig/SET_BIG_POCKET_VARIANT_CONFIG',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  setBigPocketVariantConfig: (value: boolean) =>
    createAction(ActionTypes.SET_BIG_POCKET_VARIANT_CONFIG, value),
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
    case ActionTypes.SET_BIG_POCKET_VARIANT_CONFIG: {
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

export type BigPocketVariantConfigStateSlice = {
  DraftExpedition: {
    BigPocketVariantConfig: State
  }
}

const getBigPocketVariantConfig = (state: BigPocketVariantConfigStateSlice) => state.DraftExpedition.BigPocketVariantConfig

export const selectors = {
  getBigPocketVariantConfig,
}
