const mongoose=require('mongoose')

const superAdminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    },
    status:{
        type:Integer,
        required:true
    },
    createdAt:{
        type:timestamp,
        required:true
    },
    updatedAt:{
        type:timestamp,
        required:false
    },

})

mongoose.model('superAdminModel',superAdminSchema)