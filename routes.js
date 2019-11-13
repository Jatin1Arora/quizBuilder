var express = require("express");
var router = express.Router();
var user = require('./database/model').userModel;
var question=require('./database/model').questionModel;

router.post("/getUser", function (req, res) {
    user.find({
        Email: req.body.mail,
        Password: req.body.pass
    })
    .then((data) => {
        if (data.length) {
            res.end(JSON.stringify(data[0]));
        }
        else
            res.end("false");
    })
    .catch((err) => {
        console.log("Error logging in User: ", err);
        res.end("false");
    });
});

router.post("/postUser", function (req, res) {
    user.create({
        Name: req.body.Name,
        Address: req.body.Address,
        Password: req.body.Password,
        Email: req.body.Email
    })
    .then((data) => {
        res.end("User registered");  
    })
    .catch((err) => {
        console.log("Error adding User: ", err);
        res.end();
    })
});
/////Question
router.post("/getQuestion", function (req, res) {
    question.find({
        Title: req.body.title,
        QuestionDescription: req.body.questiondescription,
        Op1:req.body.op1,
        Op2:req.body.op2,
        Op3:req.body.op3,
        Op4:req.body.op4,

    })
    .then((data) => {
        if (data.length) {
            res.end(JSON.stringify(data[0]));
        }
        else
            res.end("false");
    })
    .catch((err) => {
        console.log("Error getting quetion: ", err);
        res.end("false");
    });
});

router.post("/postQuestion", function (req, res) {
    question.create({
        Title: req.body.Title,
        QuestionDescription: req.body.Questiondescription,
        Op1:req.body.Op1,
        Op2:req.body.Op2,
        Op3:req.body.Op3,
        Op4:req.body.Op4,
    })
    .then((data) => {
        res.end("Question added");  
    })
    .catch((err) => {
        console.log("Error adding Question: ", err);
        res.end();
    })
});


router.post("/getTest",function(req,res){

})

////////////////////////
module.exports = router;