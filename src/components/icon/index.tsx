import {Vue, Options} from 'vue-class-component'
import {renderSlot} from 'vue'
import {Prop} from 'vue-property-decorator'

export const IconName = 'V3-Icon'
export interface IconProp {
  class: string | Array<String>
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