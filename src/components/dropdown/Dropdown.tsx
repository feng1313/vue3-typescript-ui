import {Vue, Options} from 'vue-class-component'

const cssPrefix = 'v3'
const css = {
  dropdown: `${cssPrefix}-dropdown`
}

@Options ({
  name: 'V3-Dropdown'
})
export default class Dropdown extends Vue {
  render () {
    return (
      <div class={css.dropdown} v-slots={this.$slots}>
        <slot></slot>
      </div>
    )
  }
}