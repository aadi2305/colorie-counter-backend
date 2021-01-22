const mongoose = require("mongoose") ;

const userSchema = mongoose.Schema({
    id : {
        required : true,
        type : String
    }
    name : String,
    age : Number,
    weight : Number,
    height : Number,
    targetWeight: Number,
    calReq : Number,
    targetCal : Number,
    dailyData : [Object]
})

const Users = mongoose.model("user", userSchema)

module.exports = [Users]