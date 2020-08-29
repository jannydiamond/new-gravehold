import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import * as types from 'types'

import Button from 'components/atoms/Button'

const mapStateToProps = (state: RootState) => ({
  rewardConfigs: selectors.DraftExpedition.SequenceConfig.DraftRewardConfig.getDraftRewardConfigArray(
    state
  ),
  rewardSupplyCards: selectors.DraftExpedition.SequenceConfig.DraftRewardSupplyCard.getDraftRewardSupplyCardArray(
    state
  ),
})

const mapDispatchToProps = {
  addBattleBranch:
    actions.DraftExpedition.SequenceConfig.Branches.addBattleBranch,
  clearDraftRewardConfig:
    actions.DraftExpedition.SequenceConfig.DraftRewardConfig
      .clearDraftRewardConfig,
  clearDraftRewardSupplyCard:
    actions.DraftExpedition.SequenceConfig.DraftRewardSupplyCard
      .clearDraftRewardSupplyCard,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    modal: any
    branch: types.BattleBranch
    initialBranch: types.BattleBranch
    setBranch: (branch: types.BattleBranch) => void
  }

const Footer = ({
  modal,
  branch,
  initialBranch,
  rewardConfigs,
  rewardSupplyCards,
  setBranch,
  addBattleBranch,
  clearDraftRewardConfig,
  clearDraftRewardSupplyCard,
}: Props) => {
  const winRewards = rewardConfigs.find(
    (config: types.BattleRewardConfig) => config.type === 'win'
  )

  const lossRewards = rewardConfigs.filter(
    (config: types.BattleRewardConfig) => config.type === 'loss'
  )

  const handleAddBranch = () => {
    const newBranch = branch

    if (winRewards) {
      Object.assign(newBranch, {
        winRewards: {
          ...(winRewards as types.RewardConfig),
          supply: {
            ...winRewards?.supply,
            blueprints: [
              ...rewardSupplyCards.filter((card: types.Blueprint) => {
                return card.configId === winRewards?._id
              }),
            ],
          },
        },
      })
    }

    if (lossRewards.length > 0) {
      Object.assign(newBranch, {
        lossRewards: [
          ...lossRewards.map((reward: types.BattleRewardConfig) => {
            return {
              ...reward,
              supply: {
                ...reward?.supply,
                blueprints: [
                  ...rewardSupplyCards.filter((card: types.Blueprint) => {
                    return card.configId === reward?._id
                  }),
                ],
              },
            }
          }),
        ],
      })
    }

    addBattleBranch(newBranch)

    clearDraftRewardConfig()
    clearDraftRewardSupplyCard()
    setBranch(initialBranch)
    modal.hide()
  }

  const handleCancel = () => {
    clearDraftRewardConfig()
    clearDraftRewardSupplyCard()
    setBranch(initialBranch)
    modal.hide()
  }

  return (
    <>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleAddBranch}>Add branch</Button>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Footer))
