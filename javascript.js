var $ = function (id) {
    return document.getElementById(id);
}


var game = ["PUPPY", "CAT", "TURTLE", "HEDGEHOG", "MONKEY", "FISH", "ZEBRA", "GIRAFFE", "DOLPHIN", "MOOSE", "SNAKE", "KANGAROO", "SQUIRREL", "PENGUIN", "CAMEL"]
var shuffle = Math.floor(Math.random() * 15);
var answers = game[shuffle];
var letters = answers.length;
var blanks = [letters];
var winning = letters;
var guessed = answers.split('');
var counter = 0;
var display = "";
var typed = "";

var start = function () {
    for (var i = 0; i < answers.length; i++) {
        blanks[i] = "* ";
        display = display + blanks[i];
    }
    document.getElementById("hangman").innerHTML = display;
    display = "";
}

var guess_button = function () {
    display = "";
    typed = $("input").value;
    $("input").value = "";

    for (var c = 0; c < answers.length; c++) {
        if (typed[c] === guessed) {
            blanks[c] = typed;
            winning--;
        } else if (typed.toUpperCase() == guessed[c]) {
            blanks[c] = typed.toUpperCase();

        }
        display = display + blanks[c] + " ";
    }
    document.getElementById("hangman").innerHTML = display;
    display = "";

    if(guessed == shuffle.length){
        document.getElementById("answer").innerHTML = "You win!";
    }
    else if (typed != guessed) {
        document.getElementById("answer").innerHTML = "You have " + counter + " guess(es) wrong";
        counter = counter +1;
    }
}

$(function (){
    $.getJSON('script.json', function(data) {
        var template = $('photos').html();
        var html = Mustache.to_html(template, data);
        $('#carousel').html(html);
        
        $('#carousel').cycle({
            fx: 'toss'
    
        });
    });
});


window.onload = function () {
    start();
    $("guess_button").onclick = guess_button;

}
