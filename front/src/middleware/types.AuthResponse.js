export const authResponse=(user,accesToken,refreshToken)=>{
    const body={
        user:user,
        accesToken:accesToken,
        refreshToken:refreshToken
    }
    return body
}


export const TokenResponse=(code,token)=>{
    const body={
        code:code,
        token:token
    }
    return body
}