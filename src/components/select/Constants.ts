export const SelectName = 'Select'
export const OptionName = 'Option'
export type OptionValue = {label: string | null, value: any}
export type OptionModel = OptionValue & {
  selected: boolean
}
export const EmitterType = {
  Selected: Symbol ('selected'),
  Register: Symbol ('register')
}
export enum SelectMode {
  /**
   * @param 单选(默认)
   */
  Single = 1 << 0,

  /**
   * @param 多选
   */
  Multiple = 1 << 1,

  /**
   * @param 开启搜索模式
   */
  Search = 1 << 2,

  /**
   * @param 开启清除模式
   */
  Clear = 1 << 3
}
