export type OptionValue = {label: string | null, value: any}

//export declare type OptionModel<T extends OptionValue> = T & {selected: boolean}

export type OptionModel = OptionValue & {
  selected: boolean
}

export const EmitterType = {
  Selected: Symbol ('selected'),
  Register: Symbol ('register')
}