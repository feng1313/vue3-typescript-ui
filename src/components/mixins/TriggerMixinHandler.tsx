import {Options, Vue} from 'vue-class-component'

@Options ({
  emits: ['change', 'blur', 'focus']
})
export default class TriggerMixinHandler extends Vue {
  actived: Boolean = false

  isDescendant (parent: Element, child: Element) {
    var node = child.parentNode
    while ( node != null ) {
      if ( node == parent )
        return true

      node = node.parentNode
    }
    return false
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
  
  clickHandler () {
    this.actived = true
  }
}