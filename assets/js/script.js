// Script to open and close "how to play" modal
const howToPlayModal = document.getElementsByClassName("how-to-play-modal")[0];
const openHowToPlayModal = document.getElementsByClassName("open-how-to-play")[0];
const closeHowToPlayModal = document.getElementsByClassName("close-how-to-play")[0];

openHowToPlayModal.addEventListener("click", function () {
    howToPlayModal.showModal();
});

closeHowToPlayModal.addEventListener("click", function () {
    howToPlayModal.close();
});

// Choose difficulty and theme
let difficulty;
let theme;

let difficultyButtons = document.getElementsByClassName("diff-button");
for (let button of difficultyButtons) {
    button.addEventListener("click", function () {
        document.getElementsByClassName("selected-btn-diff")[0]?.classList.remove("selected-btn-diff");
        this.classList.add("selected-btn-diff");
        difficulty = this.getAttribute("data-difficulty");
    });
}


let themeButtons = document.getElementsByClassName("theme-button");
for (let button of themeButtons) {
    button.addEventListener("click", function () {
        document.getElementsByClassName("selected-btn-theme")[0]?.classList.remove("selected-btn-theme");
        this.classList.add("selected-btn-theme");
        theme = this.getAttribute("data-theme");
    });
}




// Game Logic

// Starting the game
const startButton = document.getElementById("start-button");
const gameContainer = document.getElementsByClassName("game-container")[0];
let anagram = document.getElementById("anagram");

startButton.addEventListener("click", function () {
    startGame();
    setNextQuestion();
});

function startGame() {
    // Prevent the game from starting if a difficulty level and theme have not been selected
    if (!difficulty || !theme) {
        alert("To start the game select a Difficulty Level and Theme");
        return;
    }

    // Hide info and display questions applying style
    document.getElementsByClassName("info-container")[0].classList.add("hide");
    document.getElementsByClassName("game-container")[0].classList.remove("hide");
    document.getElementsByClassName("top-container")[0].classList.add("flex");
    document.getElementsByClassName("anagram-container")[0].classList.add("flex");
    document.getElementsByClassName("bottom-container")[0].classList.add("flex");

    setQuestions(theme);
}

// Selecting questions
const checkAnswerBtn = document.getElementById("check-answer");
let questionsArray;
let questionElement = document.getElementById("anagram");
let userAnswer;
let questionsCurrentIndex = 0;
let roundElement = document.getElementById("round");
let currentRound = 1;
let scoreElement = document.getElementById("score");
let userScore = 0;

/** 
 * Sets the array of questions depending on the theme selected by the user.
 * To avoid having always the same questions in the same order, the questions
 * are randomized using the sort function and subtracting .5
*/
function setQuestions(theme) {
    questionsArray = anagrams[theme].sort(() => Math.random() - .5);
}

/**
 * Assign the inner text of the html anagram element to the selected question.
 */
function setNextQuestion() {
    roundElement.innerText = currentRound;
    scoreElement.innerText = userScore;
    questionElement.innerText = questionsArray[questionsCurrentIndex].anagram;
    document.getElementById("answer").focus();
}


function checkAnswer() {
    userAnswer = document.getElementById("answer").value;
    if (userAnswer === questionsArray[questionsCurrentIndex].name) {
        alert("Correct!");
        userScore += 3;
        scoreElement.innerText = userScore;
    } else {
        alert(`Your answer ${userAnswer} is not correct. The correct answer is ${questionsArray[questionsCurrentIndex].name}`);
    }
    document.getElementById("answer").value = "";
    assesGameState();
}

function assesGameState() {
    questionsCurrentIndex++;
    if (questionsCurrentIndex <= 7) {
        setTimeout(setNextQuestion, 1200);
        currentRound++;
    } else {
        alert("Game over");
    }
}



checkAnswerBtn.addEventListener("click", checkAnswer);







const anagrams = {
    animals: [
        {
            name: "tiger",
            anagram: "gerti",
            hint: "The largest living cat"
        },
        {
            name: "lion",
            anagram: "loin",
            hint: "King of the jungle"
        },
        {
            name: "giraffe",
            anagram: "fearfig",
            hint: "Tallest living animal"
        },
        {
            name: "elephant",
            anagram: "thepanel",
            hint: "Largest existing land animal"
        },
        {
            name: "hippopotamus",
            anagram: "ahpompoustip",
            hint: "Very big mammal with big mouth and short legs"
        },
        {
            name: "giraffe",
            anagram: "fearfig",
            hint: "Tallest living animal"
        },
        {
            name: "elephant",
            anagram: "thepanel",
            hint: "Largest existing land animal"
        },
        {
            name: "hippopotamus",
            anagram: "ahpompoustip",
            hint: "Very big mammal with big mouth and short legs"
        }
    ],
    movies: [
        {
            name: "vertigo",
            anagram: "gitover",
            hint: "A Hitchcock's masterpiece"
        },
        {
            name: "alien",
            anagram: "lanie",
            hint: "Sci-fi classic directed by Ridley Scott"
        },
        {
            name: "seven",
            anagram: "evens",
            hint: "Crime thriller starring Morgan Freeman and Brad Pitt"
        }
    ]
};