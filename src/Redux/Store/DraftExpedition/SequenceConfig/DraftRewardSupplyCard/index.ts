import { LoopReducer } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { createSelector } from 'reselect'
import shortid from 'shortid'

import * as types from 'types'

///////////
// STATE //
///////////

export type State = {
  [id: string]: types.Blueprint
}

export const initialState: State = {}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  DRAFT_ADD_REWARD_SUPPLY_CARD = 'DraftExpedition/SequenceConfig/DraftRewardSupplyCard/DRAFT_ADD_REWARD_SUPPLY_CARD',
  DRAFT_EDIT_REWARD_SUPPLY_CARD = 'DraftExpedition/SequenceConfig/DraftRewardSupplyCard/DRAFT_EDIT_REWARD_SUPPLY_CARD',
  DRAFT_DELETE_REWARD_SUPPLY_CARD = 'DraftExpedition/SequenceConfig/DraftRewardSupplyCard/DRAFT_DELETE_REWARD_SUPPLY_CARD',
  CLEAR_DRAFT_REWARD_SUPPLY_CARD = 'DraftExpedition/SequenceConfig/DraftRewardSupplyCard/CLEAR_DRAFT_REWARD_SUPPLY_CARD',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  draftAddRewardSupplyCard: () =>
    createAction(ActionTypes.DRAFT_ADD_REWARD_SUPPLY_CARD),
  draftEditRewardSupplyCard: (blueprint: types.Blueprint) =>
    createAction(ActionTypes.DRAFT_EDIT_REWARD_SUPPLY_CARD, blueprint),
  draftDeleteRewardSupplyCard: (blueprint: types.Blueprint) =>
    createAction(ActionTypes.DRAFT_DELETE_REWARD_SUPPLY_CARD, blueprint),
  clearDraftRewardSupplyCard: () =>
    createAction(ActionTypes.CLEAR_DRAFT_REWARD_SUPPLY_CARD),
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
    case ActionTypes.DRAFT_ADD_REWARD_SUPPLY_CARD: {
      const id = shortid.generate()

      return {
        [id]: {
          _id: id,
          type: 'Gem',
          operation: 'ANY',
        },
        ...state,
      }
    }

    case ActionTypes.DRAFT_EDIT_REWARD_SUPPLY_CARD: {
      const { _id } = action.payload

      return {
        ...state,
        [_id]: action.payload,
      }
    }

    case ActionTypes.DRAFT_DELETE_REWARD_SUPPLY_CARD: {
      const { _id } = action.payload
      const blueprints = Object.values(state)

      const newBlueprints = blueprints.filter(
        (blueprint: types.Blueprint) => blueprint._id !== _id
      )

      const newState = newBlueprints.reduce(
        (blueprints: State, blueprint: types.Blueprint) => {
          return {
            ...blueprints,
            [blueprint._id]: blueprint,
          }
        },
        {}
      )

      return newState
    }

    case ActionTypes.CLEAR_DRAFT_REWARD_SUPPLY_CARD: {
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

export type DraftRewardSupplyCardStateSlice = {
  DraftExpedition: {
    SequenceConfig: {
      DraftRewardSupplyCard: State
    }
  }
}

const getDraftRewardSupplyCardState = (
  state: DraftRewardSupplyCardStateSlice
) => state.DraftExpedition.SequenceConfig.DraftRewardSupplyCard

const getDraftRewardSupplyCardIds = createSelector(
  [getDraftRewardSupplyCardState],
  (blueprints) => Object.keys(blueprints)
)

const getDraftRewardSupplyCardArray = createSelector(
  [getDraftRewardSupplyCardState],
  (blueprints) => Object.values(blueprints)
)

export const selectors = {
  getDraftRewardSupplyCardState,
  getDraftRewardSupplyCardIds,
  getDraftRewardSupplyCardArray,
}
