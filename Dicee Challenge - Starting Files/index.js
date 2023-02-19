var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var imageNum = "dice" + randomNumber1 + ".png";
var imageSource1 = "images/" + imageNum;

image1 = document.querySelectorAll("img")[0].setAttribute("src", imageSource1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var imageNum = "dice" + randomNumber2 + ".png";
var imageSource2 = "images/" + imageNum;
image2 = document.querySelectorAll("img")[1].setAttribute("src", imageSource2);

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "👏Player1 Won";
} else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "👏Player2 Won";
}
else {
    document.querySelector("h1").innerHTML = "Draw";
}

document.querySelector("h1").innerHTML = "Refresh Me";