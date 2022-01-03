import Vue from 'vue'
import moment from 'moment'
import  {isEmpty} from '../utils/String'

// 金额格式
Vue.filter('moneyFormat', num => {
  if (isNaN(num) && !(num + '').includes(',')) {
    return '0.00'
  } else {
    if (num !== null && num !== '') {
      num = (num + '').replace(/,/g, '')
      num = Number(num)
      num = (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }
    return num
  }
})
Vue.filter('timestampToTime',(timestamp,item)=>{
  debugger
  if(isEmpty(timestamp)) return ''
  if(item.dataType === '08'){
    return moment(timestamp).format('YYYY-MM-DD')
  }
  if(item.dataType === '10'){
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
})