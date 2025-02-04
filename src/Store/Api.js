import axios from "axios"



const BASE_URL=process.env.REACT_APP_API_KEY

axios.defaults.baseURL=BASE_URL
axios.defaults.withCredentials=true


export const CREATEUSER=`${BASE_URL}/user/signup`
export const LOGINUSER=`${BASE_URL}/user/login`
export const AUTH=`${BASE_URL}/user/auth`



export const ALLPOST=`${BASE_URL}/post/viewallpost`
export const ONEPOST=(postid)=>`${BASE_URL}/post/${postid}`
export const POSTCATEGORY=`${BASE_URL}/admin/getcategory`
export const DISTRICT_0F_POST=`${BASE_URL}/admin/getdistrict`



export const ADDFAVOURITE=`${BASE_URL}/fav/addfavourite`
export const GETFAVOURITE=(userid)=>`${BASE_URL}/fav/getfavourite/${userid}`
export const REMOVEFAVOURITE=`${BASE_URL}/fav/deletefavourite`