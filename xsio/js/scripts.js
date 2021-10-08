var buttons = $('button');
var playerSpan = $('#player');

var player = Math.random() < 0.5 ? "X" : "O";
playerSpan.html(player);

var clickHandler = (event) => {
    var target = $(event.target);
    if(target.html())
        return;
    target.addClass(player);
    target.html(player);
    winner = checkWinner();
    if(winner) {
        console.log("winner: " + winner);
    }
    player = player === "X" ? "O" : "X";
    playerSpan.html(player);
}

var checkWinner = () => {
    var values = buttons.map(function() {
        return $(this).html();
    });
    for(let i=0; i<3; i++) {
        if(values[i]==values[i+3]&&values[i]==values[i+6]) {
            return values[i];
        }

        if(values[i*3]==values[i*3+1]&&values[i*3]==values[i*3+2]) {
            return values[i*3];
        }
    }

    if(values[0] == values[4]&&values[4]==values[8]) {
        return values[0];
    }

    
    if(values[2] == values[4]&&values[4]==values[6]) {
        return values[2];
    }


}

buttons.each( function() {
    $(this).click(clickHandler);
});