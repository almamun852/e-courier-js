const express=require('express')
const router=express.Router()

const mongoose=require('mongoose')
const SuperAdmin=mongoose.model("superAdminModel")

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')

const superAdminMiddleware = require('../middleware/superAdminMiddleware')


router.get("/protected",superAdminMiddleware,(resquest,response)=>{
    response.send("middleware works perfectly.")
})

router.get('/',(resquest,response)=>{
    response.send("hello")
})

router.post('/super/admin/set/',(request,response)=>{
// const {name,email,password,status}=request.body
// if(!name || !email || !phone || !password || !status){
//    return response.status(422).json({error:'Please fill all the fields'})
// }

// const query={ $or: [ { email:email}, { phone:phone } ] };

// SuperAdmin.findOne(query)
//  .then((savedUser)=>{
//      if(savedUser){
//          return response.status(422).json({error:'User already exists.'})
//      }

//      bcrypt.hash(password,12)
//       .then(hashedPassword=>{
//         const superAdmin=new SuperAdmin({
//             email,
//             password:hashedPassword,
//             name,
//             phone,
//             status,
//         })

//         superAdmin.save()
//         .then(user=>{
//             response.json({message:"Saved Successfully."})
//         })
//         .catch(error=>{
//             console.log(error)
//         })
//       })
     
     
//  })
//  .catch(error=>{
//      console.log(error)
// })
	return response.send("okay");
// console.log(request.body)
})


router.post('/super/admin/login',(request,response)=>{
    const {email,password}=request.body
    if( !email || !password){
        return response.status(422).json({error:'Please fill all the fields'})
     }
    SuperAdmin.findOne({email:email})
     .then((savedUser)=>{
         if(!savedUser){
             return response.status(422).json({error:'Invalid Username or Password'})
         }
    
         bcrypt.compare(password,savedUser.password)
          .then(doMatch=>{
            if(doMatch){
                // return response.json({message:'Successfully Login'})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email}=savedUser
                return response.json({token:token,user:{_id,name,email}})
            }
            else{
                return response.status(422).json({error:'Invalid Username or Password.'})
            }
          })
          .catch(error=>{
              console.log(error)
          })  
     })
     .catch(error=>{console.log(error)})
    })

module.exports=router