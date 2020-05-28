import { RenderModalType } from 'hooks/useModal'
import * as aerTypes from 'aer-types'

export type Modal = {
  RenderModal: RenderModalType
  show: () => void
  hide: () => void
}

// Branches

export const BRANCH_TYPES = ['narrative', 'battle', 'reward'] as const

export type BranchType = typeof BRANCH_TYPES[number]

export type BranchBase = {
  _id: string
  id: string
  type: BranchType
}

// NarrativeBranch

export type Decision = {
  _id: string
  text: string
}

export type NarrativeBranch = BranchBase & {
  type: BranchType
  text: string
  decisions: Decision[] | false
  nextBranchId?: string[]
}

// RewardBranch

export type RandomTreasure = {
  random: boolean
  level: aerTypes.TreasureLevel
}

export type RandomMage = {
  random: boolean
}

export type SupplyCardType = 'Gem' | 'Relic' | 'Spell'
export type SupplyCardOperation = '<' | '>' | '=' | '<=' | '>=' | 'ANY' | 'OR'

export type Blueprint = {
  _id: string
  type: SupplyCardType
  operation: SupplyCardOperation
  threshold?: number
  values?: number[]
}

export type RewardType = 'regular' | 'custom'

export type RewardBranch = BranchBase & {
  type: BranchType
  rewardType: RewardType
  treasure: {
    ids: (string | RandomTreasure)[]
    tier1: number
    tier2: number
    tier3: number
  }
  mage: {
    ids: (string | RandomMage)[]
    randomAmount: number
  }
  supply: {
    ids: (string | Blueprint)[]
    blueprints: Blueprint[]
    bigPocket?: boolean
  }
  nextBranchId?: string
}

// Branch

export type Branch = NarrativeBranch | RewardBranch

export type Branches = {
  [id: string]: Branch
}

// Select options

export type BranchTypeOption = {
  value: BranchType
  label: string
}

export type BranchTypeOptions = BranchTypeOption[]

export type CardTypeOption = {
  value: SupplyCardType
  label: string
}

export type CardTypeOptions = CardTypeOption[]

export type CardOperationOption = {
  value: SupplyCardOperation
  label: string
}

export type CardOperationOptions = CardOperationOption[]

export type CardCostsOption = {
  value: string
  label: string
}

export type CardCostsOptions = CardCostsOption[]

export type SelectOption = {
  value: string
  label: string
}

export type SelectOptions = SelectOption[]
