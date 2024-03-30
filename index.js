// var buttonColours = ["red", "blue", "green", "yellow"];
// var gamePattern = [];
// var soundFiles = {
//   red: new Audio("./sounds/red.mp3"),
//   yellow: new Audio("./sounds/yellow.mp3"),
//   blue: new Audio("./sounds/blue.mp3"),
//   green: new Audio("./sounds/green.mp3")
// };
// const redSound = new Audio("./sounds/red.mp3");
// const yellowSound = new Audio("./sounds/yellow.mp3");
// const blueSound = new Audio("./sounds/blue.mp3");
// const greenSound = new Audio("./sounds/green.mp3");

// // $(document).ready(function() {
// //     for (var color in soundFiles) {
// //       soundFiles[color].load();
// //     }
// //   });

// function playColorSound(color) {
//   soundFiles[color].play();
// }

// function genRandom() {
//     let randomNumber = Math.floor(Math.random() * 4);
//     return randomNumber;
//   }

// var randomChosenColour = buttonColours[genRandom()];
// gamePattern.push(randomChosenColour);
// console.log(gamePattern.toString());
// $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// $("#red").click(function () {
//   redSound.play();
// });
// $("#yellow").click(function () {
//   yellowSound.play();
// });
// $("#blue").click(function () {
//   blueSound.play();
// });
// $("#green").click(function () {
//   greenSound.play();
// });

// $(document).keypress(function (e) {
//   if (e.key == "a") {
//     // genRandom();
//     playColorSound(randomChosenColour);
//   }
// });

///////////////////////////////////////////////////

var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

$(document).keypress(function (e) {

  nextSequence();
});

function nextSequence() {
  userClickedPattern=[];
  $("h1").text(`level ${level}`);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

$(".buttons").click(function (event) {
  const userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log('user pressed '+userChosenColour);
  console.log('gamepattern = '+gamePattern.toString());
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  console.log('game index '+currentLevel+"  "+gamePattern[currentLevel]);
  console.log('user index '+currentLevel+"  "+userClickedPattern[currentLevel]);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
  
      setTimeout(function(){nextSequence()}, 1000);
    }
  } else {
    playSound("wrong");
    var $variable =$('body').addClass('game-over');
    setTimeout(function () {
      $variable.removeClass("game-over");
    }, 200);
    $('h1').text('game over press a key to start over');
    gameOver();
  }
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  var $variable = $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $variable.removeClass("pressed");
  }, 100);
}
function gameOver(){
  level=0;
  gamePattern = [];
  userClickedPattern = [];
}