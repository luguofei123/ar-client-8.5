
// 单据详情
import myAxios from '../../service/http'
import qs from 'qs'
export const arBillAPI = {
  // 获取头部carousel数据
   getBillTemplate(param){
    return myAxios.post('/tplset/arTplBuild/tpl', param)
  }
}
