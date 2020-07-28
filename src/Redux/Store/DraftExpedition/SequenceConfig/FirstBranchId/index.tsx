import { LoopReducer } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'

///////////
// STATE //
///////////

export type State = string | null

export const initialState: State = null

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_FIRST_BRANCH_ID = 'DraftExpedition/SequenceConfig/FirstBranchId/SET_FIRST_BRANCH_ID',
  CLEAR_FIRST_BRANCH_ID = 'DraftExpedition/SequenceConfig/FirstBranchId/CLEAR_FIRST_BRANCH_ID',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  setFirstBranchId: (branchId: string) =>
    createAction(ActionTypes.SET_FIRST_BRANCH_ID, branchId),
  clearFirstBranchId: () => createAction(ActionTypes.CLEAR_FIRST_BRANCH_ID),
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
    case ActionTypes.SET_FIRST_BRANCH_ID: {
      return action.payload
    }

    case ActionTypes.CLEAR_FIRST_BRANCH_ID: {
      return initialState
    }

    default: {
      return state
    }
  }
}

///////////////
// SELECTORS //
///////////////

export type FirstBranchIdStateSlice = {
  DraftExpedition: {
    SequenceConfig: {
      FirstBranchId: State
    }
  }
}

const getFirstBranchId = (state: FirstBranchIdStateSlice) =>
  state.DraftExpedition.SequenceConfig.FirstBranchId

export const selectors = {
  getFirstBranchId,
}
