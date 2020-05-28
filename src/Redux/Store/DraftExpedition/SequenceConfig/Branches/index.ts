import { createSelector } from 'reselect'
import { LoopReducer } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'

import * as types from 'types'

///////////
// STATE //
///////////

export type State = types.Branches | {}
export const initialState: State = {}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  ADD_BRANCH = 'DraftExpedition/SequenceConfig/Branches/ADD_BRANCH',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  addBranch: (branch: types.NarrativeBranch | types.RewardBranch) =>
    createAction(ActionTypes.ADD_BRANCH, branch),
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
    case ActionTypes.ADD_BRANCH: {
      const { _id, id, type } = action.payload

      switch (type) {
        case 'narrative': {
          const { text, decisions } = action.payload as types.NarrativeBranch

          return {
            ...state,
            [_id]: {
              _id,
              id: id ? id : _id,
              type,
              text: text ? text : '',
              decisions: decisions ? [...decisions] : false,
            },
          }
        }

        case 'reward': {
          const {
            rewardType,
            treasure,
            mage,
            supply,
          } = action.payload as types.RewardBranch

          return {
            ...state,
            [_id]: {
              _id,
              id: id ? id : _id,
              type,
              rewardType: rewardType ? rewardType : 'regular',
              treasure: {
                ids: treasure?.ids ?? [],
                tier1: treasure?.tier1 ?? 0,
                tier2: treasure?.tier2 ?? 0,
                tier3: treasure?.tier3 ?? 0,
              },
              mage: {
                ids: mage?.ids ?? [],
                randomAmount: mage?.randomAmount ?? 0,
              },
              supply: {
                ids: supply?.ids ? supply.ids : [],
                blueprints: supply?.blueprints ?? [],
                bigPocket: supply?.bigPocket,
              },
            },
          }
        }

        default: {
          return {
            ...state,
            [_id]: {
              _id,
              id,
              type,
            },
          }
        }
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

export type BranchesStateSlice = {
  DraftExpedition: {
    SequenceConfig: {
      Branches: State
    }
  }
}

const getBranchesState = (state: BranchesStateSlice) =>
  state.DraftExpedition.SequenceConfig.Branches

const getBranchIds = createSelector([getBranchesState], (branches) =>
  Object.keys(branches)
)

const getBranches = createSelector([getBranchesState], (branches) =>
  Object.values(branches)
)

export const selectors = {
  getBranchesState,
  getBranchIds,
  getBranches,
}
