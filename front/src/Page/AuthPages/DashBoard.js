import React from 'react'
import { useUserAuth } from '../../context/UserProvider.js'
import { api } from '../../api/api.js'

export const DashBoard = () => {
    const{user,logout,getRefreshToken, isLoading}=useUserAuth()

//funcion para manejar la consulta axios del logout
async function handleSignOut(){
    try {
        const response= await api.delete("/users/logout",{
        headers:{
            authorization:`Bearer ${getRefreshToken()}`
        }
        })
 
        if(!response){throw new Error("Token session for logout not found")}
       return response

      

    } catch (error) {
        console.log(error)
        return null
    }
}

//mandamos a ejecutar fnx logout y axios delete
const onCLickButton=async(e)=>{
    e.preventDefault()
 try {
    await logout()
    await handleSignOut()
    

     console.log("logout hecho")
 } catch (error) {
    console.log(error)
 }
}





  return (
<> {isLoading? (<p>Cargando...</p>):(
  <div>
      <div>Hola {user.username}</div>
    <div><h1>DashBoard</h1></div>
    <div>
        <button onClick={(e)=>onCLickButton(e)}>Logout</button>
    </div>
  </div>
)}

</> 
 )
}
