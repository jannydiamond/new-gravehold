import { LoopReducer } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { createSelector } from 'reselect'
import shortid from 'shortid'

import * as types from 'types'

///////////
// STATE //
///////////

export type State = {
  [id: string]: types.BattleRewardConfig
}

export const initialState: State = {}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  DRAFT_ADD_REWARD_CONFIG = 'DraftExpedition/SequenceConfig/DraftRewardConfig/DRAFT_ADD_REWARD_CONFIG',
  DRAFT_EDIT_REWARD_CONFIG = 'DraftExpedition/SequenceConfig/DraftRewardConfig/DRAFT_EDIT_REWARD_CONFIG',
  DRAFT_DELETE_REWARD_CONFIG = 'DraftExpedition/SequenceConfig/DraftRewardConfig/DRAFT_DELETE_REWARD_CONFIG',
  CLEAR_DRAFT_REWARD_CONFIG = 'DraftExpedition/SequenceConfig/DraftRewardConfig/CLEAR_DRAFT_REWARD_CONFIG',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  draftAddRewardConfig: (type: types.BattleRewardConfigType) =>
    createAction(ActionTypes.DRAFT_ADD_REWARD_CONFIG, type),
  draftEditRewardConfig: (config: types.BattleRewardConfig) =>
    createAction(ActionTypes.DRAFT_EDIT_REWARD_CONFIG, config),
  draftDeleteRewardConfig: (config: types.BattleRewardConfig) =>
    createAction(ActionTypes.DRAFT_DELETE_REWARD_CONFIG, config),
  clearDraftRewardConfig: () =>
    createAction(ActionTypes.CLEAR_DRAFT_REWARD_CONFIG),
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
    case ActionTypes.DRAFT_ADD_REWARD_CONFIG: {
      const id = shortid.generate()

      return {
        [id]: {
          _id: id,
          type: action.payload,
          rewardType: 'regular',
        },
        ...state,
      }
    }

    case ActionTypes.DRAFT_EDIT_REWARD_CONFIG: {
      const { _id } = action.payload

      return {
        ...state,
        [_id]: action.payload,
      }
    }

    case ActionTypes.DRAFT_DELETE_REWARD_CONFIG: {
      const { _id } = action.payload
      const configs = Object.values(state)

      const newConfigs = configs.filter(
        (config: types.BattleRewardConfig) => config._id !== _id
      )

      const newState = newConfigs.reduce(
        (configs: State, config: types.BattleRewardConfig) => {
          return {
            ...configs,
            [config._id]: config,
          }
        },
        {}
      )

      return newState
    }

    case ActionTypes.CLEAR_DRAFT_REWARD_CONFIG: {
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

export type DraftRewardConfigStateSlice = {
  DraftExpedition: {
    SequenceConfig: {
      DraftRewardConfig: State
    }
  }
}

const getDraftRewardConfigState = (state: DraftRewardConfigStateSlice) =>
  state.DraftExpedition.SequenceConfig.DraftRewardConfig

const getDraftRewardConfigIds = createSelector(
  [getDraftRewardConfigState],
  (configs) => Object.keys(configs)
)

const getDraftRewardConfigArray = createSelector(
  [getDraftRewardConfigState],
  (configs) => Object.values(configs)
)

export const selectors = {
  getDraftRewardConfigState,
  getDraftRewardConfigIds,
  getDraftRewardConfigArray,
}
