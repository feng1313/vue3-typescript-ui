import {Options} from 'vue-class-component'
import {Dropdown} from '../dropdown'
import {renderSlot} from 'vue'
import {Watch, Prop, Mixins} from 'vue-property-decorator'
import mitt, {Emitter} from 'mitt'
import {SelectName, EmitterType, OptionModel, OptionValue, SelectMode} from './Constants'
import {Icon, IconType, IconTypeMap} from '../icon'
import TriggerMixinHandler from '../mixins/TriggerMixinHandler'

//#region style
const cssPrefix = 'v3'
export const css = {
  select: `${cssPrefix}-select`,
  actived: `${cssPrefix}-select-actived`,
  panel: `${cssPrefix}-select-panel`,
  panelContext: `${cssPrefix}-select-panel-context`,
  panelIcon: `${cssPrefix}-select-panel-icon`
}
//#endregion

type ModelValueType = string | number | boolean | Array<string | number | boolean> | null

@Options ({
  name: SelectName,
  emits: ['update:modelValue']
})
export default class Select extends Mixins (TriggerMixinHandler){
  @Prop ({type: [String, Number]}) placeholder: string | number = '请选择'
  @Prop ({type: [String]}) icon: string = IconType.Arrow
  @Prop ({type: [Number], default: SelectMode.Single}) mode: SelectMode = SelectMode.Single
  @Prop ({type: [String, Number, Array], default: null}) modelValue!: ModelValueType

  public emitter: Emitter = mitt ()
  private optionModelList: Array<OptionModel> = []
  private selectedOptionModelList: Array<OptionModel> = []
  private panelText: string | number | null = ''

  render () {
    const className = [
      css.select,
      this.actived ? css.actived : null
    ]
    let iconClass = [css.panelIcon].concat (IconTypeMap[this.icon])
    return (
      <div class={className}>
        <div class={css.panel} onClick={this.clickHandler}>
          <div class={css.panelContext}>
            <div>{this.placeholder}{this.panelText}</div>
          </div>
          <Icon class={iconClass} />
        </div>
        <Dropdown>
          {renderSlot (this.$slots, 'default')}
        </Dropdown>
      </div>
    )
  }

  @Watch ('actived')
  activedChange (actived: boolean) {
    if (actived) {
      this.$emit ('focus')
      this.registerGlobalClick ()
    } else {
      this.$emit ('blur')
      this.clearGlobalClick ()
    }
  }

  @Watch ('selectedOptionModelList')
  selectOptionModelListChange (selectedOptionModelList: Array<OptionModel>) {
    if (selectedOptionModelList.length <= 0) {
      return
    }
    this.placeholder = ''
    this.panelText = selectedOptionModelList.map (item => item.label).join (',')
  }

  @Watch ('modelValue')
  modelValueChange (modelValue: ModelValueType) {
    if (this.optionModelList.length <= 0 || modelValue === null) {
      return
    }

    // single mode
    if (this.hasMode (SelectMode.Single)) {
      if (Array.isArray (modelValue)) {
        return
      }
      const optionModel = this.optionModelList.find (
        item => item.value.toString () === modelValue.toString ()
      )
      console.log ('single mode mdelValue changed', optionModel)
      this.selectedHandler (optionModel)
    }

    // multiple mode
    if (this.hasMode (SelectMode.Multiple)) {
      if (!Array.isArray (modelValue)) {
        return
      }
      const optionModelList = this.optionModelList.filter (
        item => modelValue.find (val => val.toString() === item.value.toString ())
      )
      console.log ('multiple mode modelValue changed', optionModelList)
      this.selectedHandler (optionModelList)
    }
  }

  hasMode (mode: SelectMode): boolean {
    return Boolean (this.mode & mode)
  }

  beforeMount () {
    this.emitter.on (EmitterType.Register, this.registerHandler)
  }

  registerHandler<T extends OptionModel> (optionModel: T) {
    this.optionModelList.push (optionModel)
  }

  mounted () {
    this.$nextTick (() => {
      this.emitter.on (EmitterType.Selected, this.selectedHandler)
      if (this.modelValue !== null) {
        this.modelValueChange (this.modelValue)
      }
    })
  }

  selectedHandler<T extends OptionModel> (optionModel: T | T[] | undefined) {
    if (typeof optionModel === 'undefined') {
      return
    }

    this.optionModelList.forEach (optionModel => optionModel.selected = false)

    if (this.hasMode (SelectMode.Single) && !Array.isArray (optionModel)) {
      const {label, value} = optionModel
      this.$emit ('change', {
        label,
        value
      } as OptionValue)
      this.actived = false
      optionModel.selected = true
      this.$emit ('update:modelValue', value)
      this.selectedOptionModelList = [optionModel]
    }

    if (this.hasMode (SelectMode.Multiple) && Array.isArray (optionModel)) {
      // this.$emit ('change', optionModel)
      // this.$emit ('update:modelValue', optionModel.map (item => item.value))
      this.selectedOptionModelList = optionModel
      this.selectedOptionModelList.forEach (item => item.selected = true)
    }
  }
}