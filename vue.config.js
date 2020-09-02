const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: conf => {
      conf.resolve.alias
        .set('@', resolve('src'))

      //conf.resolve.extensions.store.add('.d.ts')

      //console.log(conf.resolve.extensions.store)
    }
    //.set('vue', 'vue/dist/vue.esm.js'),
}