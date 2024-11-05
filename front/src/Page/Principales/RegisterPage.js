import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserProvider.js';


export const RegisterPage = () => {
const{handleSubmit,formState:{errors},register}=useForm()
const goTo=useNavigate()
const{apiRegister,errorGrl}=useUserAuth()


const onSubmit=async(data)=>{
const response = await apiRegister(data)
if(response)goTo("/login")
}


  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>

            {errorGrl && (<p>{errorGrl}</p>)}
            <h2> Registrarse</h2>
            <div> 

            <label>Name</label>
            <input type='text' 
            {...register("username",{required:true})} placeholder='Nombre'></input>
            {errors.username &&(<p>Completa el campo por favor</p>)}

            <label>Email</label>
            <input type='email' 
            {...register("email",{required:true})} placeholder='Email@Email'></input>
            {errors.email &&(<p>Completa el campo por favor</p>)}

            <label>Password</label>
            <input type='password' 
            {...register("password",{required:true})} placeholder='Password'></input>
            {errors.password &&(<p>Completa el campo por favor</p>)}
        
            </div>
            <button type='submit'>Registrarse</button>
        </form>

        <p>Ya tengo una cuenta, ir a <Link to={"/login"}>Loguearme</Link></p>
    </div>
  )
}
