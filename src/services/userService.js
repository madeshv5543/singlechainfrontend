import axios from 'axios';
import config from './config.js';
import utils from './utils';
const API_URL = config.API_URL;
const EndPoints = config.END_POINTS;

export const getUser = function() {
    const header = { "headers":utils.authHeader()}
    return axios.get(`${API_URL}${EndPoints.GET_USER}`, header).then(res => res.data)
}

export const updateUser  = (user) => {
    const header = { "headers": utils.authHeader() }
    return axios.post(`${API_URL}${EndPoints.EDIT_USER}`, user, header).then(res => res.data)
}

export const getSellerList =  () => {
    const header = { "headers" : utils.authHeader()}
    return axios.get(`${API_URL}${EndPoints.SELLER_LIST}`, header).then(res => res.data)
}

export const placeOrder = (data) => {
    const header = { "headers" :  utils.authHeader()}
    return axios.post(`${API_URL}${EndPoints.PLACE_ORDER}`, data, header).then(res => res.data)
}

export const getOrders = () => {
    const header = { "headers" : utils.authHeader()}
    return axios.get(`${API_URL}${EndPoints.ORDER_LIST}`, header).then(res => res.data)
}

export const getOrderDetails = (orderId) => {
    const header = { "headers" :  utils.authHeader()}
    return axios.get(`${API_URL}${EndPoints.GET_ORDER}${orderId}`, header).then(res => res.data )
}

export const updateOrder = (data, orderId) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.EDIT_ORDER}${orderId}`, data, header).then(res => res.data)
}
 
export const deleteOrder = (orderId) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.DELETE_ORDER}${orderId}`, {}, header).then(res => res.data)
}

export const sentToseller = (orderId) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.SENT_TO_SELLER}${orderId}`, {}, header).then(res => res.data)
}

export const SellerConfirm = (data, orderId) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.SELLER_ACTION}${orderId}`, data, header).then(res => res.data)
}

export const getDataFromBlochain = (data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.DATA_BLOCKCHAIN}`, data, header).then(res => res.data)
}


export const getCompletedOrderlist = () => {
    const header = { "headers" : utils.authHeader()};
    return axios.get(`${API_URL}${EndPoints.COMPLETED_ORDERS}`,header).then(res => res.data)
}

export const getBankerlist  = () =>{
    const header = { "headers" : utils.authHeader()};
    return axios.get(`${API_URL}${EndPoints.BANKER_LIST}`,header).then(res => res.data)   
}

export const getBlockchainOrder = (orderId) => {
    const header = { "headers" : utils.authHeader() };
    return axios.get(`${API_URL}${EndPoints.BLOCK_DATA}${orderId}`,header).then(res  => res.data)
}

export const getOrderHistory = (orderId) => {
        const header = { "headers" : utils.authHeader()};
        return axios.get(`${API_URL}${EndPoints.ORDER_HISTORY}${orderId}`,header).then(res => res.data)
}

export const resentToseller = (orderId, data) => {
        const header = { "headers" : utils.authHeader()};
        return axios.post(`${API_URL}${EndPoints.RESENT_ORDER}${orderId}`, data, header).then(res => res.data)
}

export const placeLoc = (data) => {
    const header = { "headers" : utils.authHeader()};
    header['headers']["Content-Type"] = "multipart/form-data";
    return axios.post(`${API_URL}${EndPoints.NEW_LOC}`, data, header).then(res => res.data)
}

export const getLocList = () => {
    const header = { "headers" : utils.authHeader()};
    return axios.get(`${API_URL}${EndPoints.LOC_LIST}`, header).then( res =>  res.data)
}

export const getLocDetails = (id) => {
    const header = { "headers" : utils.authHeader()};
    return axios.get(`${API_URL}${EndPoints.LOC_DETAILS}${id}`, header).then( res =>  res.data);
}

export const updateLoc = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.LOC_UPDATE}${id}`, data, header).then(res => res.data);
}

export const sentBuyerBank = (id) => {
    const header = {"headers": utils.authHeader()};
    console.log("here")
    return axios.post(`${API_URL}${EndPoints.SENT_BUYERBANK}${id}`, {}, header).then(res => res.data);
}

