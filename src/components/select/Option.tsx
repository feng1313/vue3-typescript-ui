import {Vue, Options} from 'vue-class-component'
import { renderSlot } from 'vue'

const css = 'v3-select-option'

@Options ({
  name: 'V3-Option'
})
export default class Option extends Vue {
  render () {
    return (
      <div class={css}>{renderSlot (this.$slots, 'default')}</div>
    )
  }
}