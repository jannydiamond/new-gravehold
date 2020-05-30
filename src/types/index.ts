import { RenderModalType } from 'hooks/useModal'

export type Modal = {
  RenderModal: RenderModalType
  show: () => void
  hide: () => void
}

// Branches

export const BRANCH_TYPES = [
  'narrative', 
  'battle', 
  'reward'
] as const

export type BranchType = typeof BRANCH_TYPES[number]

export type Decision = {
  _id: string
  text: string
}

export type BranchBase = {
  _id: string
  id: string
  type: BranchType
}

export type NarrativeBranch = BranchBase & {
  type: BranchType
  text: string
  decisions: Decision[] | false
  nextBranchId?: string[]
}

export type Branch = NarrativeBranch

export type Branches = {
  [id: string]: Branch
}

export type BranchTypeOption = {
  value: BranchType
  label: string
}

export type BranchTypeOptions = BranchTypeOption[]

export type SelectOption = {
  value: string
  label: string
}

export type SelectOptions = SelectOption[]
