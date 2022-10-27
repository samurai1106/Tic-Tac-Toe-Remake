const fieldsContainer = document.querySelector('#fields-container');
const fields = document.querySelectorAll('#field');
const resetBtn = document.querySelector('#reset-board');
const resetScores = document.querySelector('#reset-scores');
const score1 = document.querySelector('#score-1');
const score2 = document.querySelector('#score-2');
const gameStatusMsg = document.querySelector('#game-status-msg');
gameStatusMsg.innerHTML = 'Player (X) Turn';
const lines = document.querySelectorAll('.line');

const player1 = 'x';
const player2 = 'o';
let playerTurn = true;
let playerScore1 = 0;
let playerScore2 = 0;
score1.innerHTML = playerScore1;
score2.innerHTML = playerScore2;

let win = false;
let draw = false;
let stopPlaying = false;

function filling(click){
    if(click.target.innerHTML === ''){
        if(playerTurn === true){
            click.target.innerHTML = player1;
            playerTurn = false;
            gameStatusMsg.innerHTML = 'Player (O) Turn'
        }
        else if(playerTurn === false) {
            click.target.innerHTML = player2;
            playerTurn = true;
            gameStatusMsg.innerHTML = 'Player (X) Turn'
        }
    }
}
function addingAnimationForWinner (line,animationType){
    window.setTimeout(function (){
        document.getElementById(line).classList.add(animationType);
    },100)
}
function checkForWinner (){
    if(fields[0].innerHTML === fields[1].innerHTML && fields[0].innerHTML === fields[2].innerHTML && fields[0].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line4','horizontal-active');
    }
    else if(fields[3].innerHTML === fields[4].innerHTML && fields[3].innerHTML === fields[5].innerHTML && fields[3].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line5','horizontal-active');
    }
    else if(fields[6].innerHTML === fields[7].innerHTML && fields[6].innerHTML === fields[8].innerHTML && fields[6].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line6','horizontal-active');
    }
    else if(fields[0].innerHTML === fields[3].innerHTML && fields[0].innerHTML === fields[6].innerHTML && fields[0].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line1','verticale-active');
    }
    else if(fields[1].innerHTML === fields[4].innerHTML && fields[1].innerHTML === fields[7].innerHTML && fields[1].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line2','verticale-active');
    }
    else if(fields[2].innerHTML === fields[5].innerHTML && fields[2].innerHTML === fields[8].innerHTML && fields[2].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line3','verticale-active');
    }
    else if(fields[0].innerHTML === fields[4].innerHTML && fields[0].innerHTML === fields[8].innerHTML && fields[0].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line7','diagonal-active');
    }
    else if(fields[2].innerHTML === fields[4].innerHTML && fields[2].innerHTML === fields[6].innerHTML && fields[2].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        addingAnimationForWinner('line8','diagonal-active');
    }
}

function checkForDraw (){
    if(win === false){
        for(let i = 0 ; i < fields.length ; i++){
            if(fields[i].innerHTML === ''){
                draw = false;
                break;
            }
            else {
                draw = true;
            }
        }
    }
    if(draw === true){
        gameStatusMsg.innerHTML = 'DRAW !';
        stopPlaying = true;
    }
}

function increasingScores (){
    if(win === true){
        if(playerTurn === false){
            playerScore1++;
            score1.innerHTML = playerScore1;
            gameStatusMsg.innerHTML = 'Player (X) Won!'
        }
        else if(playerTurn === true){
            playerScore2++;
            score2.innerHTML = playerScore2;
            gameStatusMsg.innerHTML = 'Player (O) Won!'
        }
    }
}

function GameActions (click){
    if(stopPlaying === false){
        filling(click);
        checkForWinner();
        checkForDraw();
        increasingScores();
    }
    if(stopPlaying === true){
        resetBtn.classList.add('btn-animation');
    }
}

function resetValues (){
    for(let i = 0 ; i < fields.length ; i++){
        fields[i].innerHTML = '';
    }
    playerTurn = true;
    win = false;
    draw = false;
    stopPlaying = false;
    gameStatusMsg.innerHTML = 'Player (X) Turn';
    resetBtn.classList.remove('btn-animation');
    for(let i = 0 ; i < lines.length ; i++){
        lines[i].classList.remove('verticale-active');
        lines[i].classList.remove('horizontal-active');
        lines[i].classList.remove('diagonal-active');
    }
}

function resetScore (){
    playerScore1 = 0;
    playerScore2 = 0;
    score1.innerHTML = playerScore1;
    score2.innerHTML = playerScore2;
}

fieldsContainer.onclick = GameActions;
resetBtn.onclick = resetValues;
resetScores.onclick = resetScore;