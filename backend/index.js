const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const studentRoutes = require("./routes/studentroutes");
const teacherRoutes = require("./routes/teacherroutes");
const scheduleRoutes = require("./routes/schedule");
const inventory = require("./routes/items");
const admin = require("./routes/registerroutes");
const studymaterial = require("./routes/materialroutes")
const assessment = require("./routes/assesmentroutes")
const expense = require("./routes/expenses")
const income = require("./routes/incomes")
const blog = require("./routes/blogroutes")
const helpdesk = require("./routes/helpdeskroute")
const payform = require("./routes/s_payformroutes")
const mark = require("./routes/marksRoutes")


const app=express()

app.use(cors())
app.use(express.json())
app.use("/", studentRoutes);
app.use("/", teacherRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/items", inventory);
app.use("/", admin);
app.use("/", studymaterial);
app.use("/expense", expense);
app.use("/income", income);
app.use("/", blog);
app.use("/", assessment);
app.use("/", helpdesk);
app.use("/", payform);
app.use("/", mark);



const PORT=process.env.PORT||8020


mongoose.connect("mongodb+srv://Janith:Janith2002@cluster0.jz4uyh8.mongodb.net/student_db?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

