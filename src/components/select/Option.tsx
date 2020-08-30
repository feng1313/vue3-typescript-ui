import {Vue, Options} from 'vue-class-component'
import {renderSlot} from 'vue'
import {Prop} from 'vue-property-decorator'

const css = 'v3-select-option'

@Options ({
  name: 'V3-Option'
})
export default class Option extends Vue {
  @Prop () value!: String | Number

  render () {
    return (
      <div class={css} onClick={this.handlerClick}>{renderSlot (this.$slots, 'default')}</div>
    )
  }

  handlerClick () {
    this.$emit ('selected', {
      label: this.$el.textContext,
      value: this.value
    })
  }
}