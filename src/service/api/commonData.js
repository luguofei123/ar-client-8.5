

export const getCommonData = () =>{
  let _commonData = null
  _commonData = JSON.parse(localStorage.getItem('commonData'))
  if(_commonData){
    _commonData.svFiscalPeriod = Base64.decode(_commonData.svFiscalPeriod)
    _commonData.svDistCode = Base64.decode(_commonData.svDistCode)
    _commonData.svMenuId = Base64.decode(_commonData.svMenuId)
    _commonData.svRgCode = Base64.decode(_commonData.svRgCode)
    _commonData.svRgName = Base64.decode(_commonData.svRgName)
    _commonData.svRoleCode = Base64.decode(_commonData.svRoleCode)
    _commonData.svRoleId = Base64.decode(_commonData.svRoleId)
    _commonData.svRoleName = Base64.decode(_commonData.svRoleName)
    _commonData.svSetYear = Base64.decode(_commonData.svSetYear)
    _commonData.svTransDate = Base64.decode(_commonData.svTransDate)
    _commonData.svUserCode = Base64.decode(_commonData.svUserCode)
    _commonData.svUserId = Base64.decode(_commonData.svUserId)
    _commonData.svUserName = Base64.decode(_commonData.svUserName)
    _commonData.svAgencyName = Base64.decode(_commonData.svAgencyName)
    _commonData.svAgencyCode = Base64.decode(_commonData.svAgencyCode)
    _commonData.svAcctName = Base64.decode(_commonData.svAcctName)
    _commonData.svSysDate = Base64.decode(_commonData.svSysDate)
    _commonData.svSnum = Base64.decode(_commonData.svSnum)
    _commonData.token = Base64.decode(_commonData.token)
    if (_commonData.orgCode !== undefined) {
      _commonData.orgCode = Base64.decode(_commonData.orgCode)
    }
  }else {
    _commonData = {
      svAcctCode: "001",
      svAcctName: "行政账",
      svAgencyCode: "999001",
      svAgencyName: "汉东省水利厅本级",
      svDistCode: "000000",
      svDistName: "默认区划",
      svFiscalPeriod: "1",
      svIsPower: "0",
      svMenuId: null,
      svRgCode: "87",
      svRgName: "",
      svRoleCode: "999001",
      svRoleId: "9516",
      svRoleName: "经办人",
      svSetYear: "2022",
      svSnum: "2",
      svSysDate: "2022-01-24 13:43:55",
      svTransDate: "2022-01-24",
      svUserCode: "cwy999",
      svUserId: "9522",
      svUserName: "侯彦",
      token: "445072417"
    }
  }
  return _commonData
}