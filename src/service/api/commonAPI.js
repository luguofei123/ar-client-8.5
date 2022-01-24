// http://127.0.0.1:9999/A/ar/api/sysset/arSysCommonBillType/userCommonBillType
// 公共的api
import myAxios from  '../http'
import qs from 'qs'
export const commonAPI = {
  // 获取单位账套
  getAgencyList(){
    return myAxios.get('/sysset/arSysData/getAgencyList')
  },
}
