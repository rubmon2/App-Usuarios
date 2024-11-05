import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { authResponse } from "../middleware/types.AuthResponse";



export const UserContext=createContext()

export const useUserAuth=()=>{
    const context= useContext(UserContext)
    if(!context){throw new Error("Context is necesary")}
    return context
}


export const UserProvider=({children})=>{


const [accesToken,setAccesToken]=useState("")
const[isAuth,setIsAuth]=useState(false)
const[isLoading,setIsloading]=useState(true)
const[user,setUSer]=useState({})
const[errorGrl,setErrorGrl]=useState("")




// saveData
const saveData=(dataAuth)=>{
    setAccesToken(dataAuth.accesToken.token)
    setIsAuth(true)
    setIsloading(false)
    localStorage.setItem("Token",dataAuth.refreshToken.token)
    }

//get Refresh Token
function getRefreshToken(){
    try {       
        const token= localStorage.getItem("Token")
        if(!token){
            throw new Error("Not token found")
        }
        
      return token
    } catch (error) {
        console.log(error)
    }
}

//save userSessioninfo
function saveSessionInfo(acces,userData){
    setIsAuth(true)
    setAccesToken(acces)
    setUSer(userData) 
}


//login
const apiLogin=async(object)=>{
    try {
        const response= await api.post("/users/login",object)
        const {body}=response?.data
        if(body){
           const  dataAuth= authResponse(body.userData,body.accesToken, body.refreshToken)
           saveData(dataAuth)

         }
       return body
    
    } catch (error) {
        const errorResponse=error?.response?.data
        if(errorResponse){
            const errorMessage= errorResponse?.message
            setErrorGrl(errorMessage)
        }
    console.log(error)
}
}//fin login




//register
const apiRegister=async(object)=>{
    try {
        const response= await api.post("/users/register",object)
        const {data}=response
       return data
    } catch (error) {
        const errorResponse=error?.response?.data
        if(errorResponse){
            const errorMessage= errorResponse?.message
            setErrorGrl(errorMessage)
        }
    console.log(error)
}

}//fin apiregister


                        //Check Login

//new request acces token

async function newRequestAccesToken(stringToken){

    try {
        const response= await api.post("users/refreshtoken",{},{
            headers: {
                authorization: `Bearer ${stringToken}`
            }
        })

        if(!response){
            throw new Error("Token is no found, psl try later")
        }
        const {accesToken}=response?.data
        return accesToken
    } catch (error) {
        console.log(error)
        return null    }
}////fin new request acces token


//fetch user info

async function getUserInfo(stringTokenInfo){
    try {
        const response= await api.get("/users/info",{
            headers:{
                authorization: `Bearer ${stringTokenInfo}`
            }
        }) 
        const {data}=response
        return data

    } catch (error) {
        console.log(error)
        return null
    }
}

//useEffec con funcion checlogin para mantener la session del usuario y sus datos

    const checkLogin = async () => {

      try {
        if(accesToken){   
            const userInfo= await getUserInfo(accesToken)
            setUSer(userInfo)
            setIsAuth(true)
            setIsloading(false)
            return
        }else{
        const tokenForRequest=getRefreshToken()
        const newAccesToken=await newRequestAccesToken(tokenForRequest)
        if(!newAccesToken){ throw new Error("Complete all field, pls")}
        const userInfo=await getUserInfo(newAccesToken)
        if(!userInfo){throw new Error("Error in  data Token, user is not valid, pls try later")}
        saveSessionInfo(newAccesToken,userInfo) }
        setIsloading(false)
      } catch (error) {
        console.log(error)
        setAccesToken("")
        setIsAuth(false)
        setIsloading(false)
        setUSer("") 
    
      }
    }

useEffect(() => {
checkLogin() 

 }, [accesToken]);
//fin checlogin useEffect

//logot
const logout=()=>{
localStorage.removeItem("Token")
setUSer("")
setIsAuth(false)
setAccesToken("")


}



//SETTIME OUT
useEffect(()=>{

const time=setTimeout(()=>{setErrorGrl("")},4000)

if(errorGrl.length >0){
    return ()=>time 
}

},[errorGrl])
return(
    <UserContext.Provider value={{apiLogin,apiRegister,user,isAuth,errorGrl,isLoading,getRefreshToken,logout}}>
        {children}
    </UserContext.Provider>
)
}
