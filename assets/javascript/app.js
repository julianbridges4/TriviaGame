var questions = [];
questions[0] = "Who hit the most home runs over his career?";
questions[1] = "What was the duration in games of the longest hitting streak in MLB history?";
questions[2] = "Who has played the most consecutive games of baseball, breaking Lou Gehrig's record on September 6, 1995?";
questions[3] = "What is the oldest active ball park in Major League Baseball?";

var answerChoices = [];
answerChoices[0] = ["Babe Ruth", "Barry Bonds", "Hank Aaron", "Alex Rodriguez"];
answerChoices[1] = ["36", "51", "56", "61"];
answerChoices[2] = ["Lou Gehrig", "Cal Ripken Jr.", "Barry Bonds", "Ty Cobb"];
answerChoices[3] = ["Fenway Park", "Camden Yards", "Kauffman Stadium", "Wrigley Field"];

var correctAnswer = [];
correctAnswer[0] = "Barry Bonds";
correctAnswer[1] = "56";
correctAnswer[2] = "Cal Ripken Jr.";
correctAnswer[3] = "Fenway Park";

var intervalId;
var time;
var count;
var userGuess;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var correctGif = "<img src='assets/images/baseball-win.gif'>";
var incorrectGif = "<img src='assets/images/baseball-lose.gif'>";
var unansweredGif = "<img src='assets/images/baseball-unanswered.gif'>";


function start() {
	$(".start").remove();
	count = -1;
	$("<div class='display'></div>").insertAfter($(".header"));
	$(".display").append($("<h2 class='questionChoice'><span id='question'></span></h2>"));
	$(".display").append($("<div class='gifHeader'></div>"));
	$(".display").append($("<div class='gif'></div>"));
	$(".display").append($("<div class='results'></div>"));
	nextQuestion();

}

function timer() {
	time = 10;
	$("#time").text(time);
	intervalId = setInterval(function() {
		time--;
		$("#time").text(time);
		console.log(time);
		if (time === 0) {
			clearInterval(intervalId);
			unanswered++;
			$(".gifHeader").append("<h2>You didn't answer!</h2>");
        	$(".gif").append(unansweredGif);
			timeout();
		}
	}, 1000);
}

function nextQuestion() {
	clearInterval(intervalId);
	$(".display").prepend($("<h2 class='timeRemaining'>Time remaining: <span id='time'></span></h2>"));
	$(".display").append($("<h2 class='questionChoice'><span id='question'></span></h2>"));
	$(".answer-choices").remove();
	count++;
	$("#question").text(questions[count]);

	if (count === questions.length) {
		calculateResults();
		// alert("Game Over!");
	} else {
		timer();
		for (var i = 0; i < answerChoices.length; i++) {
			$(".display").append($("<div class='answer-choices'>"+ answerChoices[count][i] + "</div>"));
		}
	}
}

function gradeQuestion() {

    userGuess = $(this).text();
    
    if(userGuess === correctAnswer[count]){
        correct++;
        console.log(correct);
        $(".gifHeader").append("<h2>You are correct!</h2>");
        $(".gif").append(correctGif);
        timeout();
    } else {
        incorrect++;
        console.log(incorrect);
        $(".gifHeader").append("<h2>You are incorrect!</h2>");
        $(".gif").append(incorrectGif);
        timeout();
    }
}

function timeout() {
	$(".timeRemaining").remove();
	$(".questionChoice").remove();
	$(".answer-choices").remove();
	clearInterval(intervalId);
	setTimeout(function() {
		$(".gifHeader").empty();
		$(".gif").empty();
		nextQuestion();
	}, 3500);
}

function calculateResults() {
	$(".timeRemaining").remove();
	$(".results").append("<h2>Correct: <span id='correct'></h2>");
	$(".results").append("<h2>Incorrect: <span id='incorrect'></h2>");
	$(".results").append("<h2>Unanswered: <span id='unanswered'></h2>");
	$(".results").append("<button type='button' class='btn btn-primary btn-lg reset'>Reset</button>")
	$("#correct").text(correct);
	$("#incorrect").text(incorrect);
	$("#unanswered").text(unanswered);
}

function reset() {
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	$(".results").remove();
	$(".display").remove();
	start();
}

$(document.body).on("click", ".answer-choices", gradeQuestion);
$(".start").on("click", start);
$(document.body).on("click", ".reset", reset);
$("#time").text(time);