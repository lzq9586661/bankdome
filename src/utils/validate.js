/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/* 以字母开头，长度在5~16之间，只能包含字母、数字和下划线组成的用户名*/
export function validateUsername(str) {
  const reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
  return reg.test(str)
}
/* 以汉字组成的真实姓名*/
export function validateRealname(str) {
  const reg = /^[\u4e00-\u9fa5]{2,}$/
  return reg.test(str)
}
/* 长度在10-18之间，只能包含字母、数字和下划线组成的密码*/
export function validatePassword(str) {
  // 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
  // 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在10-18之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,18}$
  // 强密码(必须包含大小写字母数字和特殊字符的组合，长度在10-18之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_!@#$%^&*?]).{10,18}$
  const reg = /^[a-zA-Z]\w{5,17}$/
  return reg.test(str)
}
/* 国内电话号码*/
export function validateTelephone(str) {
  const reg = /^(\d{3}-\d{8}|\d{4}-\d{7,8})$/
  return reg.test(str)
}
/* 国内手机号码*/
export function validateCellphone(str) {
  const reg = /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
  return reg.test(str)
}
/* 二代身份证号(18位数字或者带X)*/
export function validateIdCard(str) {
  const reg = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
