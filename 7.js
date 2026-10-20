const characters = [
    {
        name: "Кейл Хенітьюз",
        image: "1.webp",
        color: "rgba(239, 68, 68, 0.6)",
        phrases: ["Якщо це дасть мені спокій — Так", "Занадто клопітно... Ні", "Так, без сумнівів", "Ні, не дратуй мене"]
    },
    {
		name: "Невіллет",
        image: "2.jpg",
        color: "rgba(59, 130, 246, 0.6)",
        phrases: ["Справедливість каже: Так", "Вирок остаточний — Ні", "Порядок непохитний", "Зачекаємо рішення суду"]
    },
    {
        name: "Вільям Моріарті",
        image: "3.jpg",
        color: "rgba(168, 85, 247, 0.6)",
        phrases: ["Математично доведено — Так", "Усе йде за планом", "Це нераціонально — Ні", "Спробуй ще раз"]
    },
    {
		 name: "Лука",
        image: "4.jpg",
        color: "rgba(234, 179, 8, 0.6)",
        phrases: ["Так, моя зірочко", "Лише якщо заспіваєш мені", "Солодка ілюзія... Ні", "Можливо"]
       
    },
    {
        name: "Іван",
        image: "5.webp",
        color: "rgba(6, 182, 212, 0.6)",
        phrases: ["Так, до самого кінця", "Я зроблю все — Так", "Навряд чи", "Ніколи"]
    }
];

document.body.innerHTML = `
    <div class="magic-card">
        <div class="input-group">
            <input id="question" type="text" placeholder="Чи буде завтра сонячно?" autocomplete="off">
            <div id="errorText" class="error-message"></div>
        </div>

        <div id="ball" title="Pinduten ti bola para iti sungbat">
            <div class="ball-nebula" id="ballNebula"></div>
            <img id="charAvatar" class="character-avatar" alt="Character">
            <div class="ball-glare"></div>
            <div class="ball-rim"></div>
            <div id="ballText" class="ball-text">Запитай мене</div>
        </div>

        <div id="charName" class="character-name"></div>

        <button id="askBtn">Запитати</button>
    </div>
`;
const questionInput = document.getElementById("question");
const errorText = document.getElementById("errorText");
const ball = document.getElementById("ball");
const ballText = document.getElementById("ballText");
const ballNebula = document.getElementById("ballNebula");
const charAvatar = document.getElementById("charAvatar");
const charName = document.getElementById("charName");
const askBtn = document.getElementById("askBtn");

let isRolling = false;
function validateQuestion() {
    const question = questionInput.value.trim();

    if (question === "") {
        showError("Спочатку постав питання!");
        return false;
    }

    if (question.length < 4) {
        showError("Запитання занадто коротке (мінімум 4 символи)!");
        return false;
    }

    if (!question.endsWith("?")) {
        showError("Питання має закінчуватись на ?");
        return false;
    }

    clearError();
    return true;
}

function showError(msg) {
    questionInput.classList.add("error");
    errorText.textContent = msg;
}

function clearError() {
    questionInput.classList.remove("error");
    errorText.textContent = "";
}

function startOracle() {
    if (isRolling) return;

    if (!validateQuestion()) {
        ballText.textContent = "Помилка...";
        return;
    }

    isRolling = true;
    ball.classList.add("shaking");
    charAvatar.classList.remove("active");
    charName.textContent = "Доля обирає вісника...";
    ballText.textContent = "...";

    let counter = 0;
    const totalFlips = 16;
    let delay = 70;

    function flipStep() {
        const char = characters[counter % characters.length];

        charAvatar.src = char.image;
        charAvatar.classList.add("active");
        ballNebula.style.background = `radial-gradient(circle at 50% 50%, ${char.color}, #07040e)`;

        counter++;

        if (counter < totalFlips) {
            delay += 18;
            setTimeout(flipStep, delay);
        } else {
            const finalChar = characters[Math.floor(Math.random() * characters.length)];
            const finalAnswer = finalChar.phrases[Math.floor(Math.random() * finalChar.phrases.length)];

            charAvatar.src = finalChar.image;
            charAvatar.classList.add("active");
            charName.textContent = `— ${finalChar.name}`;
            ballNebula.style.background = `radial-gradient(circle at 50% 50%, ${finalChar.color}, #07040e)`;

            ball.classList.remove("shaking");
            ballText.textContent = finalAnswer;
            isRolling = false;
        }
    }

    flipStep();
}

askBtn.addEventListener("click", startOracle);
ball.addEventListener("click", startOracle);

questionInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        startOracle();
    }
});

questionInput.addEventListener("input", () => {
    if (questionInput.value.endsWith("?")) {
        clearError();
    }
});