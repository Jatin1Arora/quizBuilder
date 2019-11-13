var aAddNewQuestion = document.getElementById("aAddNewQuestion");
var divToAddNewQuestion = document.getElementById("divToAddNewQuestion");
var divListQuestions = document.getElementById("divListQuestions");
var question=[];

var questionXttp = new XMLHttpRequest();






//////////////////////////////////////
var userSession = JSON.parse(sessionStorage.getItem("userSessionKey"));

function updateEverything() {
    getStoredQuestions();
    questionXttp.onreadystatechange = function () {
        if (questionXttp.readyState == 4 && questionXttp.status == 200) {
            question = JSON.parse(questionXttp.responseText);
            if (question) {
                for (var i = 0; i < question.length; i++) {
                    addToDomOfQuestion(question[i]);
                }
            }
            else {
                question = [];
            }
        }
    }
            document.getElementById("aUserName").innerHTML = "" + userSession.Name;
            getUserCartFromLocalStorage(userSession.Email);
        
}

function storeQuestions(question) {
    questionXttp.open("POST", "http://localhost:3000/postQuestion");
    questionXttp.setRequestHeader("Content-Type", "application/json");
    questionXttp.send(JSON.stringify(question));
}

function getStoredQuestions() {
    questionXttp.open("GET", "http://localhost:3000/getQuestion");
    questionXttp.send();
}

function createQuestionPanel(nP, index, PrId) {
    hidePanel(aAddNewQuestion);
    divToAddNewQuestion.innerHTML = ("<h3>Add Question</h3>");
    var questionTitle = document.createElement("input");
    var questionDesc = document.createElement("input");
    var questionOp1 = document.createElement("input");
    var questionOp2 = document.createElement("input");
    var questionOp3 = document.createElement("input");
    var questionOp4 = document.createElement("input");
    var submitBtn = document.createElement("input");

    questionTitle.setAttribute("id", "qTitle");
    questionDesc.setAttribute("id", "qDesc");
   questionOp1.setAttribute("id", "qOp1");
   questionOp2.setAttribute("id", "qOp2");
   questionOp3.setAttribute("id", "qOp3");
   questionOp4.setAttribute("id", "qOp4");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Submit Here!");

    questionTitle.setAttribute("type", "text");
    questionDesc.setAttribute("type", "text");
    questionOp1.setAttribute("type", "text");
    questionOp2.setAttribute("type", "text");
    questionOp3.setAttribute("type", "text");
    questionOp4.setAttribute("type", "text");
    
   
    

    divToAddNewQuestion.appendChild(questionTitle);
    addSpaceLine(divToAddNewQuestion);
    divToAddNewQuestion.appendChild(questionDesc);
    addSpaceLine(divToAddNewQuestion);
    divToAddNewQuestion.appendChild(questionDesc);
    addSpaceLine(divToAddNewQuestion);
    divToAddNewQuestion.appendChild(questionOp1);
    addSpaceLine(divToAddNewQuestion);
    divToAddNewQuestion.appendChild(questionOp2);
    addSpaceLine(divToAddNewQuestion);
    divToAddNewQuestion.appendChild(questionOp3);
    addSpaceLine(divToAddNewQuestion);
    divToAddNewQuestion.appendChild(questionOp4);
    addSpaceLine(divToAddNewQuestion);
    divToAddNewQuestion.appendChild(submitBtn);
    if (nP) {
        questionTitle.setAttribute("placeholder", "Enter Question Title");
        questionDesc.setAttribute("placeholder", "Enter Question Description");
        questionOp1.setAttribute("placeholder", "Enter option 1");
        questionOp2.setAttribute("placeholder", "Enter option 2");
        questionOp3.setAttribute("placeholder", "Enter option 3");
        questionOp4.setAttribute("placeholder", "Enter option 4");
        
       
    } else {
        document.getElementById("qTitle").value = question[index].Title;
        document.getElementById("qDesc").value = question[index].Description;
        document.getElementById("qOp1").value = question[index].Op1;
        document.getElementById("qOp2").value = question[index].Op2;
        document.getElementById("qOp3").value = question[index].Op3;
        document.getElementById("qOp4").value = question[index].Op4;
       
    }
    submitBtn.addEventListener("click", function () {
        var Title = document.getElementById("qTitle").value;
        var Description = document.getElementById("qDesc").value;
        var Op1 = document.getElementById("qOp1").value;
        var Op2 = document.getElementById("qOp2").value;
        var Op3 = document.getElementById("qOp3").value;
        var Op4 = document.getElementById("qOp4").value;
        
        var questionObject = {
            Title,
            Description,
            Op1,
            Op2,
            Op3,
            Op4
            
        };
        if (nP) {
            if (!checkValues(questionObject)) {
                createQuestionPanel(true);
            }
            else {
                addNewQuestionToArray(questionObject);
                addToDomOfQuestion(questionObject);
                showPanel(aAddNewQuestion);
            }
        }
        else {
            question[index] = questionObject;
            question[index]._id = QuId;
            destroyPanel();
            updateQuestions(question[index]);
            addToDomOfQuestion(question[index]);
            showPanel(aAddNewQuestion);
        }
    });
}
function addNewQuestionToArray(obj) {
    question.push(obj);
    storeQuestions(obj);
}

