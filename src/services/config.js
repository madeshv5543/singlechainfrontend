export const API_URL = "http://localhost:3000/api";
const DOC_URL="http://localhost:3000/static/img/";
const ID_TOKEN_KEY = "id_token";
const USER_DATA = "user_data";
const SELLER = "Seller";
const BUYER = "Buyer";
const BANKER = "Banker";

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
    RESENT_ORDER: '/resentToSeller/',
    NEW_LOC : '/createLoc',
    LOC_LIST : '/loclist',
    LOC_DETAILS : '/loc/',
    LOC_UPDATE : '/editLoc/',
    SENT_BUYERBANK: '/sentToBanker/',
    SENT_SELLERBANK: '/sentToSellerBank/',
    SENT_BUYER : '/sentToBuyer/',
    RESENT_BANK : '/resentToBank/',
    SENTLC_TO_SELLER: '/transferToSeller/',
    RETURN_TO_BUYERBANK : '/returnToBuyerBank/',
    SELLER_CONFIRM : '/sellerConfirm/',
    SELLER_RETURN : '/returnToSellerBank/',
    RESENT_TO_SELLERBANK : '/resentToSellerBank/',
    ADD_PRODUCT : '/productOrder',
    PRODUCT_LIST: '/productlist',
    UPDATE_PRODUCT :'/updateproduct/',
    GET_PRODUCT: '/product/',
    DELETE_PRODUCT: '/remove/',
    CREATE_BOL: '/createBol',
    BOL_LIST : '/bol',
    BOL_DETAILS: '/bol/',
    BOL_EDit: '/editbol/',
    DELETE_BOL: '/deleteBol/'
 }
export default {API_URL, END_POINTS, ID_TOKEN_KEY, USER_DATA, SELLER, BUYER, BANKER, DOC_URL};