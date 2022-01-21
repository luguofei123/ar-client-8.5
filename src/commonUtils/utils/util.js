
// 过滤对象中为null的方法函数
// export const filterNull = obj => {
//   for (let key in obj) {
//     if (obj[key] === null) {
//       delete obj[key]
//     }
//     if (seeJsType(obj[key]) === 'string') {
//       obj[key] = obj[key].trim()
//     } else if (seeJsType(obj[key]) === 'object') {
//       obj[key] = filterNull(obj[key])
//     } else if (seeJsType(obj[key]) === 'array') {
//       obj[key] = filterNull(obj[key])
//     }
//   }
//   return obj
// }
export const getUrlKey = name => {
  let part = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
  // let result = pattenr.exec(location.href)
  let result = location.search.match(part)
  return decodeURIComponent(result[1].replace(/\+/g, '%20')) || null
}
// 千分位以及小数点转换
export const toThousandFix = value => {
  if (value === 0) {
    return '0.00'
  }
  if (value === undefined || value === '' || value === null || value === 'null') {
    return ''
  }
  if (value) {
    if (typeof value === 'number') {
      value = value.toFixed(2)
    }

    /*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
    var intPart = Math.trunc(value) //获取整数部分

    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') //将整数部分逢三一断

    var floatPart = '.00' //预定义小数部分
    var value2Array = value.split('.')

    //=2表示数据有小数位
    if (value2Array.length == 2) {
      floatPart = value2Array[1].toString() //拿到小数部分

      if (floatPart.length == 1) {
        //补0,实际上用不着
        return intPartFormat + '.' + floatPart + '0'
      } else {
        return intPartFormat + '.' + floatPart.substr(0, 2)
      }
    } else {
      return intPartFormat + floatPart
    }
  }
}
