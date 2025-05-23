let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") ? Number(localStorage.getItem("highScore")) : 0;

let h2 = document.querySelector("h2");

// Create a score display element (shows current level or 0)
let scoreDisp = document.createElement("h3");
document.body.appendChild(scoreDisp);

// Initialize score display with 0
updateScoreDisplay(0);

function updateScoreDisplay(score) {
    scoreDisp.innerText = `Score: ${score}`;
}

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        updateScoreDisplay(level);  // show level 0 on start
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    updateScoreDisplay(level);  // update displayed score with current level

    let randIdx = Math.floor(Math.random() * btns.length); // Use btns.length (4) instead of 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAnswer(idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start again.`;
        document.querySelector("body").style.background = "red";
        setTimeout(function(){
            document.querySelector("body").style.background = "linear-gradient(120deg, #ff9a9e, #fad0c4)";
        }, 150);

        updateScoreDisplay(0);  // Reset score display to zero on game over
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

