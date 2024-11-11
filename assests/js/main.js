const state = {
    view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        live: 5,
    },
    action: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.curretTime--
    state.view.timeLeft.textContent = state.values.curretTime

    if (state.values.curretTime < 0 || state.values.live <= 0) {
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.TimerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        location.reload();
    } 
}

function playSound(audioName) {
    let audio = new Audio(`assests/audio/${audioName}.m4a`);
    audio.volume = 0.4;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else if (square.id !== state.values.hitPosition) {
                state.values.live--
                state.view.lives.textContent = state.values.live;
                playSound("error"); 
            } 
        })
    })
}

function init() {
    addListenerHitBox();
}

init();
