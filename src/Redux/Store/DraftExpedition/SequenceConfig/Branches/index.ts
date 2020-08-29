import { createSelector } from 'reselect'
import { LoopReducer } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import shortid from 'shortid'

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
  ADD_NARRATIVE_BRANCH = 'DraftExpedition/SequenceConfig/Branches/ADD_NARRATIVE_BRANCH',
  ADD_BATTLE_BRANCH = 'DraftExpedition/SequenceConfig/Branches/ADD_BATTLE_BRANCH',
  ADD_REWARD_BRANCH = 'DraftExpedition/SequenceConfig/Branches/ADD_REWARD_BRANCH',
  UPDATE_BRANCH = 'DraftExpedition/SequenceConfig/Branches/UPDATE_BRANCH',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  addBranch: (
    branch: types.NarrativeBranch | types.RewardBranch | types.BattleBranch
  ) => createAction(ActionTypes.ADD_BRANCH, branch),
  addNarrativeBranch: (branch: types.NarrativeBranch) =>
    createAction(ActionTypes.ADD_NARRATIVE_BRANCH, branch),
  addBattleBranch: (branch: types.BattleBranch) =>
    createAction(ActionTypes.ADD_BATTLE_BRANCH, branch),
  addRewardBranch: (branch: types.RewardBranch) =>
    createAction(ActionTypes.ADD_REWARD_BRANCH, branch),
  updateBranch: (
    branch: types.NarrativeBranch | types.RewardBranch | types.BattleBranch
  ) => createAction(ActionTypes.UPDATE_BRANCH, branch),
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

        case 'battle': {
          const {
            tier,
            nemesisId,
            newUBNCards,
            treasure,
            specialRules,
            onLoss,
            lossRewards,
            winRewards,
          } = action.payload as types.BattleBranch

          return {
            ...state,
            [_id]: {
              _id,
              id: id ? id : _id,
              tier,
              type,
              nemesisId: nemesisId ?? '',
              newUBNCards,
              treasure,
              specialRules,
              onLoss: onLoss && 'skip',
              lossRewards: lossRewards,
              winRewards: winRewards,
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

    case ActionTypes.ADD_NARRATIVE_BRANCH: {
      const { id } = action.payload
      const branchId = id !== '' ? id : shortid.generate()

      return {
        ...state,
        [branchId]: {
          ...action.payload,
          id: branchId,
        },
      }
    }

    case ActionTypes.ADD_BATTLE_BRANCH: {
      const { id } = action.payload
      const branchId = id !== '' ? id : shortid.generate()

      return {
        ...state,
        [branchId]: {
          ...action.payload,
          id: branchId,
        },
      }
    }

    case ActionTypes.ADD_REWARD_BRANCH: {
      const { id } = action.payload
      const branchId = id !== '' ? id : shortid.generate()

      return {
        ...state,
        [branchId]: {
          ...action.payload,
          id: branchId,
        },
      }
    }

    case ActionTypes.UPDATE_BRANCH: {
      const { _id } = action.payload

      return {
        ...state,
        [_id]: action.payload,
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
