import Cookies from 'js-cookie'

const TokenKey = 'X-Access-Token'
const usernameKey = 'user-name'
const realNameKey = 'real-name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return Cookies.get(usernameKey)
}

export function setUsername(username) {
  return Cookies.set(usernameKey, username)
}

export function removeUsername() {
  return Cookies.remove(usernameKey)
}

export function getRealName() {
  return decodeURI(Cookies.get(realNameKey))
}

export function setRealName(realName) {
  return Cookies.set(realNameKey, realName)
}

export function removeRealName() {
  return Cookies.remove(realNameKey)
}
