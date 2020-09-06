import {Vue, Options} from 'vue-class-component'
import {renderSlot} from 'vue'
import {Prop} from 'vue-property-decorator'

const cssPrefix = 'v3'
export const IconName = 'V3-Icon'
export interface IconProp {
  class: string | Array<String>
}
export const IconType = {
  Arrow: 'arrow',
  Search: 'search',
  Loading: 'loading',
  Clear: 'clear'
}
export const IconTypeMap = {
  [IconType.Arrow]: [`${cssPrefix}-icon-arrow`],
  [IconType.Search]: [`${cssPrefix}-icon-zoom`],
  [IconType.Loading]: [`${cssPrefix}-icon-loading`],
  [IconType.Clear]: [`${cssPrefix}-icon-close-full`]
}

@Options ({
  name: IconName
})
export class Icon extends Vue implements IconProp {
  @Prop({default: [], type:[String, Array]}) class!: string | Array<string>

  render () {
    let cls: Array<string> = ['v3-iconfont', 'v3-icon']
    if (this.class) {
      if (Array.isArray (this.class)) {
        cls.concat (this.class)
      } else {
        cls.push (this.class)
      }
    }
    return (
      <div class={cls}>
        {renderSlot (this.$slots, 'default')}
      </div>
    )
  }
}