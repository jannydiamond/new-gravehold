import { LoopReducer } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'

import * as types from 'types'
import shortid from 'shortid'

///////////
// STATE //
///////////

export type State = types.BranchBase | types.NarrativeBranch
export const initialState: State = {
  _id: '',
  id: '',
  type: 'narrative',
}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  DRAFT_ADD_BRANCH = 'DraftExpedition/SequenceConfig/DraftBranch/DRAFT_ADD_BRANCH',
  DRAFT_EDIT_BRANCH = 'DraftExpedition/SequenceConfig/DraftBranch/DRAFT_EDIT_BRANCH',
  CLEAR_DRAFT_BRANCH = 'DraftExpedition/SequenceConfig/DraftBranch/CLEAR_DRAFT_BRANCH',
  UPDATE_DRAFT_BRANCH = 'DraftExpedition/SequenceConfig/DraftBranch/UPDATE_DRAFT_BRANCH',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  draftAddBranch: () =>
    createAction(ActionTypes.DRAFT_ADD_BRANCH),
  draftEditBranch: (branch: types.BranchBase | types.Branch) =>
    createAction(ActionTypes.DRAFT_EDIT_BRANCH, branch),
  updateDraftBranch: (branch: types.BranchBase | types.Branch) =>
    createAction(ActionTypes.UPDATE_DRAFT_BRANCH, branch),
  clearDraftBranch: () =>
    createAction(ActionTypes.CLEAR_DRAFT_BRANCH),
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
    case ActionTypes.DRAFT_ADD_BRANCH: {
      return {
        ...state,
        _id: shortid.generate()
      }
    }

    case ActionTypes.DRAFT_EDIT_BRANCH: {
      return action.payload
    }

    case ActionTypes.UPDATE_DRAFT_BRANCH: {
      return action.payload
    }

    case ActionTypes.CLEAR_DRAFT_BRANCH: {
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

export type DraftBranchStateSlice = {
  DraftExpedition: {
    SequenceConfig: {
      DraftBranch: State
    }
  }
}

const getDraftBranchState = (state: DraftBranchStateSlice) => state.DraftExpedition.SequenceConfig.DraftBranch

export const selectors = {
  getDraftBranchState
}