export const transferToSellerBank = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.SENT_SELLERBANK}${id}`, data, header).then(res => res.data);
}

export const sentToBuyer =( id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.SENT_BUYER}${id}`, data, header).then( res => res.data);
}

export const resentToBank = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.RESENT_BANK}${id}`, data, header).then( res => res.data);
}

export const transferToSeller = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.SENTLC_TO_SELLER}${id}`, data, header).then( res => res.data);
}

export const returnToBuyerBank = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.RETURN_TO_BUYERBANK}${id}`, data, header).then( res => res.data);
}

export const sellerConfirm = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.SELLER_CONFIRM}${id}`, data, header).then( res => res.data);
}

export const sellerReturn = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.SELLER_RETURN}${id}`, data, header).then( res => res.data);
}

export const reSentToSellerBank = (id, data) => {
    const header = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.RESENT_TO_SELLERBANK}${id}`, data, header).then( res => res.data)
}

export const addProduct = (data) => {
      const headers = { "headers" : utils.authHeader()};
      headers['headers']["Content-Type"] = "multipart/form-data";
      return axios.post(`${API_URL}${EndPoints.ADD_PRODUCT}`, data, headers).then( res => res.data)
}

export const getProdcutList =() => {
    const header = { "headers" : utils.authHeader()};
    return axios.get(`${API_URL}${EndPoints.PRODUCT_LIST}`,header).then(res => res.data)
}

export const updateProduct = (id, data) => {
    const headers = { "headers" : utils.authHeader()};
    headers['headers']["Content-Type"] = "multipart/form-data";
    return axios.post(`${API_URL}${EndPoints.UPDATE_PRODUCT}${id}`, data, headers)
}

export const getProduct = (id) => {
    const headers = { "headers" : utils.authHeader()};
    return axios.get(`${API_URL}${EndPoints.GET_PRODUCT}${id}`, headers).then(res => res.data)
}

export const deleteProduct = (id) => {
    const headers = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.DELETE_PRODUCT}${id}`, {}, headers).then(res=> res.data)
}


export const createBol = (data) => {
    const headers = { "headers" : utils.authHeader() };
    return axios.post(`${API_URL}${EndPoints.CREATE_BOL}`, data, headers).then(res => res.data)
}

export const getBolList = () => {
    const headers = { "headers" : utils.authHeader() };
    return axios.get(`${API_URL}${EndPoints.BOL_LIST}`, headers).then(res => res.data);
}

export const getBolDetails = (id) => {
    const headers = {  "headers" : utils.authHeader() };
    return axios.get(`${API_URL}${EndPoints.BOL_DETAILS}${id}`, headers ).then(res => res.data)
}

export const updateBolDetails = (id, data) => {
    const headers = { "headers" : utils.authHeader() };
    return axios.post(`${API_URL}${EndPoints.BOL_EDit}${id}`, data, headers).then(res => res.data);
} 

export const deleteBol =(id) => {
    const headers = { "headers" : utils.authHeader()};
    return axios.post(`${API_URL}${EndPoints.DELETE_BOL}${id}`, {},  headers)
}

export default {
    getUser,
    updateUser,
    getSellerList,
    placeOrder,
    getOrders,
    getOrderDetails,
    updateOrder,
    deleteOrder,
    sentToseller,
    SellerConfirm,
    getDataFromBlochain,
    getCompletedOrderlist,
    getBankerlist,
    getBlockchainOrder,
    getOrderHistory,
    resentToseller,
    placeLoc,
    getLocList,
    getLocDetails,
    updateLoc,
    sentBuyerBank,
    transferToSellerBank,
    sentToBuyer,
    resentToBank,
    transferToSeller,
    returnToBuyerBank,
    sellerConfirm,
    sellerReturn,
    reSentToSellerBank,
    addProduct,
    getProdcutList,
    updateProduct,
    getProduct,
    deleteProduct,
    createBol,
    getBolList,
    getBolDetails,
    updateBolDetails,
    deleteBol
}