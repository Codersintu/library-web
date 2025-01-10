import { Router } from 'express';
const router=Router();
import Form from '../model/form.js';
import { authorizedRoles, isLoggedIn } from '../middleware/authmiddle.js';

//craete form
router.post('/create',async(req,res)=>{
    try {
        const {name, mobile, address, seatNo, timeSlot, startDate, endDate } = req.body;
        if (!name,!mobile || !address || !seatNo || !timeSlot || !startDate || !endDate ) {
          return res.status(400).json('please fill all credentials!');
        };
        const userExist=await Form.findOne({mobile:req.body.mobile});
     
        if (userExist) {
         return res.status(400).json('mobile allready exist!');
        };
    
        const newForm =await Form.create({
          name:req.body.name,
          mobile: req.body.mobile,
          address: req.body.address,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          seatNo: req.body.seatNo,
          timeSlot: req.body.timeSlot,
          isSeatOccupied: true, 
        });
    
        if (!newForm) {
          return res.status(400).json('user booking failed!');
         };
        await newForm.save();
        
      return  res.status(201).json({
          success:true,
          message: 'user created successfully',
          newForm,
        });
      } catch (err) {
        console.error("Error creating form:", err);
      return  res.status(500).json({
          success:false,
          message: "An error occurred while creating the form.",
          error: err.message,
        });
      };
});

router.get("/users",isLoggedIn,authorizedRoles("ADMIN") ,async (req, res) => {
    try {
      const users = await Form.find();
      res.status(201).json({
        message: "Users fetched successfully",
        users,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({
        message: "An error occurred while fetching the users.",
        error: err.message,
      });
    };
  });
  
export default router;