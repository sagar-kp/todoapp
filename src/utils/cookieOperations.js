/* 
* @name: cookieOperations
* @description: to perform cookie related tasks like adding, removing and getting all cookies
*

*/



import Cookie from "js-cookie"

const setCookie = (cookieName, cookieValue)=>{
  Cookie.set( cookieName, cookieValue,{
    sameSite: "strict", 
    secure : true,
    path: "/",

  })
}

const getCookie = cookieName=>Cookie.get(cookieName)

const getAllCookies = ()=>Cookie.get()

const removeCookie = cookieName=>Cookie.remove(cookieName)

export { setCookie, getCookie, removeCookie, getAllCookies}