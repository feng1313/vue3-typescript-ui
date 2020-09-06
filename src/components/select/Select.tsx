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

@Options ({
  name: SelectName
})
export default class Select extends Mixins (TriggerMixinHandler){
  @Prop ({type: [String, Number]}) placeholder: string | number = '请选择'
  @Prop ({type: [String]}) icon: string = IconType.Arrow
  @Prop ({type: [Number], default: SelectMode.Single}) mode: SelectMode = SelectMode.Single

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

  isMultiple (): boolean {
    return false
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
    console.log (this.mode)
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