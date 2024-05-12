const express=require("express")


const assesmentmodel = require("../models/assesmentmodels");

const router = express.Router();


router.get("/_assessmemnt",async(req,res)=>{
    const data= await assesmentmodel.find({})
  
    res.json({success:true,data:data})
})


router.post("/create_assessmemnt",async(req,res)=>{
    const { subject, grade, topic, link } = req.body;
    if (!isGoogleFormLink(link)) {
        return res.status(400).json({ success: false, message: "Invalid link format. Only Google Form links are allowed." });
    }

    const data=new assesmentmodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/update_assessment/:id", async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const { subject, grade, topic, link} = req.body;
    if (link && !isGoogleFormLink(link)) {
        return res.status(400).json({ success: false, message: "Invalid link format. Only Google Form links are allowed." });
    }
    try {
        const existingData = await assesmentmodel.findById(id);

        if (!existingData) {
            return res.status(404).json({ success: false, message: "Assessment not found" });
        }

        // Update the existing assessment data
        existingData.subject = updatedData.subject;
        existingData.grade = updatedData.grade;
        existingData.topic = updatedData.topic;
        existingData.link = updatedData.link;

        await existingData.save();

        return res.status(200).json({ success: true, message: "Assessment updated successfully", data: existingData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});




router.delete("/delete_assessmemnt/:id",async(req,res)=>{
const id=req.params.id
const data=await assesmentmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




router.get("/count_assessmemnt",async(req,res)=>{
    try{
        const users=await assesmentmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/order_assessmemnt/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await assesmentmodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});



module.exports = router;
function isGoogleFormLink(link) {
    // Regular expression to match Google Form links
    const googleFormRegex = /^https?:\/\/(www\.)?docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+\/viewform\?formkey=[a-zA-Z0-9_-]+(&.*)?$/;
    return googleFormRegex.test(link);
}