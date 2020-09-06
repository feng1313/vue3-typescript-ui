import {Options, Vue} from 'vue-class-component'
import {InputName} from '../Constants'

@Options ({
  name: InputName
})
export default class Input extends Vue {
  render () {
    return (
      <input class='v3-input' type='text' />
    )
  }
}