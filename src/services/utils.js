import config from './config.js'

export const getToken = () => {
  return window.localStorage.getItem(config.ID_TOKEN_KEY);
};

export const saveToken = (token, data) => {
  window.localStorage.setItem(config.ID_TOKEN_KEY, token);
  window.localStorage.setItem(config.USER_DATA, data);
};

export const destroyToken = () => {
  window.localStorage.removeItem(config.ID_TOKEN_KEY);
  window.localStorage.removeItem(config.USER_DATA);
};

export const getUSer = () => {
   return JSON.parse(window.localStorage.getItem(config.USER_DATA));
}

export const isBuyer = () => {
  let user = JSON.parse(window.localStorage.getItem(config.USER_DATA))
  if(user.accountType === config.BUYER) {
    return true
  }else{
    return false
  }
}

export const isSeller = () => {
  let user = JSON.parse(window.localStorage.getItem(config.USER_DATA))
  if(user.accountType === config.SELLER) {
    return true
  }else{
    return false
  }
}

export const isBanker = () => {
  let user = JSON.parse(window.localStorage.getItem(config.USER_DATA))
  if(user.accountType === config.BANKER) {
    return true
  }else{
    return false
  }
}

export function authHeader() {
    let user = getUSer()
    let token = getToken()
    if(user && token) {
         return { 'x-access-token':  token};
    }else {
        return {};
    }
}

export function getChainName(url) {
  if(url.includes('adhinet')){
    return 'Adhichain'
  }else if(url.includes('rinkeby')){
    return 'Rinkeby'
  }else{
    return url
  }
} 

export default { getToken, saveToken, destroyToken, authHeader, getUSer, isBuyer, isSeller, getChainName, isBanker};