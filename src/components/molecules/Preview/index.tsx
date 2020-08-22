import React from 'react'
import { connect } from 'react-redux'

import * as aerTypes from 'aer-types'
import * as types from 'types'

import { RootState, selectors } from 'Redux/Store'

import { saveToFile, copyToClipboard } from 'helpers'

import Button from 'components/atoms/Button'
import Wrapper from './__styled__/Wrapper'
import Pre from './__styled__/Pre'

const mapStateToProps = (state: RootState) => ({
  name: selectors.DraftExpedition.Name.getExpeditionName(state),
  seed: selectors.DraftExpedition.SeedConfig.getSeed(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(
    state
  ),
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(
    state
  ),
  firstBranchId: selectors.DraftExpedition.SequenceConfig.FirstBranchId.getFirstBranchId(
    state
  ),
  initialBarracks: selectors.DraftExpedition.InitialBarracksConfig.getInitialBarracksConfig(
    state
  ),
  initialUBNCards: selectors.DraftExpedition.InitialUBNCardsConfig.getInitialUBNCardsConfig(
    state
  ),
  settingsSnapshot: selectors.DraftExpedition.SettingsSnapshotConfig.getSettingsSnapshotConfig(
    state
  ),
})

type Props = ReturnType<typeof mapStateToProps> & {
  fileName?: string
}

const Preview = ({
  fileName = 'expedition',
  name,
  seed,
  bigPocketVariantConfig,
  firstBranchId,
  branches,
  initialBarracks,
  initialUBNCards,
  settingsSnapshot,
}: Props) => {
  const dataBranches = branches.reduce((branches, branch: types.Branch) => {
    switch (branch.type) {
      case 'narrative': {
        const narrativeBranch = branch as types.NarrativeBranch

        const newBranch = {
          type: branch.type,
          config: {
            text: narrativeBranch.text,
            decisions: narrativeBranch.decisions
              ? narrativeBranch.decisions.map((decision) => decision.text)
              : false,
          },
        }

        if (narrativeBranch.nextBranchId) {
          Object.assign(newBranch, {
            nextBranchId: narrativeBranch.nextBranchId,
          })
        }

        return {
          ...branches,
          [branch.id]: newBranch,
        }
      }

      case 'reward': {
        const rewardBranch = branch as types.RewardBranch

        const newBranch = {
          type: branch.type,
          config: {
            type: rewardBranch.rewardType,
          },
        }

        const randomTreasuresTier1 =
          rewardBranch.treasure.tier1 !== 0
            ? Array(rewardBranch.treasure.tier1).fill({
                random: true,
                level: 1,
              })
            : []

        const randomTreasuresTier2 =
          rewardBranch.treasure.tier2 !== 0
            ? Array(rewardBranch.treasure.tier2).fill({
                random: true,
                level: 2,
              })
            : []

        const randomTreasuresTier3 =
          rewardBranch.treasure.tier3 !== 0
            ? Array(rewardBranch.treasure.tier3).fill({
                random: true,
                level: 3,
              })
            : []

        if (
          rewardBranch.treasure.ids.length > 0 ||
          randomTreasuresTier1.length > 0 ||
          randomTreasuresTier2.length > 0 ||
          randomTreasuresTier3.length > 0
        ) {
          Object.assign(newBranch.config, {
            treasure: {
              ids: [
                ...rewardBranch.treasure.ids,
                ...randomTreasuresTier1,
                ...randomTreasuresTier2,
                ...randomTreasuresTier3,
              ],
            },
          })
        }

        const randomMageAmount =
          rewardBranch.mage.randomAmount !== 0
            ? Array(rewardBranch.mage.randomAmount).fill({
                random: true,
              })
            : []

        if (rewardBranch.mage.ids.length > 0 || randomMageAmount.length > 0) {
          Object.assign(newBranch.config, {
            mage: {
              ids: [...rewardBranch.mage.ids, ...randomMageAmount],
            },
          })
        }

        if (
          rewardBranch.supply.ids.length > 0 ||
          rewardBranch.supply.blueprints.length > 0
        ) {
          const blueprints = rewardBranch.supply.blueprints.map(
            (blueprint: types.Blueprint) => {
              return {
                type: blueprint.type,
                operation: blueprint.operation,
                threshold: blueprint.threshold,
                values: blueprint.values,
              }
            }
          )

          Object.assign(newBranch.config, {
            supply: {
              ids: [...rewardBranch.supply.ids, ...blueprints],
              bigPocket: rewardBranch.supply.bigPocket,
            },
          })
        }

        if (rewardBranch.nextBranchId) {
          Object.assign(newBranch, {
            nextBranchId: rewardBranch.nextBranchId,
          })
        }

        return {
          ...branches,
          [branch.id]: newBranch,
        }
      }

      case 'battle': {
        const battleBranch = branch as types.BattleBranch

        const newBranch = {
          type: branch.type,
          config: {
            tier: battleBranch.tier,
            newUBNCards: battleBranch.newUBNCards,
            treasure: {
              level: battleBranch.treasure.level,
              hasTreasure: battleBranch.treasure.hasTreasure,
            },
          },
        }

        battleBranch.newUBNCards.type === 'regular' &&
          Object.assign(newBranch.config.newUBNCards, {
            addRandom: battleBranch.newUBNCards?.addRandom ?? true,
          })

        battleBranch.nemesisId &&
          Object.assign(newBranch.config, {
            nemesisId: battleBranch.nemesisId,
          })

        battleBranch.specialRules &&
          Object.assign(newBranch.config, {
            specialRules: battleBranch.specialRules,
          })

        battleBranch.onLoss &&
          Object.assign(newBranch.config, {
            onLoss: battleBranch.onLoss,
          })

        if (battleBranch?.winRewards?.hasOwnProperty('rewardType')) {
          const winRewardTreasure = {}
          const winRewardMage = {}
          const winRewardSupply = {}

          const winRewardTreasureIds =
            battleBranch.winRewards?.treasure?.ids ?? []

          const winRewardRandomTreasuresTier1 =
            battleBranch.winRewards?.treasure?.tier1 &&
            battleBranch.winRewards?.treasure?.tier1 !== 0
              ? Array(battleBranch.winRewards.treasure.tier1).fill({
                  random: true,
                  level: 1,
                })
              : []

          const winRewardRandomTreasuresTier2 =
            battleBranch.winRewards?.treasure?.tier2 &&
            battleBranch.winRewards?.treasure?.tier2 !== 0
              ? Array(battleBranch.winRewards.treasure.tier2).fill({
                  random: true,
                  level: 2,
                })
              : []

          const winRewardRandomTreasuresTier3 =
            battleBranch.winRewards?.treasure?.tier3 &&
            battleBranch.winRewards?.treasure?.tier3 !== 0
              ? Array(battleBranch.winRewards.treasure.tier3).fill({
                  random: true,
                  level: 3,
                })
              : []

          if (
            winRewardTreasureIds.length > 0 ||
            winRewardRandomTreasuresTier1.length > 0 ||
            winRewardRandomTreasuresTier2.length > 0 ||
            winRewardRandomTreasuresTier3.length > 0
          ) {
            Object.assign(winRewardTreasure, {
              ids: [
                ...winRewardTreasureIds,
                ...winRewardRandomTreasuresTier1,
                ...winRewardRandomTreasuresTier2,
                ...winRewardRandomTreasuresTier3,
              ],
            })
          }

          const winRewardMageIds = battleBranch.winRewards?.mage?.ids ?? []

          const winRewardRandomMageAmount =
            battleBranch.winRewards?.mage?.randomAmount &&
            battleBranch.winRewards?.mage?.randomAmount !== 0
              ? Array(battleBranch.winRewards.mage.randomAmount).fill({
                  random: true,
                })
              : []

          if (
            winRewardMageIds.length > 0 ||
            winRewardRandomMageAmount.length > 0
          ) {
            Object.assign(winRewardMage, {
              ids: [...winRewardMageIds, ...winRewardRandomMageAmount],
            })
          }

          const winRewardSupplyIds = battleBranch.winRewards?.supply?.ids ?? []
          const winRewardSupplyBlueprints =
            battleBranch.winRewards?.supply?.blueprints ?? []
          const winRewardSupplyBigPocket =
            battleBranch.winRewards?.supply?.bigPocket ?? false

          if (
            winRewardSupplyIds.length > 0 ||
            winRewardSupplyBlueprints.length > 0
          ) {
            const blueprints = winRewardSupplyBlueprints.map(
              (blueprint: types.Blueprint) => {
                return {
                  type: blueprint.type,
                  operation: blueprint.operation,
                  threshold: blueprint.threshold,
                  values: blueprint.values,
                }
              }
            )

            Object.assign(winRewardSupply, {
              ids: [...winRewardSupplyIds, ...blueprints],
              bigPocket: winRewardSupplyBigPocket,
            })
          }

          Object.assign(newBranch.config, {
            winRewards:
              Object.keys(battleBranch.winRewards).length > 0
                ? {
                    type: battleBranch.winRewards.rewardType,
                    treasure:
                      Object.keys(winRewardTreasure).length > 0
                        ? winRewardTreasure
                        : undefined,
                    mage:
                      Object.keys(winRewardMage).length > 0
                        ? winRewardMage
                        : undefined,
                    supply:
                      Object.keys(winRewardSupply).length > 0
                        ? winRewardSupply
                        : undefined,
                  }
                : undefined,
          })
        }

        battleBranch.lossRewards &&
          Object.assign(newBranch.config, {
            lossRewards:
              battleBranch.lossRewards.length > 0
                ? battleBranch.lossRewards.map(
                    (lossReward: types.RewardConfig) => {
                      const lossRewardTreasure = {}
                      const lossRewardMage = {}
                      const lossRewardSupply = {}

                      const lossRewardTreasureIds =
                        lossReward?.treasure?.ids ?? []

                      const lossRewardRandomTreasuresTier1 =
                        lossReward?.treasure?.tier1 &&
                        lossReward?.treasure?.tier1 !== 0
                          ? Array(lossReward.treasure.tier1).fill({
                              random: true,
                              level: 1,
                            })
                          : []

                      const lossRewardRandomTreasuresTier2 =
                        lossReward?.treasure?.tier2 &&
                        lossReward?.treasure?.tier2 !== 0
                          ? Array(lossReward.treasure.tier2).fill({
                              random: true,
                              level: 2,
                            })
                          : []

                      const lossRewardRandomTreasuresTier3 =
                        lossReward?.treasure?.tier3 &&
                        lossReward?.treasure?.tier3 !== 0
                          ? Array(lossReward.treasure.tier3).fill({
                              random: true,
                              level: 3,
                            })
                          : []

                      if (
                        lossRewardTreasureIds.length > 0 ||
                        lossRewardRandomTreasuresTier1.length > 0 ||
                        lossRewardRandomTreasuresTier2.length > 0 ||
                        lossRewardRandomTreasuresTier3.length > 0
                      ) {
                        Object.assign(lossRewardTreasure, {
                          ids: [
                            ...lossRewardTreasureIds,
                            ...lossRewardRandomTreasuresTier1,
                            ...lossRewardRandomTreasuresTier2,
                            ...lossRewardRandomTreasuresTier3,
                          ],
                        })
                      }

                      const lossRewardMageIds = lossReward?.mage?.ids ?? []

                      const lossRewardRandomMageAmount =
                        lossReward?.mage?.randomAmount &&
                        lossReward?.mage?.randomAmount !== 0
                          ? Array(lossReward.mage.randomAmount).fill({
                              random: true,
                            })
                          : []

                      if (
                        lossRewardMageIds.length > 0 ||
                        lossRewardRandomMageAmount.length > 0
                      ) {
                        Object.assign(lossRewardMage, {
                          ids: [
                            ...lossRewardMageIds,
                            ...lossRewardRandomMageAmount,
                          ],
                        })
                      }

                      const lossRewardSupplyIds = lossReward?.supply?.ids ?? []
                      const lossRewardSupplyBlueprints =
                        lossReward?.supply?.blueprints ?? []
                      const lossRewardSupplyBigPocket =
                        lossReward?.supply?.bigPocket ?? false

                      if (
                        lossRewardSupplyIds.length > 0 ||
                        lossRewardSupplyBlueprints.length > 0
                      ) {
                        const blueprints = lossRewardSupplyBlueprints.map(
                          (blueprint: types.Blueprint) => {
                            return {
                              type: blueprint.type,
                              operation: blueprint.operation,
                              threshold: blueprint.threshold,
                              values: blueprint.values,
                            }
                          }
                        )

                        Object.assign(lossRewardSupply, {
                          ids: [...lossRewardSupplyIds, ...blueprints],
                          bigPocket: lossRewardSupplyBigPocket,
                        })
                      }

                      return {
                        type: lossReward.rewardType,
                        treasure:
                          Object.keys(lossRewardTreasure).length > 0
                            ? lossRewardTreasure
                            : undefined,
                        mage:
                          Object.keys(lossRewardMage).length > 0
                            ? lossRewardMage
                            : undefined,
                        supply:
                          Object.keys(lossRewardSupply).length > 0
                            ? lossRewardSupply
                            : undefined,
                      }
                    }
                  )
                : undefined,
          })

        if (battleBranch.nextBranchId) {
          Object.assign(newBranch, {
            nextBranchId: battleBranch.nextBranchId,
          })
        }

        return {
          ...branches,
          [branch.id]: newBranch,
        }
      }

      default: {
        return {
          ...branches,
          [branch.id]: {
            type: branch.type,
          },
        }
      }
    }
  }, {})

  const dataSupplyTiles = Object.values(settingsSnapshot.supplySetup.tiles).map(
    (tile: aerTypes.MarketTile) => {
      const newTile = {
        type: tile.type,
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

      return newTile
    }
  )

  const data = {
    name: name,
    bigPocketVariantConfig: bigPocketVariantConfig,
    sequenceConfig: {
      firstBranchId: firstBranchId ? firstBranchId : '',
      branches: dataBranches,
    },
    settingsSnapshotConfig: {
      ...settingsSnapshot,
      supplySetup: {
        ...settingsSnapshot.supplySetup,
        tiles: dataSupplyTiles,
      },
    },
  }

  seed !== '' &&
    Object.assign(data, {
      seedConfig: seed,
    })

  firstBranchId &&
    Object.assign(data.sequenceConfig, {
      firstBranchId: firstBranchId,
    })

  if (
    initialBarracks.mageIds.length ||
    initialBarracks.supplyIds.length ||
    initialBarracks.treasureIds.length
  ) {
    Object.assign(data, {
      initialBarracksConfig: {
        mageIds: initialBarracks.mageIds,
        supplyIds: initialBarracks.supplyIds,
        treasureIds: initialBarracks.treasureIds,
      },
    })
  }

  initialUBNCards.length &&
    Object.assign(data, {
      initialUBNCardsConfig: initialUBNCards,
    })

  const handleCopyToClipboard = () => {
    copyToClipboard(JSON.stringify(data, null, '  '))
  }

  const handleSave = () => {
    saveToFile(JSON.stringify(data, null, '  '), fileName)
  }

  return (
    <Wrapper>
      <Button type="button" onClick={handleCopyToClipboard}>
        Copy to clipboard
      </Button>
      <Button type="button" onClick={handleSave}>
        Save to file
      </Button>

      <Pre>{JSON.stringify(data, null, '  ')}</Pre>

      <Button type="button" onClick={handleCopyToClipboard}>
        Copy to clipboard
      </Button>
      <Button type="button" onClick={handleSave}>
        Save to file
      </Button>
    </Wrapper>
  )
}

export default connect(mapStateToProps)(React.memo(Preview))
