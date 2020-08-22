import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'
import { createSelector } from 'reselect'

import DATA from 'aer-data'
import * as aerTypes from 'aer-types'
import shortid from 'shortid'

import * as types from 'types'

///////////
// STATE //
///////////

export type State = {
  supplySetup: types.SupplySetup
  availableMageIds: string[]
  availableCardIds: string[]
  availableTreasureIds: string[]
  availableNemesisIds: string[]
  availableUpgradedBasicNemesisCardIds: string[]
}

const dataMarketSetups = Object.values(DATA.marketsetups.setups)
const initialMarketSetup = dataMarketSetups.find(
  (setup: aerTypes.IMarketSetup) => setup.default
)
const dataMages: aerTypes.Mage[] = Object.values(DATA.normalizedData.ENG.mages)
const dataSupply: aerTypes.ICard[] = Object.values(
  DATA.normalizedData.ENG.cards
)
const dataTreasures: aerTypes.Treasure[] = Object.values(
  DATA.normalizedData.ENG.treasures
)

const dataNemeses: aerTypes.Nemesis[] = Object.values(
  DATA.normalizedData.ENG.nemeses
)

const dataUBNCards: aerTypes.UpgradedBasicNemesisCard[] = Object.values(
  DATA.normalizedData.ENG.upgradedBasicNemesisCards
)

