const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: conf => conf.resolve.alias
    .set('@', resolve('src'))
    //.set('vue', 'vue/dist/vue.esm.js'),
}