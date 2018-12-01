export const API_URL = "http://localhost:3000/api";
const ID_TOKEN_KEY = "id_token";
const USER_DATA = "user_data";
const SELLER = "Seller";
const BUYER = "Buyer";

export const END_POINTS = {
    SIGN_UP:'/signUp',
    SIGN_IN:'/login',
    GET_USER:'/user',
    EDIT_USER:'/edituser',
    SELLER_LIST:'/sellerlist',
    PLACE_ORDER: '/placeOrder',
    ORDER_LIST : '/myOrder',
    GET_ORDER : '/order/',
    EDIT_ORDER : '/editOrder/',
    DELETE_ORDER : '/deleteOrder/',
    SENT_TO_SELLER : '/senttoseller/',
    SELLER_ACTION :'/sellerAction/',
    DATA_BLOCKCHAIN :'/datafromblochain',
    COMPLETED_ORDERS: '/getCompletedOrder',
    BANKER_LIST : '/bankerslist',
    BLOCK_DATA : '/blockchaindata/',
    ORDER_HISTORY: '/orderhistory/',
    RESENT_ORDER: '/resentToSeller/'
}
export default {API_URL, END_POINTS, ID_TOKEN_KEY, USER_DATA, SELLER, BUYER};