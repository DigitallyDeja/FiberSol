

function calculateFiber(){
const userAge = parseInt(document.getElementById("age").value);
const userSex = document.getElementById("sex").value;
let fiberResult = document.getElementById("fiberResult"); 

if (userAge < 50 && userSex == "female"){
     fiberResult.textContent  = "You should aim for 25g of fiber daily";
}
else if(userAge >= 50 && userSex == "female"){
     fiberResult.textContent  = "You should aim for 21g of fiber daily";
}
else if(userAge < 50 && userSex == "male"){
     fiberResult.textContent  = "You should aim for 38g of fiber daily";
}
else if(userAge > 50 && userSex == "male"){
     fiberResult.textContent  = "You should aim for 30g of fiber daily";
}
else{
    fiberResult.textContent  = "Error: you must enter your age.";
}
}
document.getElementById("calculateBtn").addEventListener("click", calculateFiber);

function fiberLog(){
    const currentFiber = parseInt(document.getElementById("currentFiber").value);
    const dailyFiber = document.getElementById("dailyFiber"); 
    if (!currentFiber || currentFiber <= 0){
        dailyFiber.textContent  = "Error: You must enter a valid amount of grams";
    }
    else{
            dailyFiber.textContent  = `${currentFiber}g of fiber logged for today!`;
    }
}

document.getElementById("fiberBtn").addEventListener("click", fiberLog);

document.getElementById("stoolquest").addEventListener("change", function() {
  const stoolDetails = document.getElementById("stooldesc");
  const stoolInfo = document.getElementById("stoolinfo");
  if (this.value === "ansone") {
    stoolDetails.style.display = "block";
    stoolInfo.style.display = "block";
  } else {
    stoolDetails.style.display = "none";
    stoolInfo.style.display = "none";
  }
});

async function getAIResponse(comment) {
  const response = await fetch("http://localhost:3000/analyze-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment })
  });

  const data = await response.json();
  return data.reply;
}

async function handleAIComment(stoolInfo, aiFeedback) {
  if (stoolInfo.trim() !== "") {
    aiFeedback.textContent = "Analyzing your comment...";
    try {
      const reply = await getAIResponse(userComment);
      aiFeedback.textContent = `AI Suggestion: ${reply}`;
    } catch (error) {
      aiFeedback.textContent = "Error fetching AI response.";
      console.error("Error getting AI response:", error);
    }
  } else {
    aiFeedback.textContent = "";
  }
}


async function logStool() {
  const stoolQuestion = document.getElementById("stoolquest").value;
  const stoolDesc = document.getElementById("stooldesc").value;
  const stoolInfo = document.getElementById("stoolinfo").value;
  const savedStool = document.getElementById("savedstool");
  const aiFeedback = document.getElementById("aiResponse");

  if (stoolQuestion === "ansone") {
    if (stoolDesc !== "") {
      savedStool.textContent = `Your entry has been successfully saved.`;

      if (stoolInfo.trim() !== "") {
        aiFeedback.textContent = "Analyzing your comment...";
        await handleAIComment(userComment, aiFeedback);
      } else {
        aiFeedback.textContent = "";
      }
    } else {
      savedStool.textContent = `Error: you must select a type.`;
      aiFeedback.textContent = "";
    }
  } else {
    savedStool.textContent = `You didn't have a bowel movement today.`;

    if (stoolInfo.trim() !== "") {
      aiFeedback.textContent = "Analyzing your comment...";
      await handleAIComment(userComment, aiFeedback);
    } else {
      aiFeedback.textContent = "";
    }
  }
}

document.getElementById("logstool").addEventListener("click", logStool);
document.getElementById("stooldesc").style.display = "none";
document.getElementById("stoolinfo").style.display = "none";
