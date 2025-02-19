import jwt from "jsonwebtoken";

export const generateAccessToken = (id,email, name)=>{
    return jwt.sign({id,email,name},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_LIFETIME})
}

export const generateRefreshToken = (id)=>{
    return jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_LIFETIME})
}

