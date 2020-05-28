import React from 'react'
import { connect } from 'react-redux'

import * as types from 'types'

import { RootState, selectors } from 'Redux/Store'

import { saveToFile, copyToClipboard } from 'helpers'

import Button from 'components/atoms/Button'
import Wrapper from './__styled__/Wrapper'
import Pre from './__styled__/Pre'

const mapStateToProps = (state: RootState) => ({
  name: selectors.DraftExpedition.Name.getExpeditionName(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(
    state
  ),
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(
    state
  ),
})

type Props = ReturnType<typeof mapStateToProps> & {
  fileName?: string
}

const Preview = ({
  fileName = 'expedition',
  name,
  bigPocketVariantConfig,
  branches,
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

  const data = {
    name: name,
    bigPocketVariantConfig: bigPocketVariantConfig,
    sequenceConfig: {
      branches: dataBranches,
    },
  }

  const handleCopyToClipboard = () => {
    copyToClipboard(JSON.stringify(data, null, '  '))
  }

  const handleSave = () => {
    saveToFile(JSON.stringify(data, null, '  '), fileName)
  }

  return (
    <Wrapper>
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
