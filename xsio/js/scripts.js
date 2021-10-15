var buttons = $('button');
var playerSpan = $('#player');
var winnerDiv = $('#winner');
var resetDiv = $('#reset');
var scoreDiv = $('#game-score');


resetDiv.hide();

var scores = { "X": 0, "O": 0 };
var moves = 0;
var winner;
var player = Math.random() < 0.5 ? "X" : "O";
playerSpan.html(player);



var clickHandler = (event) => {
    if (winner)
        return;

    var target = $(event.target);
    if (target.html())
        return;

    moves++;
    target.addClass(player);
    target.html(player);
    winner = checkWinner();

    if (winner) {
        if(winner!="DRAW") {
            scores[winner]++;
            printScores();
        }
        winnerDiv.html("Winner: " + winner);
        resetDiv.show();
    }
    player = player === "X" ? "O" : "X";
    playerSpan.html(player);
    botMove();
}

var checkWinner = () => {
    var values = buttons.map(function () {
        return $(this).html();
    });
    for (let i = 0; i < 3; i++) {
        if (values[i] == values[i + 3] && values[i] == values[i + 6] && values[i]) {
            return values[i];
        }

        if (values[i * 3] == values[i * 3 + 1] && values[i * 3] == values[i * 3 + 2] && values[i * 3]) {
            return values[i * 3];
        }
    }

    if (values[0] == values[4] && values[4] == values[8] && values[0]) {
        return values[0];
    }


    if (values[2] == values[4] && values[4] == values[6] && values[2]) {
        return values[2];
    }

    if (moves === 9) return "DRAW";

}

var botMove = () => {
    var move = Math.floor(Math.random()*9);
    var botButton = $(buttons[move]);
    botButton.html("bot");
    console.log(botButton);

}


var resetGame = () => {
    winner = null;
    winnerDiv.html("");
    moves = 0;
    resetDiv.hide();
    player = Math.random() < 0.5 ? "X" : "O";
    playerSpan.html(player);
    buttons.each(function () {
        var button = $(this);
        button.removeClass(button.html());
        button.html("");
    });
}

var printScores = () => {
    scoreDiv.html("X: " + scores["X"] + " | " + "O: " + scores["O"]);
}

printScores();

resetDiv.click(resetGame);

buttons.each(function () {
    $(this).click(clickHandler);
});