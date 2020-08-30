import {Vue, Options} from 'vue-class-component'
import {Dropdown} from '../dropdown'

const cssPrefix = 'v3'
const css = {
  select: `${cssPrefix}-select`,
  panel: `${cssPrefix}-select-panel`,
  panelContext: `${cssPrefix}-select-panel-context`,
  panelIcon: `${cssPrefix}-select-panel-icon`
}

@Options ({
  name: 'V3-Select'
})
export default class Select extends Vue {
  render () {
    return (
      <div class={css.select}>
        <div class={css.panel}>
          <div class={css.panelContext}></div>
          <div class={css.panelIcon}></div>
        </div>
        <Dropdown v-slots={this.$slots}></Dropdown>
      </div>
    )
  }

  mounted () {
    this.$nextTick (() => {
      console.log (this.$slots)
    })
  }
}