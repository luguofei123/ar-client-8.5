import Vue from 'vue'
import Vuex from 'vuex'
// 引入相应，模块
import arBill from '@/store/modules/arBill/index'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    arBill: arBill
  }
})
