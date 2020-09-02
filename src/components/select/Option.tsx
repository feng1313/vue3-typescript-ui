import {Vue, Options} from 'vue-class-component'
import {renderSlot} from 'vue'
import {Prop, Watch} from 'vue-property-decorator'
import {Select} from '.'
import {OptionModel, EmitterType} from './Types'
import {SelectName, OptionName} from './Constants'

const css = 'v3-select-option'

@Options ({
  name: OptionName
})
export default class Option extends Vue {
  @Prop () value!: String | Number

  private selected: boolean = false

  private get optionModel (): OptionModel {
    const self = this
    return {
      label: (this.$el as Element).textContent,
      value: this.value,
      get selected (): boolean {
        return self.selected
      },
      set selected (val: boolean) {
        self.selected = val
      }
    }
  }

  render () {
    const cls = [
      css,
      this.selected ? `${css}-selected` : null
    ]
    return (
      <div class={cls} onClick={this.clickHandler}>{renderSlot (this.$slots, 'default')}</div>
    )
  }

  @Watch ('selected')
  selectedChangeHandler (selected: boolean) {
    console.log (selected)
  }

  getParent (): Select | null {
    let parent = this.$parent
    while (parent) {
      if (parent.$options.name === SelectName) {
        return parent as Select
      }
      parent = parent.$parent
    }
    return null
  }

  emit (type: symbol, optionModel: OptionModel) {
    const parent = this.getParent ()
    if (!parent) 
      return

    parent.emitter.emit (type, optionModel)
  }

  mounted () {
    this.emit (EmitterType.Register, this.optionModel)
  }

  clickHandler() {
    this.emit (EmitterType.Selected, this.optionModel)
  }
}