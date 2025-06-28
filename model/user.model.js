import { Schema, model} from "mongoose";
import bcrypt from 'bcrypt'
// import res from "express/lib/response";

const userschema = new Schema({
          fullname : {
               type: String,
               required: true,
               trim:true,
               lowercase:true
          },
          email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
          },
          password:{
            type:String,
            required:true,
            trim:true
          }
},{
    timestamps:true
})

userschema.pre('save', async function(next){
        const count =  await model('User').countDocuments({email: this.email})
        
        if(count)
          throw next(new Error("User already exist !"))
        next()
})

userschema.pre('save', async function(next) {
  const encrypted = await bcrypt.hash(this.password.toString(), 12)
  this.password = encrypted
  next()
})

 const userModel = model('User', userschema)


export default userModel