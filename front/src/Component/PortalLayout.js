import { Link } from "react-router-dom";
import React from "react";
import { api } from "../api/api";
import { useUserAuth } from "../context/UserProvider";


export const PortalLayout=({ children } )=>{
const {getRefreshToken,isAuth,user,logout}=useUserAuth()

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      const response = await api.delete(`/logout`, {
      
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      });
      if(!response){throw new Error("can not logout, pls try  later")}
      await logout()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header>
      <nav>
  <ul>
    {isAuth ? (
      <>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <p>Hola! {user.username}</p>
        </li>
        <li>
          <a href="#" onClick={handleSignOut}>
            Sign out
          </a>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </>
    )}
  </ul>
</nav>

      </header>

      <main>{children}</main>
    </>
  );
}