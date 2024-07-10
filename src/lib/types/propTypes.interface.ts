export type ListStateType<T = string | number> = {
  index: number
  isEditing: boolean
  value?: T
}