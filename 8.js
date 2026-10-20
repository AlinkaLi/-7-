let userName = prompt("Введіть ваше ім'я:");

if (!userName || userName.trim() === "") {
    userName = "Гравець";
} else {
    userName = userName.trim().slice(0, 15);
}

document.getElementById("username").textContent = userName;

let U = 0;
let C = 0;

const genBtn = document.getElementById("genBtn");
const restartBtn = document.getElementById("restartBtn");
const userCircle = document.getElementById("user");
const compCircle = document.getElementById("computer");
const userScoreBox = document.getElementById("userO");
const compScoreBox = document.getElementById("computerO");
const statusText = document.getElementById("status");

function play() {
    const user = Math.floor(Math.random() * 10) + 1;
    const computer = Math.floor(Math.random() * 10) + 1;

    userCircle.textContent = user;
    compCircle.textContent = computer;

    if (user > computer) {
        U += 1;
        statusText.textContent = `Раунд за ${userName}!`;
    } else if (computer > user) {
        C += 1;
        statusText.textContent = "Раунд за Босом!";
    } else {
        statusText.textContent = "Нічия у цьому раунді!";
    }

    userScoreBox.textContent = U;
    compScoreBox.textContent = C;

    if (U === 3 || C === 3) {
        genBtn.disabled = true;
        restartBtn.style.display = "block";

        if (U === 3) {
            statusText.textContent = `Перемога! ${userName} здолав Боса!`;
            setTimeout(() => alert(userName + " переміг у битві!"), 100);
        } else {
            statusText.textContent = "Бос виявився сильнішим!";
            setTimeout(() => alert("Бос переміг!"), 100);
        }
    }
}

function restartGame() {
    U = 0;
    C = 0;
    userScoreBox.textContent = "0";
    compScoreBox.textContent = "0";
    userCircle.textContent = "?";
    compCircle.textContent = "?";
    statusText.textContent = "Новий бій! Натисніть Generate!";
    genBtn.disabled = false;
    restartBtn.style.display = "none";
}

genBtn.addEventListener("click", play);
restartBtn.addEventListener("click", restartGame);