import {Vue, Options} from 'vue-class-component'

@Options ({
  name: 'HelloWorld'
})
export default class HelloWorld extends Vue {
  render () {
    return <div>hello world ...</div>
  }
}