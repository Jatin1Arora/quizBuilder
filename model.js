const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    Name: String,
    Password: String,
    Address: String,
    Email: String
});
const question = new Schema({
Title:String,
QuestionDescription:String,
Op1:String,
Op2:String,
Op3:String,
Op4:String

});


module.exports.userModel = mongoose.model("Users", user, "Users");
module.exports.questionModel = mongoose.model("Questions", question, "Questions");
