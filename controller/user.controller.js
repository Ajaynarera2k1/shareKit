
import res from "express/lib/response.js"
import userModel from "../model/user.model.js"
import bcrypt from 'bcrypt'
// import { parseAstAsync } from "vite"
import jsonwebtoken from "jsonwebtoken"

export const signup = async (req,res) => {

      try{
            const newUser =  new userModel(
                  req.body
            )
             await  newUser.save()
              res.status(200).json({
                  message: "signup success"
              })
      }
      catch(err){
            res.status(500).json({
                  message: err.message
            })
      }
      
}

export const login = async(req,res) => {
           try{
                 const {email,password} = req.body
                          const user = await userModel.findOne({ email })

                          if(!user)
                              return res.status(500).json({
                                           message: 'user not found'
                              })

                       const  isLogin = await bcrypt.compare(password, user.password) 
                       
                       if(!isLogin)
                             return res.status(500).json({
                                          message: 'incoorect password'
                        })
                         
                        const payload = {
                              id: user._id,
                              fullname:user.fullname,
                              email :user.email
                        }

                        const token = jsonwebtoken.sign(payload, process.env.Secret_key , {
                              expiresIn : '7d'
                        })
                        
                                   
                        res.status(200).json(
                              {
                                    message : 'login success',
                                    token
                              }
                        )
           }
           catch(err){

                  res.status(401).json({
                        message : 'login failed'
                  })

           }
}