function addToDomOfQuestion(objectQ) {
   
    var newDivListQuestion = document.createElement("div");
    divListQuestion.appendChild(newDivListQuestion);
    newDivListQuestion.style.width = "100%";
    newDivListQuestion.style.border = "1px";
    newDivListQuestion.style.borderStyle = "solid";
    newDivListQuestion.style.borderColor = "black";
    newDivListQuestion.style.padding = "2px";
    newDivListQuestion.style.margin = "4px";
  
    var LableTitle = document.createElement("a");
    LableTitle.innerHTML = "<b>Title   : </b>";
    newDivListQuestion.appendChild(LableTitle);
    var aTitle = document.createElement("a");
    aTitle.innerHTML = objectQ.Title + "<br>";
    newDivListQuestion.appendChild(aTitle);

    var qDesc = document.createElement("a");
    qDesc.innerHTML = "<b>Details :</b> " + objectQ.Description;
    newDivListQuestion.appendChild(qDesc);



    var deleteBtn = document.createElement("input");
    deleteBtn.setAttribute("type", "submit");
    deleteBtn.setAttribute("value", "Delete");
    newDivListQuestion.appendChild(deleteBtn);
    deleteBtn.style.cssFloat = "right";
    deleteBtn.style.borderLeft = 0;
    deleteBtn.style.marginBottom = "2px";
    deleteBtn.style.marginTop = "-12px";


   
    deleteBtn.addEventListener("click", function (e) {
        var target = e.target;
        target.parentNode.remove(target);
        removeFromQuestionsArray(objectQ._id);
    });
    

    destroyPanel();
}
function removeFromQuestionsArray(id) {
    for (var i = 0; i < question.length; i++) {
        if (question[i]._id == id) {
            deleteQuestion(question[i]);
            question.splice(i, 1);
            break;
        }
    }
}
function getIndexFromId(id) {
    if (!question) return false;
    for (var i = 0; i < question.length; i++) {
        if (question[i]._id == id) {
            return i;
        }
    }
}
function checkValues(obj) {
    if (obj.Title && obj.Description && obj.Op1 && obj.Op2 && obj.Op3 && obj.Op4) {
        return true;
    }
    else {
        alert("Fill the empty form to proceed.");
        return false;
    }
}
function destroyPanel() {
    while (divToAddNewQuestion.hasChildNodes()) {
        divToAddNewQuestion.removeChild(divToAddNewQuestion.firstChild);
    }
}

function hidePanel(hideP) {
    hideP.style.visibility = "hidden";
}

function showPanel(showP) {
    showP.style.visibility = "visible";
}
function addSpaceLine(spaceP) {
    var sp = document.createElement("br");
    spaceP.appendChild(sp);
    sp = document.createElement("br");
    spaceP.appendChild(sp);
}
function logout() {
    location.assign('../index.html');
    sessionStorage.removeItem("userSessionKey");
}