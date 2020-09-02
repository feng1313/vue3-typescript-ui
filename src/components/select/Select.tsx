import {Vue, Options} from 'vue-class-component'
import {Dropdown} from '../dropdown'
import {renderSlot} from 'vue'
import {Watch, Prop} from 'vue-property-decorator'
import mitt, {Emitter} from 'mitt'
import {EmitterType, OptionModel, OptionValue} from './Types'
import {SelectName} from './Constants'

const cssPrefix = 'v3'
const css = {
  select: `${cssPrefix}-select`,
  actived: `${cssPrefix}-select-actived`,
  panel: `${cssPrefix}-select-panel`,
  panelContext: `${cssPrefix}-select-panel-context`,
  panelIcon: `${cssPrefix}-select-panel-icon`
}

@Options ({
  name: SelectName,
  emits: ['change', 'blur', 'focus']
})
export default class Select extends Vue {
  @Prop ({type: [String, Number]}) placeholder: string | number = '请选择'

  private actived: Boolean = false
  public emitter: Emitter = mitt ()
  private optionModelList: Array<OptionModel> = []
  private selectedOptionModelList: Array<OptionModel> = []
  private panelText: string | number | null = ''

  render () {
    const className = [
      css.select,
      this.actived ? css.actived : null
    ]
    return (
      <div class={className}>
        <div class={css.panel} onClick={this.clickHandler}>
          <div class={css.panelContext}>
            <div>{this.placeholder}{this.panelText}</div>
          </div>
          <div class={css.panelIcon}></div>
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

  clickHandler () {
    this.actived = true
  }

  registerGlobalClick () {
    document.addEventListener ('click', this.triggerHandler)
  }

  clearGlobalClick () {
    document.removeEventListener ('click', this.triggerHandler)
  }

  triggerHandler (event: Event) {
    const targetEl = event.target as HTMLElement
    if (!this.isDescendant (this.$el, targetEl)) {
      this.actived = false
    }
  }

  isDescendant (parent: Element, child: Element) {
    var node = child.parentNode
    while ( node != null ) {
      if ( node == parent )
        return true

      node = node.parentNode
    }
    return false
  }
}