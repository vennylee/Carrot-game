'use strict'

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const IMG_SIZE = 80;

const filed = document.querySelector('.game__field');
const gamePlayBtn = document.querySelector('.game__button');
const playBtnIcon = document.querySelector('.fa-play');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message'); 
const refreshBtn = document.querySelector('.pop-up__refreshBtn');

const SHOWING = 'showing';
const HIDDEN = 'hidden';
const CARROT_CLASSNAME = 'carrot';
const BUG_CLASSNAME = 'bug';

let TIME_DURATION = 5;
let score = 0;
let timer;
let started = false; 



filed.addEventListener('click', (e) => {
    // 현재 started는 true.
    if(!started){ // started 가 false라면(=게임이 시작하지 않았다면)
        return // 더 이상의 함수 실행을 진행하지 않고 종료한다
    }

    const target = e.target;
    if(target.matches(".carrot")) {
        target.remove();
        score++;
        updateScoreBoard();
    if(score === CARROT_COUNT) {
        finishGame(true); // 이겼다.
    }
    }else if(target.matches(".bug")) {
        console.log("bugs!!!");
        finishGame(false); // 졌다.
        stopGameTimer();
    }
})

gamePlayBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started=true;
    initGame();
    showStopBtn();
    startTimer();
}

function stopGame() {
    started=false;
    stopGameTimer();
    showStopBtn();
    showPopupMessage('retry');
}

function finishGame(win) {
    started=false;
    stopGameTimer();
    hideGameBtn();
    showPopupMessage(win ? 'YOU WIN' : 'YOU LOST');
}

function showStopBtn() {
    playBtnIcon.classList.remove('fa-play');
    playBtnIcon.classList.add('fa-stop');
}

refreshBtn.addEventListener('click', () => {
    filed.innerHTML='';
    startGame();
});

// start game


function initGame() {
    addItem('carrot', CARROT_COUNT, '/img/carrot.png');
    addItem('bug', BUG_COUNT, '/img/bug.png');
}

function addItem(className, count, src) {
    for(let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.setAttribute('class', className);
        img.setAttribute('src', src);
        img.setAttribute('id',`${i}`);

        filed.appendChild(img);

        const x1 = 0;
        const y1 = 0;
        const x2 = filed.getBoundingClientRect().width - IMG_SIZE;
        const y2 = filed.getBoundingClientRect().height - IMG_SIZE;

        function generateNumm(min, max) {
            return Math.ceil(Math.random() * ( max + min) - min);
        } 

        const leftPosition = generateNumm(x1, x2);
        const topPosition = generateNumm(y1, y2);
        
        img.style.left=`${leftPosition}px`;
        img.style.top=`${topPosition}px`;
    }
}

function startTimer() {
    let remainingTimeSec = TIME_DURATION;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(score === CARROT_COUNT);
            return
        }
        updateTimerText(--remainingTimeSec);
    } ,1000);
}

// stop game

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

function updateScoreBoard() {
    gameScore.innerHTML=CARROT_COUNT - score;
}

function stopGameTimer() {
    clearTimeout(timer);
}

function hideGameBtn() {
    gamePlayBtn.classList.add(HIDDEN);
}

function showPopupMessage(text) {
    popUp.classList.remove(HIDDEN);
    popUp.classList.add(SHOWING);
    popUpMessage.innerHTML = text;
}
