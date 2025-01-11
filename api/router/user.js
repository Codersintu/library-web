import  { Router } from 'express';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
const router=Router();

const cookieOption={
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, 
};


router.post('/register',async(req,res)=>{
        const {username,email,password}=req.body;
     
        if (!username || !email || !password) {
          return res.status(400).json('please fill all credentials!');
        };
        const userExist=await User.findOne({email:req.body.email}).lean();
     
        if (userExist) {
         return res.status(400).json('email allready exist!');
        };
        const salt= bcrypt.genSalt(10);
        const hashPasssword= bcrypt.hashSync(req.body.password,salt);

   try {
    const Newuser=await User.create({
        username:req.body.username,
        email:req.body.email,
        password:hashPasssword,
        
   });
   if (!Newuser) {
    return res.status(400).json('User registered failed!');
   };
    
   await Newuser.save();
   Newuser.password=undefined;
   const token=await Newuser.generateJwtToken();
   res.cookie('token',token,cookieOption);

   return res.status(201).json({success:true, message:"User registered successfully!", Newuser,token});
   } catch (error) {
    return res.status(500).json('internal error!')
   }
   
})


router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;

        if (!email || !password) {
            return res.status(400).json('email and password are required!');
        };
        const user=await User.findOne({email}).select("+password").lean();
        if (!user || !user.comparePassword(password)) {
            return res.status(400).json('Email and password does not match!');
        };

       
        const token=await user.generateJwtToken();
        user.password=undefined;
        res.cookie('token',token,cookieOption);
        return res.status(201).json({
            success:true,
            message:'user loggedIn successfully',
            user,
            token
        });
    } catch (error) {
        return res.status(500).json('User logged failed!');
    };
   

});


router.delete('/logOut',async(req,res)=>{
    try {
        res.cookie('token',null,{
            secure:true,
            maxAge:0,
            httpOnly:true,
        });
        return res.status(201).json({
            success:true,
            message:"User logout successfully!"
        });
    } catch (error) {
        return res.status(500).json('Invalid LogOut!')
    };
});



router.get('/',async(req,res)=>{
    try {
        const userId=req.user.id.toString();
       const user= await User.findById(userId);
       if (!user) {
        return res.status(404).json('user not found');
    }
        return res.status(201).json({
            success:true,
            message:"user get successfully!",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User could not be fetched',
        });
    };
 
});

export default router;
