const express = require("express") ;
const mongoose = require("mongoose") ;
const connections_mongoDB = "mongodb+srv://admin:vjd23052000@cluster0.qcfir.mongodb.net/calorixDB?retryWrites=true&w=majority"
const cors = require("cors");
const [Users] = require("./mongooseModels")

const db = mongoose.connection;

const app = express();
const port = process.env.PORT || 8001;

//middlewares
app.use(express.json());
app.use(cors());   

mongoose.connect(connections_mongoDB, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: true 
})

app.get("/", (req,res)=>{
    Users.create({
    
        name : "Vivek",
        age : 22,
        weight : 78,
        height : 185,
        targetWeight: 75,
        calReq : 2210,
        targetCal : 2600,
        dailyData : []
    },(err,response)=>{
        if(err)res.send(err);
        else res.send(response);
    })
})

//listner
app.listen(port, function() {
    ("Listening on port "+ port);
});