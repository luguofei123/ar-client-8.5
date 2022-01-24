// http://127.0.0.1:9999/A/ar/api/sysset/arSysCommonBillType/userCommonBillType
// 获取业务经办的菜单信息
import myAxios from '../../../../service/http'
import qs from 'qs'
export const myBill = {
  // 获取头部carousel数据
  queryTypeByPtype(parma){
    return myAxios.get('/typeset/artype/queryTypeByPtype',{params:parma})
  },
  // 获取tab页签
  getTabAndCol(){
    return myAxios.get('/sysset/arsystabcol/getTabAndCol/AR_BILL')
  },
  // 获取表格列和搜索
  getTableColumnOrSeachCloumn(obj,type){
    return myAxios.get(`/sysset/arsystabcol/getTabSet?pageId=${obj.pageId}&tabId=${obj.id}&type=${type}`)
  },
  // 获取table数据
  getTableData(param){
    return myAxios.post('/bill/arBill/getArBillAll',param)
  },
  // 获取支付状态
  getPayStatus(type){
    return myAxios.get(`/sysset/arsysdatasource/getSourceInfoByTabName/${type}`)
  }
}