export const initialState: State = {
  supplySetup: {
    id: initialMarketSetup?.id ?? '',
    name: initialMarketSetup?.name ?? '',
    type: initialMarketSetup?.type ?? 'official',
    active: initialMarketSetup?.active ?? true,
    tiles:
      initialMarketSetup?.tiles.reduce(
        (tiles: types.Tiles, tile: aerTypes.Slot) => {
          const tileId = tile.id ?? shortid.generate()

          const newTile = {
            id: tileId,
            type: tile.type as types.SupplyCardType,
            operation: tile.operation,
          }

          tile.threshold &&
            Object.assign(newTile, {
              threshold: tile.threshold,
            })

          tile.values &&
            Object.assign(newTile, {
              values: tile.values,
            })

          return {
            ...tiles,
            [tileId]: newTile,
          }
        },
        {}
      ) ?? {},
  },
  availableMageIds: dataMages.map((mage: aerTypes.Mage) => mage.id),
  availableCardIds: dataSupply.map((supply: aerTypes.ICard) => supply.id),
  availableTreasureIds: dataTreasures.map(
    (treasure: aerTypes.Treasure) => treasure.id
  ),
  availableNemesisIds: dataNemeses.map(
    (nemesis: aerTypes.Nemesis) => nemesis.id
  ),
  availableUpgradedBasicNemesisCardIds: dataUBNCards.map(
    (upgradedBasicNemesisCard: aerTypes.UpgradedBasicNemesisCard) =>
      upgradedBasicNemesisCard.id
  ),
}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_SUPPLY_SETUP = 'DraftExpedition/SettingsSnapshotConfig/SET_SUPPLY_SETUP',
  SET_SUPPLY_SETUP_TYPE = 'DraftExpedition/SettingsSnapshotConfig/SET_SUPPLY_SETUP_TYPE',
  SET_SUPPLY_SETUP_ID = 'DraftExpedition/SettingsSnapshotConfig/SET_SUPPLY_SETUP_ID',
  SET_SUPPLY_SETUP_NAME = 'DraftExpedition/SettingsSnapshotConfig/SET_SUPPLY_SETUP_NAME',
  ADD_SUPPLY_TILE = 'DraftExpedition/SettingsSnapshotConfig/ADD_SUPPLY_TILE',
  UPDATE_SUPPLY_TILE = 'DraftExpedition/SettingsSnapshotConfig/UPDATE_SUPPLY_TILE',
  DELETE_SUPPLY_TILE = 'DraftExpedition/SettingsSnapshotConfig/DELETE_SUPPLY_TILE',
  SET_AVAILABLE_MAGES = 'DraftExpedition/SettingsSnapshotConfig/SET_AVAILABLE_MAGES',
  SET_AVAILABLE_SUPPLY_CARDS = 'DraftExpedition/SettingsSnapshotConfig/SET_AVAILABLE_SUPPLY_CARDS',
  SET_AVAILABLE_TREASURES = 'DraftExpedition/SettingsSnapshotConfig/SET_AVAILABLE_TREASURES',
  SET_AVAILABLE_NEMESES = 'DraftExpedition/SettingsSnapshotConfig/SET_AVAILABLE_NEMESES',
  SET_AVAILABLE_UBN_CARDS = 'DraftExpedition/SettingsSnapshotConfig/SET_AVAILABLE_UBN_CARDS',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  setSupplySetup: (supplySetup: types.SupplySetup) =>
    createAction(ActionTypes.SET_SUPPLY_SETUP, supplySetup),
  setSupplySetupType: (type: types.SupplySetupType) =>
    createAction(ActionTypes.SET_SUPPLY_SETUP_TYPE, type),
  setSupplySetupId: (id: string) =>
    createAction(ActionTypes.SET_SUPPLY_SETUP_ID, id),
  setSupplySetupName: (name: string) =>
    createAction(ActionTypes.SET_SUPPLY_SETUP_NAME, name),
  addSupplyTile: () => createAction(ActionTypes.ADD_SUPPLY_TILE),
  updateSupplyTile: (tile: aerTypes.MarketTile) =>
    createAction(ActionTypes.UPDATE_SUPPLY_TILE, tile),
  deleteSupplyTile: (tileId: string) =>
    createAction(ActionTypes.DELETE_SUPPLY_TILE, tileId),
  setAvailableMages: (mages: string[]) =>
    createAction(ActionTypes.SET_AVAILABLE_MAGES, mages),
  setAvailableSupplyCards: (supplyCards: string[]) =>
    createAction(ActionTypes.SET_AVAILABLE_SUPPLY_CARDS, supplyCards),
  setAvailableTreasures: (treasures: string[]) =>
    createAction(ActionTypes.SET_AVAILABLE_TREASURES, treasures),
  setAvailableNemeses: (nemeses: string[]) =>
    createAction(ActionTypes.SET_AVAILABLE_NEMESES, nemeses),
  setAvailableUBNCards: (upgradedBasicNemesisCards: string[]) =>
    createAction(
      ActionTypes.SET_AVAILABLE_UBN_CARDS,
      upgradedBasicNemesisCards
    ),
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
    case ActionTypes.SET_SUPPLY_SETUP: {
      return {
        ...state,
        supplySetup: action.payload,
      }
    }

    case ActionTypes.SET_SUPPLY_SETUP_TYPE: {
      return {
        ...state,
        supplySetup: {
          ...state.supplySetup,
          type: action.payload,
        },
      }
    }

    case ActionTypes.SET_SUPPLY_SETUP_ID: {
      return {
        ...state,
        supplySetup: {
          ...state.supplySetup,
          id: action.payload,
        },
      }
    }

    case ActionTypes.SET_SUPPLY_SETUP_NAME: {
      return {
        ...state,
        supplySetup: {
          ...state.supplySetup,
          name: action.payload,
        },
      }
    }

    case ActionTypes.ADD_SUPPLY_TILE: {
      const tileId = shortid()

      return {
        ...state,
        supplySetup: {
          ...state.supplySetup,
          tiles: {
            ...state.supplySetup.tiles,
            [tileId]: {
              id: tileId,
              type: 'Gem',
              operation: 'ANY',
            },
          },
        },
      }
    }

    case ActionTypes.UPDATE_SUPPLY_TILE: {
      const { id } = action.payload

      return {
        ...state,
        supplySetup: {
          ...state.supplySetup,
          tiles: {
            ...state.supplySetup.tiles,
            [id]: action.payload,
          },
        },
      }
    }

    case ActionTypes.DELETE_SUPPLY_TILE: {
      const tileToDeleteId = action.payload
      const tiles = Object.values(state.supplySetup.tiles)

      const newTiles = tiles.filter(
        (tile: aerTypes.MarketTile) => tile.id !== tileToDeleteId
      )

      const newTilesState = newTiles.reduce(
        (tiles: types.Tiles, tile: aerTypes.MarketTile) => {
          return {
            ...tiles,
            [tile.id]: tile,
          }
        },
        {}
      )

      return {
        ...state,
        supplySetup: {
          ...state.supplySetup,
          tiles: newTilesState,
        },
      }
    }

    case ActionTypes.SET_AVAILABLE_MAGES: {
      return {
        ...state,
        availableMageIds: action.payload,
      }
    }

    case ActionTypes.SET_AVAILABLE_SUPPLY_CARDS: {
      return {
        ...state,
        availableCardIds: action.payload,
      }
    }

    case ActionTypes.SET_AVAILABLE_TREASURES: {
      return {
        ...state,
        availableTreasureIds: action.payload,
      }
    }

    case ActionTypes.SET_AVAILABLE_NEMESES: {
      return {
        ...state,
        availableNemesisIds: action.payload,
      }
    }

    case ActionTypes.SET_AVAILABLE_UBN_CARDS: {
      return {
        ...state,
        availableUpgradedBasicNemesisCardIds: action.payload,
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

export type SettingsSnapshotConfigStateSlice = {
  DraftExpedition: {
    SettingsSnapshotConfig: State
  }
}

const getSettingsSnapshotConfig = (state: SettingsSnapshotConfigStateSlice) =>
  state.DraftExpedition.SettingsSnapshotConfig

const getSupplySetupType = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.supplySetup.type
)

const getSupplySetupId = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.supplySetup.id
)

const getSupplySetupName = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.supplySetup.name
)

const getSupplyTiles = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.supplySetup.tiles
)

const getSupplyTileIds = createSelector(
  [getSupplyTiles],
  (tiles: types.Tiles) => Object.keys(tiles)
)

const getSupplyTilesArray = createSelector(
  [getSupplyTiles],
  (tiles: types.Tiles) => Object.values(tiles)
)

const getAvailableMages = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.availableMageIds
)

const getAvailableSupplyCards = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.availableCardIds
)

const getAvailableTreasures = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.availableTreasureIds
)

const getAvailableNemeses = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.availableNemesisIds
)

const getAvailableUBNCards = createSelector(
  [getSettingsSnapshotConfig],
  (settings: State) => settings.availableUpgradedBasicNemesisCardIds
)

export const selectors = {
  getSettingsSnapshotConfig,
  getSupplySetupType,
  getSupplySetupId,
  getSupplySetupName,
  getSupplyTileIds,
  getSupplyTilesArray,
  getAvailableMages,
  getAvailableSupplyCards,
  getAvailableTreasures,
  getAvailableNemeses,
  getAvailableUBNCards,
}
