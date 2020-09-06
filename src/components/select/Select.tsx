import {Options} from 'vue-class-component'
import {Dropdown} from '../dropdown'
import {renderSlot} from 'vue'
import {Watch, Prop, Mixins} from 'vue-property-decorator'
import mitt, {Emitter} from 'mitt'
import {EmitterType, OptionModel, OptionValue} from './Types'
import {SelectName} from './Constants'
import {Icon} from '../icon'
import TriggerMixinHandler from '../mixins/TriggerMixinHandler'

export enum IconType {
  ARROW = 'arrow',
  SEARCH = 'search',
  LOADING = 'loading',
  CLEAR = 'clear'
}

const cssPrefix = 'v3'
const css = {
  select: `${cssPrefix}-select`,
  actived: `${cssPrefix}-select-actived`,
  panel: `${cssPrefix}-select-panel`,
  panelContext: `${cssPrefix}-select-panel-context`,
  panelIcon: `${cssPrefix}-select-panel-icon`
}
const iconTypeMap = {
  [IconType.ARROW]: [`${cssPrefix}-icon-arrow`],
  [IconType.SEARCH]: [`${cssPrefix}-icon-zoom`],
  [IconType.LOADING]: [`${cssPrefix}-icon-loading`],
  [IconType.CLEAR]: [`${cssPrefix}-icon-close-full`]
}

@Options ({
  name: SelectName
})
export default class Select extends Mixins (TriggerMixinHandler){
  @Prop ({type: [String, Number]}) placeholder: string | number = '请选择'
  @Prop ({type: [String]}) icon: IconType = IconType.ARROW

  public emitter: Emitter = mitt ()
  private optionModelList: Array<OptionModel> = []
  private selectedOptionModelList: Array<OptionModel> = []
  private panelText: string | number | null = ''

  render () {
    const className = [
      css.select,
      this.actived ? css.actived : null
    ]
    let iconClass = [css.panelIcon].concat (iconTypeMap[this.icon])
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
  selectOptionModelListChange (list: Array<OptionModel>) {
    if (list.length <= 0)
      return
    this.placeholder = ''
    this.panelText = list[0].label
  }

  beforeMount () {
    this.emitter.on (EmitterType.Register, this.registerHandler)
  }

  registerHandler<T extends OptionModel> (optionModel: T) {
    this.optionModelList.push (optionModel)
  }

  mounted () {
    this.$nextTick (() => this.emitter.on (EmitterType.Selected, this.selectedHandler))
  }

  selectedHandler<T extends OptionModel> (optionModel: T) {
    const {label, value} = optionModel
    this.$emit ('change', {
      label,
      value
    } as OptionValue)
    this.actived = false
    this.optionModelList.forEach (optionModel => optionModel.selected = false)
    optionModel.selected = true
    this.selectedOptionModelList = [optionModel]
  }
}