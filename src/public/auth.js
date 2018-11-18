import Cookies from 'js-cookie'

const TokenKey = 'User_Token'

export function getToken() {
  if(Cookies.get(TokenKey) === undefined || Cookies.get(TokenKey) === 'undefined') {
    return null
  }
  return Cookies.get(TokenKey)
}

// 用户Cookie过期时间为1/12天
export function setToken(token) {
  return Cookies.set(TokenKey, token,{ expires: 1/12 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function longToken() {
  let val = Cookies.get(TokenKey)
  Cookies.remove(TokenKey)
  return Cookies.set(TokenKey, val, { expires: 1/12 })
}
