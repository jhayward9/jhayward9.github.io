function randomNumber(min, max) {
    return Math.random() * (min + max) + min;
}

var quotes = [];

quotes[0] = "I" + "'" + "m not trying to make friends. You want a friend, buy a dog. I"
+ "'" + "m trying to make money. - Kevin O" + "'" + "Leary";

quotes[1] = "I don" + "'" + "t like all the attention. I think it" + "'" + "s better to let my work do the talking. - Shigeru Miyamoto";

quotes[2] = "I" + "'" + "m out. - Mark Cuban";

quotes[3] = "To infinity, and beyond! - Buzz Lightyear";

i = Math.floor(randomNumber(0, quotes.length));

document.getElementById('quoteScriptOutput').innerHTML = quotes[i];





