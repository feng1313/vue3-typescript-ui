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
      <div class={css} onClick={this.clickHandler}>{renderSlot (this.$slots, 'default')}</div>
    )
  }

  clickHandler() {
    let parent = this.$parent
    while (parent) {
      if (parent.$options.name == 'V3-Select') {
        parent.$emit.apply (parent, ['selected', {
          label: (this.$el as Element).textContent,
          value: this.value
        }])
        return
      }
      parent = parent.$parent
    }
  }
}