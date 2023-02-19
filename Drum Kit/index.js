// To operate drums with mouse-click
for (let i = 0; i < 7; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        keySound(this.innerHTML);
        keyAnimation(this.innerHTML);
    });
}

// To operate drums with keyboard-press
document.addEventListener("keydown", function (event) {
    keySound(event.key);
    keyAnimation(event.key);
});

function playAudio(audioFilePath) {
    var audio = new Audio(audioFilePath)
    audio.play();
};

function keySound(key) {
    switch (key) {
        case "w":
            playAudio("sounds/tom-1.mp3");
            break;
        case "a":
            playAudio("sounds/tom-2.mp3");
            break;
        case "s":
            playAudio("sounds/tom-3.mp3");
            break;
        case "d":
            playAudio("sounds/tom-4.mp3");
            break;
        case "j":
            playAudio("sounds/snare.mp3");
            break;
        case "k":
            playAudio("sounds/crash.mp3");
            break;
        default:
            playAudio("sounds/kick-bass.mp3");
            break;
    }
}


function keyAnimation(currentKey) {
    var activeKey = document.querySelector("." + currentKey);
    activeKey.classList.add("pressed");
    setTimeout(function () {
        activeKey.classList.remove("pressed");
    }, 100);

}