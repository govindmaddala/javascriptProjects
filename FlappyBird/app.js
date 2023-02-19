var hole = document.getElementById("hole");
var game = document.getElementById("game");
var result = document.getElementById("result");
var text = document.getElementById("text");
var scoreBox = document.getElementById("scoreBox")
var scoreOnRuntime = document.getElementById("scoreOnRuntime");
var lifes = 3;
var score = 0;
var jumping = 0;

// localStorage.getItem("highestScore");

//random hole generator
hole.addEventListener("animationiteration", randomHole)
function randomHole() {
    var random = -((Math.random() * 350) + 150);
    hole.style.top = random + "px";
    score++;
    scoreOnRuntime.innerText = `Score: ${score}`

    // var prevRecord = localStorage.getItem("highestScore");
    // localStorage.setItem("highestScore",0);
}

var fall = setInterval(function () {
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    if (jumping == 0) {
        bird.style.top = (birdTop + 2) + "px";
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    // console.log(holeTop);
    var hTop = 500 + holeTop
    // console.log(holeTop,hTop);

    /*

    (birdTop > 450) == > means bird is touching the ground
            ||
    ((blockLeft < 50) && (blockLeft > -50) 
    && ((birdTop < hTop) || (birdTop > hTop + 100) ====> means now block section and bird are in same area and bird hits the block
    ))

    */

    if (
        (birdTop > 450) ||
        ((blockLeft < 50) && (blockLeft > -50) && ((birdTop < hTop) || (birdTop > hTop + 150)))
    ) {
        // lifes--;
        // console.log(lifes);
        // if (lifes === 0) {
            result.style.display = "block";
            text.innerText = `Your final score: ${score}`;
            game.style.display = "none";
            scoreBox.style.display = "none";
        // }

        // score = 0;
    }
}, 10)


window.addEventListener("keydown", hop)

function hop() {
    jumping = 1;
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"))
    if (birdTop > 6) {
        bird.style.top = (birdTop - 60) + "px";
    }
    setTimeout(() => {
        jumping = 0;
    }, 100)
}