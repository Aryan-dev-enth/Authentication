const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:false,
    },
    password:{
        type:String,
        required:true,
        unique:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    date: { type: Date, default: Date.now },
})

const User=mongoose.model('user',userSchema);
module.exports=User;