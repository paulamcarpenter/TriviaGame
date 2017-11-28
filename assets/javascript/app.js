$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
  $(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
  event.preventDefault();  // added line to test issue on GitHub Viewer
  // clickSound.play();
  generateHTML();

  timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
  //answeredQuestion = true;
  // clickSound.play();
  selectedAnswer = $(this).text();
  if(selectedAnswer === correctAnswers[questionCounter]) {
    //alert("correct");

    clearInterval(theClock);
    generateWin();
  }
  else {
    //alert("wrong answer!");
    clearInterval(theClock);
    generateLoss();
  }
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
  // clickSound.play();
  resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
  questionCounter++;
  generateHTML();
  counter = 30;
  timerWrapper();
  }
  else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["How many legs does a lobster have?", "In which sport are barani, rudolph and randolph all techniques?", "Who was the first artist to enter the US album chart at No 1?", "The first person shooter video game Doom was first released in what year?", "The first McDonald's restaurant opened in which U.S. state?", "What is the largest freshwater lake in the world?", "What is the capital of Colombia?"];
var answerArray = [["Two", "Five", "Ten", "None"], ["Herding","Trampolining","Hunting","Motorcross"], ["Paul McCartney", "David Bowie", "Elton John", "Adele"], ["2001","1989","1999","1993"], ["Ohio", "California", "Indiana", "Iowa"], ["Lake Placid","Lake Superior","Lake Victoria","Caspian Sea"], ["Medellin", "Bogota", "Cartagena", "Cali"]];
var imageArray = ["lobster.png", "trampoline.png" ,"eltonjohn.png", "1993.png", "mcdonalds.png", "lakesuperior.png", "bogota.png","x.png"];
var correctAnswers = ["C. Ten", "B. Trampolining", "C. Elton John", "D. 1993", "B. California", "B. Lake Superior", "B. Bogota"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

