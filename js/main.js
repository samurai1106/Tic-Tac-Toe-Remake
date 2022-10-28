const fieldsContainer = document.querySelector('#fields-container');
const fields = document.querySelectorAll('#field');
const choosingXbtn = document.querySelector('#choosing-x');
const choosinObtn = document.querySelector('#choosing-o');
const PlayAgainBtn = document.querySelector('#play-again');
const resetBtn = document.querySelector('#reset-board');
const resetScores = document.querySelector('#reset-scores');
const showInfo = document.querySelector('#info');
const score1 = document.querySelector('#score-1');
const score2 = document.querySelector('#score-2');
const gameStatusMsg = document.querySelector('#game-status-msg');
const win_draw_msg = document.querySelector('#win-draw-msg');
const lines = document.querySelectorAll('.line');

let player1;
let player2;
let playerTurn;
let firstPlay;
let playerScore1 = 0;
let playerScore2 = 0;
score1.innerHTML = playerScore1;
score2.innerHTML = playerScore2;

let win = false;
let draw = false;
let stopPlaying = false;

// |--------------------Menu Functions-----------------|
choosingXbtn.onclick = function (){
    player1 = 'x';
    player2 = 'o';
    playerTurn = player1;
    firstPlay = player1;
    document.querySelector('#game-menu').style.display = 'none';
    document.querySelector('#overlay').style.display = 'none';
    document.querySelector('#player1-letter').innerHTML = player1.toUpperCase();
    document.querySelector('#player2-letter').innerHTML = player2.toUpperCase();
    gameStatusMsg.innerHTML = `Player (${player1.toUpperCase()}) Turn`;
}
choosinObtn.onclick = function (){
    player1 = 'o';
    player2 = 'x';
    playerTurn = player1;
    firstPlay = player1;
    document.querySelector('#game-menu').style.display = 'none';
    document.querySelector('#overlay').style.display = 'none';
    document.querySelector('#player1-letter').innerHTML = player1.toUpperCase();
    document.querySelector('#player2-letter').innerHTML = player2.toUpperCase();
    gameStatusMsg.innerHTML = `Player (${player1.toUpperCase()}) Turn`
}

// |--------------------Game Functions-----------------|
function filling(click){
    if(click.target.innerHTML === ''){
        if(playerTurn === player1){
            click.target.innerHTML = player1;
            playerTurn = player2;
            gameStatusMsg.innerHTML = `Player (${playerTurn.toUpperCase()}) Turn`
        }
        else if(playerTurn === player2) {
            click.target.innerHTML = player2;
            playerTurn = player1;
            gameStatusMsg.innerHTML = `Player (${playerTurn.toUpperCase()}) Turn`
        }
    }
}
function addingAnimationForWinner (line,animationType){
    setTimeout(function (){
        document.getElementById(line).classList.add(animationType);
    },100)
}
function active_Win_Draw_msg (){
    setTimeout(function (){
        document.querySelector('#win-draw-msg').style.display = 'block';
        document.querySelector('#overlay').style.display = 'block';
    },500)
}
function checkForWinner (){
    if(fields[0].innerHTML === fields[1].innerHTML && fields[0].innerHTML === fields[2].innerHTML && fields[0].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line4','horizontal-active');
        active_Win_Draw_msg()
    }
    else if(fields[3].innerHTML === fields[4].innerHTML && fields[3].innerHTML === fields[5].innerHTML && fields[3].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line5','horizontal-active');
        active_Win_Draw_msg()
    }
    else if(fields[6].innerHTML === fields[7].innerHTML && fields[6].innerHTML === fields[8].innerHTML && fields[6].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line6','horizontal-active');
        active_Win_Draw_msg()
    }
    else if(fields[0].innerHTML === fields[3].innerHTML && fields[0].innerHTML === fields[6].innerHTML && fields[0].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line1','verticale-active');
        active_Win_Draw_msg()
    }
    else if(fields[1].innerHTML === fields[4].innerHTML && fields[1].innerHTML === fields[7].innerHTML && fields[1].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line2','verticale-active');
        active_Win_Draw_msg()
    }
    else if(fields[2].innerHTML === fields[5].innerHTML && fields[2].innerHTML === fields[8].innerHTML && fields[2].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line3','verticale-active');
        active_Win_Draw_msg()
    }
    else if(fields[0].innerHTML === fields[4].innerHTML && fields[0].innerHTML === fields[8].innerHTML && fields[0].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line7','diagonal-active');
        active_Win_Draw_msg()
    }
    else if(fields[2].innerHTML === fields[4].innerHTML && fields[2].innerHTML === fields[6].innerHTML && fields[2].innerHTML !== ''){
        win = true;
        stopPlaying = true;
        gameStatusMsg.innerHTML = "";
        addingAnimationForWinner('line8','diagonal-active');
        active_Win_Draw_msg()
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
        gameStatusMsg.innerHTML = "";
        if(playerTurn === player2) {
            win_draw_msg.firstElementChild.innerHTML = `Draw !`;
            win_draw_msg.children[1].innerHTML = `Player (${player2.toUpperCase()}) Will Play First Now`;
        }
        else if(playerTurn === player1) {
            win_draw_msg.firstElementChild.innerHTML = `Draw !`;
            win_draw_msg.children[1].innerHTML = `Player (${player1.toUpperCase()}) Will Play First Now`;
        }
        stopPlaying = true;
        active_Win_Draw_msg();
    }
}

