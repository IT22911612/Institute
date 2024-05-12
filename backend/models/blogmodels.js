const mongoose=require("mongoose")
const blogschema=mongoose.Schema({
    b_subject:String,
    b_grade:String,
    teacher_qualification:String,
    teacher_name:String,
    link:String,
 
     
 
   

},{
    timestamps:true

})

const blogmodel=mongoose.model("blogs",blogschema)

module.exports = blogmodel;
