import {Vue, Options} from 'vue-class-component'
import {Dropdown} from '../dropdown'
import {renderSlot} from 'vue'
import {Watch} from 'vue-property-decorator'

const cssPrefix = 'v3'
const css = {
  select: `${cssPrefix}-select`,
  actived: `${cssPrefix}-select-actived`,
  panel: `${cssPrefix}-select-panel`,
  panelContext: `${cssPrefix}-select-panel-context`,
  panelIcon: `${cssPrefix}-select-panel-icon`
}

@Options ({
  name: 'V3-Select',
  emits: {
    selected ({label, value}) {
      console.log (label, value)
    }
  }
})
export default class Select extends Vue {
  private actived: boolean = false

  render () {
    const className = [
      css.select,
      this.actived ? css.actived : null
    ]
    return (
      <div class={className}>
        <div class={css.panel} onClick={this.clickHandler}>
          <div class={css.panelContext}></div>
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