import React from 'react'
import { useForm } from 'react-hook-form'
import { useUserAuth } from '../../context/UserProvider'
import { Link, useNavigate } from 'react-router-dom'


export const LoginPage = () => {

const{handleSubmit,formState:{errors},register}=useForm()
const{apiLogin,errorGrl}=useUserAuth()
const goTo= useNavigate()
    



const onSubmit=async(data)=>{
    
   const response= await apiLogin(data)
    if(response){
        goTo("/dashboard")
    }
    }
    
    
    
    
    
      return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
    
                {errorGrl && (<p>{errorGrl}</p>)}
                <h2> Login</h2>
                <div> 
      
                <label>Email</label>
                <input type='email' 
                {...register("email",{required:true})} placeholder='Email@Email'></input>
                {errors.email &&(<p>Completa el campo por favor</p>)}
    
                <label>Password</label>
                <input type='password' 
                {...register("password",{required:true})} placeholder='Password'></input>
                {errors.password &&(<p>Completa el campo por favor</p>)}
            
                </div>
                <button type='submit'>Logearse</button>
            </form>
            <p>No tengo una cuenta, ir a <Link to={"/register"}>Registrarme</Link></p>
        </div>
      )
    }
    