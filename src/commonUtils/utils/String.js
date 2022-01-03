/**
 * 清除字符串前后的空格
 */
export const strTrim = (str) => {
  return String(str).replace(/(^\s*)|(\s*$)/g, '')
}
/**
 * 判断字符串是否为空
 */
export const isEmpty = str => {
  return strTrim(str) === '' || str === null || str === undefined
}
/**
 * 返回字节真实字节长度 中文占2字节，英文占1字节 ；
 * 利用charCodeAt 返回0-65535之间的整数，如果<=255 则是英文，反之是中文；
 */
export const getStrBytes = str => {
  let strLen = 0
  for (let i = 0; i < str.length; i++) {
    let s = str.charCodeAt(i)
    if ((s >= 0x0001 && s <= 0x007e) || (0xff60 <= s && s <= 0xff9f)){
      strLen += 1
    } else {
      strLen += 2
    }
  }
  return strLen
}
