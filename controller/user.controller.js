import UserModel from '../model/user.model.js'
import planModel from '../model/plan.model.js'
import FileModel from '../model/file.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import path from 'path'

export const signup = async (req, res)=>{
    try {
        const plan = await planModel.find({ name : 'starter'})
        req.body.plan = plan._id

        
        const newUser = new UserModel(req.body)
        await newUser.save()
        res.status(200).json({
            message: "Signup success !"
        })
    }
    catch(err)
    {
        res.status(500).json({
            message: err.message
        })
    }
}


export const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        
        if(!user)
            return res.status(404).json({
                message: 'User doesn`t exist'
            })

        const isLogin = await bcrypt.compare(password, user.password)

        if(!isLogin)
            return res.status(401).json({
                message: 'Incorrect password'
            })
    

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            picture: user.picture
        }
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.status(200).json({
            message: 'Login success',
            token
        })
    }
    catch(err)
    {
        res.status(401).json({
            message: 'Login failed please try after something'
        })
    }
}

export const uploadProfilePicture = async (req, res)=>{
    try {
        const picture = path.join("pictures", req.file.filename).replace(/\\/g, '/')
        const user = await UserModel.findByIdAndUpdate(req.user.id, {picture})

        if(!user)
            return res.status(401).json({
                message: "Failed to upload profile picture"
            })

        const payload = {
            id: req.user.id,
            fullname: req.user.fullname,
            email: req.user.email,
            picture
        }
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.status(200).json({
            message: "Profile picture uploaded",
            token
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            message: 'Failed to upload profile picture'
        })
    }
}

export const fetchStorage = async (req, res)=>{
    try {
        const user = await UserModel.findById(req.user.id).populate('plan') 

        const file = await FileModel.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId.createFromHexString(req.user.id)
                }
            },
            {
              $group: {
                _id: '$user',
                usedStorage: {$sum: '$size'}
              }  
            }
        ])

        res.status(200).json({
            storage: user.plan.storage,
            usedStorage: file.length ? file[0].usedStorage : 0
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            message: "Failed to fetch storage"
        })
    }
}