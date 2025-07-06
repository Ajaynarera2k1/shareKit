import { Schema , model } from "mongoose";

const planSchema = new Schema({
                name:{
                     type : String,
                     trim: true,
                     required:true,
                     lowercase: true
                },
                storage:{
                     type : Number,
                     required:true,
                    
                },
                price:{
                     type : Number,
                     required:true,
                },
},{
    timestamps:true
})

const planModel = model('Plan' , planSchema)

export default planModel