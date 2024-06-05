// CPU choice logic 
var cpuNum = Math.random();
var cpuChoice = 0;

if (cpuNum <= 0.333) {
    cpuChoice == "rock"
}
else if (cpuNum <= 0.666) {
    cpuChoice = "paper"
}
else {
    cpuChoice = "scissors"
}

// get input from user
var playerChoice = 0;
playerChoice = prompt("Please pick rock, paper, or scissors.");
console.log(playerChoice);

/*********** 
 GAME LOGIC
 ***********/
    // player choice validation 
    if (playerChoice != "rock" && playerChoice != "paper" && playerChoice != "scissors") {
        alert("Incorrect choice; please pick rock, paper, or scissors.");
    }
    //player chooses rock
    else if (playerChoice == "rock") {
        if (playerChoice == cpuChoice) {
            alert("Tie game")
        }
        else if (playerChoice != cpuChoice) {
            if (cpuChoice == "paper") {
                alert("CPU picks" + " " + cpuChoice + ".")
                alert("CPU wins.")
            }
            else if (cpuChoice == "scissors") {
                alert("CPU picks" + " " + cpuChoice + ".")
                alert("Player wins.")
            }
        }
    }
    //player chooses paper
    else if (playerChoice == "paper") {
        if (playerChoice == cpuChoice) {
            alert("Tie game")
        }
        else if (playerChoice != cpuChoice) {
            if (cpuChoice == "rock") {
            alert("CPU picks" + " " + cpuChoice + ".")
            alert("Player wins.")
            }
            else if (cpuChoice == "scissors") {
            alert("CPU picks" + " " + cpuChoice + ".")
            alert("CPU wins.")
            }
        }
    }
    //player chooses scissors 
    else if (playerChoice == "scissors") {
        if (playerChoice == cpuChoice) {
            alert("Tie game")
        }
        else if (playerChoice != cpuChoice) {
            if (cpuChoice == "rock") {
            alert("CPU picks" + " " + cpuChoice + ".")
            alert("CPU wins.")
            }
            else if (cpuChoice == "paper") {
                alert("CPU picks" + " " + cpuChoice + ".")
                alert("Player wins.")
            }
        }
    }
    alert("Thanks for playing.");