function increasingScores (){
    if(win === true){
        if(playerTurn === player2){
            playerScore1++;
            score1.innerHTML = playerScore1;
            win_draw_msg.firstElementChild.innerHTML = `Player (${player1.toUpperCase()}) Won!`;
            if(firstPlay === player1) {
                win_draw_msg.children[1].innerHTML = `Player (${player2.toUpperCase()}) Will Play First Now`;
            }
            else if(firstPlay === player2) {
                win_draw_msg.children[1].innerHTML = `Player (${player1.toUpperCase()}) Will Play First Now`;
            }
        }
        else if(playerTurn === player1){
            playerScore2++;
            score2.innerHTML = playerScore2;
            win_draw_msg.firstElementChild.innerHTML = `Player (${player2.toUpperCase()}) Won!`;
            if(firstPlay === player1) {
                win_draw_msg.children[1].innerHTML = `Player (${player2.toUpperCase()}) Will Play First Now`;
            }
            else if(firstPlay === player2) {
                win_draw_msg.children[1].innerHTML = `Player (${player1.toUpperCase()}) Will Play First Now`;
            }
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
}

function resetValues (){
    for(let i = 0 ; i < fields.length ; i++){
        fields[i].innerHTML = '';
    }
    win = false;
    draw = false;
    stopPlaying = false;
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
resetBtn.onclick = function (){
    resetValues();
    playerTurn = firstPlay;
    gameStatusMsg.innerHTML = `Player (${playerTurn.toUpperCase()}) Turn`;
}
resetScores.onclick = resetScore;

// |--------------------Win or Draw msg-----------------|
PlayAgainBtn.onclick = function (){
    document.querySelector('#win-draw-msg').style.display = 'none';
    document.querySelector('#overlay').style.display = 'none';
    resetValues()
    if(firstPlay === player1){
        firstPlay = player2;
        playerTurn = firstPlay;
    }
    else if (firstPlay === player2){
        firstPlay = player1;
        playerTurn = firstPlay;
    }
    gameStatusMsg.innerHTML = `Player (${firstPlay.toUpperCase()}) Turn`;
}


// -------------------Info Button Action--------------------
showInfo.onmouseenter = function (){
    document.querySelector('#info-content').classList.add('show-info')
}
showInfo.onmouseleave = function (){
    document.querySelector('#info-content').classList.remove('show-info')
}
showInfo.addEventListener('touchstart', function (){
    document.querySelector('#info-content').classList.toggle('show-info')

})