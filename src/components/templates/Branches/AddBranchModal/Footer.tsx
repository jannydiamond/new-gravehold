import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import * as types from 'types'

import Button from 'components/atoms/Button'

const mapStateToProps = (state: RootState) => ({
  draftBranch: selectors.DraftExpedition.SequenceConfig.DraftBranch.getDraftBranchState(
    state
  ),
  draftRewardConfigs: selectors.DraftExpedition.SequenceConfig.DraftRewardConfig.getDraftRewardConfigArray(
    state
  ),
  draftRewardSupplyCards: selectors.DraftExpedition.SequenceConfig.DraftRewardSupplyCard.getDraftRewardSupplyCardArray(
    state
  ),
})

const mapDispatchToProps = {
  addBranch: actions.DraftExpedition.SequenceConfig.Branches.addBranch,
  clearDraftBranch:
    actions.DraftExpedition.SequenceConfig.DraftBranch.clearDraftBranch,
  clearDraftRewardConfig:
    actions.DraftExpedition.SequenceConfig.DraftRewardConfig
      .clearDraftRewardConfig,
  clearDraftRewardSupplyCards:
    actions.DraftExpedition.SequenceConfig.DraftRewardSupplyCard
      .clearDraftRewardSupplyCard,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    modal: any
  }

const Footer = ({
  modal,
  draftBranch,
  draftRewardConfigs,
  draftRewardSupplyCards,
  addBranch,
  clearDraftBranch,
  clearDraftRewardConfig,
  clearDraftRewardSupplyCards,
}: Props) => {
  const handleAddBranch = () => {
    const winRewards = draftRewardConfigs.find(
      (config: types.BattleRewardConfig) => config.type === 'win'
    )

    const lossRewards = draftRewardConfigs.filter(
      (config: types.BattleRewardConfig) => config.type === 'loss'
    )

    const newBranch = {
      ...draftBranch,
      supply: {
        ...(draftBranch as types.RewardBranch).supply,
        blueprints: [
          ...draftRewardSupplyCards.filter(
            (card: types.Blueprint) => card.configId === undefined
          ),
        ],
      },
      winRewards: {
        ...winRewards,
        supply: {
          ...winRewards?.supply,
          blueprints: [
            ...draftRewardSupplyCards.filter((card: types.Blueprint) => {
              return card.configId === winRewards?._id
            }),
          ],
        },
      },
      lossRewards: [
        ...lossRewards.map((reward: types.BattleRewardConfig) => {
          return {
            ...reward,
            supply: {
              ...reward?.supply,
              blueprints: [
                ...draftRewardSupplyCards.filter((card: types.Blueprint) => {
                  return card.configId === reward?._id
                }),
              ],
            },
          }
        }),
      ],
    }

    addBranch({
      ...(newBranch as types.Branch),
    })
    clearDraftBranch()
    clearDraftRewardConfig()
    clearDraftRewardSupplyCards()
    modal.hide()
  }

  const handleCancel = () => {
    clearDraftBranch()
    clearDraftRewardConfig()
    clearDraftRewardSupplyCards()
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
