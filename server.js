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
    
})

app.post(("/createUser"), (req,res)=>{
    const user = req.body;
    
    Users.create(user,(err,response)=>{
        if(err)res.send(err);
        else res.send(response);
    })
})

app.post(("/updateUser"), (req,res)=>{
    const user = req.body;
    Users.updateOne({email : user.email},user,(err,response)=>{
        if(err)res.send(err);
        else res.send(response);
    })
})
app.post(("/getUserInfo"), (req,res)=>{
    const email = req.body.email;
    const date = req.body.date;
    var flag = 0;
    Users.findOne({email : email},(err,data)=>{
        if(err)res.send(err)
        else{
            for(var i = 0 ; i < data.dailyData.length; i++){
                if(data.dailyData[i].date === date){
                    flag = 1;
                    // console.log(data.dailyData[i]);
                    res.send(data.dailyData[i]);
                    break;
                }
            }   
            if(flag === 0){ 
                var list = data.dailyData;
                list.push({
                date : date,
                totalCal : 0
                })
                Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                    if(err)res.send(err);
                })
                res.send(data.dailyData[data.dailyData.length -1]);
            }
        }
    })
})
app.post("/deleteFood", (req,res)=>{
    const email = req.body.email;
    const food = req.body.food;
    const foodCal = req.body.cal;
    const date = req.body.date;

    Users.findOne({email : email},(error,data)=>{
        var dailyData = data.dailyData;
        var totalDailyCal = data.dailyData.totalCal - foodCal;
        dailyData.totalCal = totalDailyCal;
        var list = [];
        // console.log(req.body.event);
        if(req.body.event === "Breakfast"){
            list = data.dailyData;
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    for(var j = 0; j<list[i].breakfast.length ; j++){
                        // console.log(list[i].breakfast[j]);
                        if(list[i].breakfast[j].food === food){
                            if (j > -1) {
                                list[i].breakfast.splice(j, 1);
                            }
                            break;
                        }
                    }
                    Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                        if(err)res.send(err);
                    })
                }
            }
        }
        else if(req.body.event === "Morning Snack"){
            list = data.dailyData;
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    for(var j = 0; j<list[i].morningSnack.length ; j++){

                        if(list[i].morningSnack[j].food === food){
                            if (j > -1) {
                                list[i].morningSnack.splice(j, 1);
                            }
                            break;
                        }
                    }
                    Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                        if(err)res.send(err);
                    })
                }
            }
        }
        else if(req.body.event === "Lunch"){
            list = data.dailyData;
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    for(var j = 0; j<list[i].lunch.length ; j++){

                        if(list[i].lunch[j].food === food){
                            if (j > -1) {
                                list[i].lunch.splice(j, 1);
                            }
                            break;
                        }
                    }
                    Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                        if(err)res.send(err);
                    })
                }
            }
        }
        else if(req.body.event === "Evening Snack"){
            list = data.dailyData;
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    for(var j = 0; j<list[i].eveningSnack.length ; j++){

                        if(list[i].eveningSnack[j].food === food){
                            if (j > -1) {
                                list[i].eveningSnack.splice(j, 1);
                            }
                            break;
                        }
                    }
                    Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                        if(err)res.send(err);
                    })
                }
            }
        }
        else if(req.body.event === "Dinner"){
            list = data.dailyData;
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    for(var j = 0; j<list[i].dinner.length ; j++){

                        if(list[i].dinner[j].food === food){
                            if (j > -1) {
                                list[i].dinner.splice(j, 1);
                            }
                            break;
                        }
                    }
                    Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                        if(err)res.send(err);
                    })
                }
            }
    }
    })
})
app.post(("/addFood"), (req,res)=>{
    const email = req.body.email;
    const foodCal = req.body.calories;
    const date = req.body.date;
    Users.findOne({email : email},(error,data)=>{
        if(error)console.log(error);
        var dailyData = data.dailyData;
        var totalDailyCal = data.dailyData.totalCal + foodCal;
        dailyData.totalCal = totalDailyCal;
        var list = [];
        var obj = {
                food : req.body.food,
                calories : req.body.calories,
                fats : req.body.fats,
                protein : req.body.protein,
                carbs : req.body.carbs,
                quantity : req.body.quantity
            }
        
        if(req.body.event === "Breakfast"){
            list = data.dailyData;
            flag = 0
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    flag = 1;
                    var totalDailyCal = list[i].totalCal + foodCal;
                    list[i].totalCal = totalDailyCal;
                    list[i].breakfast.push(obj);
                    Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                        if(err)res.send(err);
                    })
                    break;
                }
            }
            if(flag === 0){ 
                list.push({
                date : date,
                breakfast : [obj],
                totalCal : 0
                })
                Users.updateOne({email : email},{dailyData : list},(err,data1)=>{
                    if(err)res.send(err);
                })
            }
        }
        else if(req.body.event === "Morning Snack"){
            list = data.dailyData;
            flag = 0
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    flag = 1;
                    var totalDailyCal = list[i].totalCal + foodCal;
                    list[i].totalCal = totalDailyCal;
                    list[i].morningSnack.push(obj);
                    Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                        if(err)res.send(err);
                    })
                    break;
                }
            }
            if(flag === 0){ 
                list.push({
                date : date,
                morningSnack : [obj]
                })
                
                Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                    if(err)res.send(err);
                })
            }
        }
        else if(req.body.event === "Lunch"){
            list = data.dailyData;
            flag = 0
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    flag = 1;
                    var totalDailyCal = list[i].totalCal + foodCal;
                    list[i].totalCal = totalDailyCal;
                    list[i].lunch.push(obj);
                    Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                        if(err)res.send(err);
                    })
                    break;
                }
            }
            if(flag === 0){ 
                list.push({
                date : date,
                lunch : [obj],
                totalCal : 0
                })
                console.log(list);
                Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                    if(err)res.send(err);
                })
            }
        }
        else if(req.body.event === "Evening Snack"){
            list = data.dailyData;
            flag = 0
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    flag = 1;
                    var totalDailyCal = list[i].totalCal + foodCal;
                    list[i].totalCal = totalDailyCal;
                    list[i].eveningSnack.push(obj);
                    Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                        if(err)res.send(err);
                    })
                    break;
                }
            }
            if(flag === 0){ 
                list.push({
                date : date,
                eveningSnack : [obj],
                totalCal : 0
                })
                console.log(list);
                Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                    if(err)res.send(err);
                })
            }
        }
        else if(req.body.event === "Dinner"){
            list = data.dailyData;
            flag = 0
            for(var i = 0 ; i< list.length ; i++){
                if(list[i].date === date){
                    flag = 1;
                    var totalDailyCal = list[i].totalCal + foodCal;
                    list[i].totalCal = totalDailyCal;
                    list[i].dinner.push(obj);
                    Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                        if(err)res.send(err);
                    })
                    break;
                }
            }
            if(flag === 0){ 
                list.push({
                date : date,
                dinner : [obj],
                totalCal : 0
                })
                console.log(list);
                Users.updateOne({email : email},{dailyData : dailyData},(err,data1)=>{
                    if(err)res.send(err);
                })
            }
        }
     
    })
    
})

//listner
app.listen(port, function() {
    ("Listening on port "+ port);
});