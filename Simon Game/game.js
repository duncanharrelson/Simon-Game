const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0; 
let started = false

//Starts the game on any key press
$(document).keydown(function() {
    if (!started){
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }    
});

//Detects which button is clicked by the user
$(".btn").click(function(e) {
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);

    let userIndex = userClickedPattern.length - 1;
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userIndex)
})

//Starts sequence, randomizing which button is selected and adds it to the gamePattern[]
function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);    
}

//Checks to see if the user's selection matches with the game pattern. If not completed, waits for userClickedPattern[] and gamePattern[] to be of equal lengths
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
        
    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");            
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

//sets game to default state and will initiate on keypress
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//plays sound for each button or 'wrong' if user selects wrong option
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

//animates buttons by adding/removing "pressed" class from styles.css
function animatePress(currentColor) {
    $(`.${currentColor}`).addClass("pressed");

    setTimeout(() => {
        $(`.${currentColor}`).removeClass("pressed");        
    }, 100);
}