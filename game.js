// alert("Game On");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function() {
  if (gameStarted == false) {
    gameStarted = true;
    nextSequence();
  }

});

$(".btn").click(function() {
  var userChosenColour = this.id;
  //  console.log(this);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  //  console.log(userClickedPattern);
  animatePress(userChosenColour);

  checkAnswer(level)
});

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  level++;

  $("h1").text("Level " + level);

  //  console.log(gamePattern);

  playSound(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // console.log("Did it flash?");


}

function checkAnswer(currentLevel) {
  if (gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]) {
    console.log("Success");
    if (currentLevel == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }

  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game over. Press any key to restart");

    startOver();
  }

}

function startOver(){
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  gameStarted = false;
}
