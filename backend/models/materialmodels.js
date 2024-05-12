const mongoose=require("mongoose")
const materialschema=mongoose.Schema({
    subject:String,
    grade:String,
    topic:String,
    link:String,
 
     
 
   

},{
    timestamps:true

})

const materialmodel=mongoose.model("Materials",materialschema)

module.exports = materialmodel;
