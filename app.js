const express = require("express");
const multer = require('multer');

const port = process.env.PORT || "3000";
const app = express();
const upload = multer();

//Body parser middleware for form data
app.use(express.json());
app.use(upload.array()); 
app.use(express.static('public'));  

//Set the route module
app.use("/items",require("./routes/index"));

//Console log the full url of the link
app.use((req,res,next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
});

app.get("/",(req,res)=>{
    res.send("Welcome to your shopping list")
})


app.listen(port,()=>{
    console.log(`The server is running on port ${port}.`)
});