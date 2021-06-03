const express=require("express");
const path=require("path");
const slots=require("./slots")

//Initializing the app
const app=express();
const port=process.env.PORT || 3000;
//getting the directory path for views
const viewsPath=path.join(__dirname,"../views");
const publicPath=path.join(__dirname,"../public");

//adding views directory info to express
app.set("view engine","ejs");
app.set("views",viewsPath);
//hosting public directory
app.use(express.static(publicPath));

//Adding routes to the web page
app.get("",(req,res)=>{
    res.render("home");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/covid",(req,res)=>{
    slots.slotsByPin(req.query.pincode,req.query.date,(error,data)=>{
        if(error){
            res.send({error})
        }else{
            res.send({data})
        }
        
    })
})
app.get("/FAQs",(req,res)=>{
    res.render("FAQs");
})
app.get("*",(req,res)=>{
    res.render("home")
})








//starting server on Test Port 3000
app.listen(port,()=>{
    console.log("Server up on Port:",port);
})