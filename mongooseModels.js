const mongoose = require("mongoose") ;

const userSchema = mongoose.Schema({
    email : {
        required : true,
        type : String
    },
    email : String,
    sex : String,
    mode: String,
    name : String,
    age : Number,
    weight : Number,
    height : Number,
    targetWeight: Number,
    calReq : Number,
    targetCal : Number,
    dailyData : [{
        totalCal : Number,
        date: String,
        breakfast : [Object],
        morningSnack : [Object],
        lunch : [Object],
        eveningSnack : [Object],
        dinner : [Object]
    }]
})

const Users = mongoose.model("user", userSchema)

module.exports = [Users]