import {defineComponent} from 'vue'
import {Select, Option} from '@/components/select'
import '@/components/style/index.less'

export default defineComponent ({
  data () {
    return {
      list: [
        {name: 'aaa', id: 1},
        {name: 'bbb', id: 2},
        {name: 'ccc', id: 3},
        {name: 'ddd', id: 4},
        {name: 'eee', id: 6},
        {name: 'fff', id: 5},
        {name: 'ggg', id: 7},
        {name: 'aaa', id: 8},
        {name: 'aaa', id: 9},
        {name: 'aaa', id: 10},
        {name: 'aaa', id: 11},
        {name: 'aaa', id: 12},
        {name: 'aaa', id: 13},
        {name: 'aaa', id: 14},
        {name: 'aaa', id: 15},
        {name: 'aaa', id: 16}
      ]
    }
  },
  render () {
    console.log (this)
    return (
      <div>
        <Select>
          {/* @ts-ignore */}
          {this.list.map (item => <Option onSelected={a => console.log (a)}>{item.name}</Option>)}
        </Select>
      </div>
    )
  }
})