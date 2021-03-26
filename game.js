var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var started = false;
var level = 0;

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenPattern.length - 1)
})

$(document).keyup(function (e) {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var choseButton = "#" + randomChosenColor;
    $(choseButton).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    var gameAnswer = gamePattern[currentLevel];
    var userAnswer = userChosenPattern[currentLevel];
    if (gameAnswer == userAnswer) {
        if (gamePattern.length == userChosenPattern.length) {
            setTimeout(function () {
                userChosenPattern = [];
                nextSequence();
            }, 1000)
        }
    }
    else {
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("ゲームオーバーです。リスタートするにはキーを押して下さい。");
        startOver();
    }
}

function playSound(color) {
    var choseSound = "sounds/" + color + ".mp3";
    var sound = new Audio(choseSound)
    sound.play();
}

function animatePress(currentColour) {
    var choseButton = "#" + currentColour;
    $(choseButton).addClass("pressed");
    setTimeout(function () {
        $(choseButton).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
