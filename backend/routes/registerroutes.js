const express=require("express")


const registermodel = require("../models/registermodels");

const router = express.Router();


router.get("/_user",async(req,res)=>{
    const data= await registermodel.find({})
  
    res.json({success:true,data:data})
})


router.post("/create_user",async(req,res)=>{
    const data=new registermodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/update_user",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await registermodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/delete_user/:id",async(req,res)=>{
const id=req.params.id
const data=await registermodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




router.get("/count_user",async(req,res)=>{
    try{
        const users=await registermodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/order_user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await registermodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


////Login 
router.post("/login_admin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const admin = await registermodel.findOne({ email });
      
        if (!admin) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    
        const isPasswordValid = admin.password === password;

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
  
        // If password is valid, send success message and user data
        res.status(200).json({ success: true, message: "Login successful", data: admin });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
    }
});

module.exports = router;


