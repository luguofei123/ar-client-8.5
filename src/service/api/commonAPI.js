// http://127.0.0.1:9999/A/ar/api/sysset/arSysCommonBillType/userCommonBillType
// 公共的api
import myAxios from  '../http'
import qs from 'qs'
export const commonAPI = {
  // 获取单位账套
  getAgencyList(){
    return myAxios.get('/sysset/arSysData/getAgencyList')
  },
  // 跳转制单页时获取menuid时所需要的的参数
  getHomeMenu(){
    return myAxios.get('/sysset/arsysdatasource/getSourceInfoByTabName/HOME_MENU')
  },
  // 获取系统设置信息
  getAllSysConfig(){
    return myAxios.get('/sysset/arsyssetup/getAllSysConfig')
  }
}
