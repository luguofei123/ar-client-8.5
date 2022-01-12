// http://127.0.0.1:9999/A/ar/api/sysset/arSysCommonBillType/userCommonBillType
// 获取业务经办的菜单信息
import myAxios from '../../../../service/http'
import qs from 'qs'
export const capitalApplication = {
  // 获取头部carousel数据
   getUserCommonBillType(){
    return myAxios.post('/sysset/arSysCommonBillType/userCommonBillType')
  },
  // 获取tab页签
  getArBusinssTabs(){
    return myAxios.post('/sysset/arsysdatasource/getSourceInfoByTabName/AR_BUSINESS_TABS')
  }
}
