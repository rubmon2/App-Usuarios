import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserAuth } from '../context/UserProvider';

export const RoterProtected = () => {

const{isAuth,isLoading}=useUserAuth()


if(isLoading)return <p>Cargando...</p>

    return  isAuth ? <Outlet></Outlet> : <Navigate to="/"></Navigate>
}
