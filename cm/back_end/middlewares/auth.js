const jwt = require('jsonwebtoken')
const User =require('../models/user')

exports.isAuth =async (req ,res, next)=>{
    // log the Authorization into console
    console.log(req.headers.authorization)

    if (req.headers && req.headers.authorization) {
        //split and get second part
        const token = req.headers.authorization.split(' ')[1]
       
    try {
         // id is include in below decode
         const decode = jwt.verify(token, process.env.JWT_SECRET)

         const user = await User.findById(decode.userId)
         if (!user) {
             return res.json({succes: false, message:'unauthorized access!'})
         }
 
         req.user =user
         next();
    } catch (error) {
        if(error.name=== 'JsonWebTokenError'){
            return res.json({succes: false, message:'unauthorized access!'})

        }
        if(error.name=== 'JsonExpiredError'){
            return res.json({succes: false, message:'token expired try sign in!'})
        }
        res.json({succes: false, message:'internal Server error'})

    }
       
    } else {
        res.json({succes: false, message:'unauthorized access!'})
    }
};