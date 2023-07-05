// Script to open and close "how to play" modal
const howToPlayModal = document.getElementById("how-to-play-modal");
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
const gameContainer = document.getElementById("game-container");
let anagram = document.getElementById("anagram");

startButton.addEventListener("click", function () {
    startGame();
    setNextQuestion();
});

function startGame() {
    // Prevent the game from starting if a difficulty level and theme have not been selected
    if (!difficulty || !theme) {
        document.getElementById("start-requirement").classList.remove("hide");
        return;
    }

    // Hide info and display questions applying style
    document.getElementById("info-container").classList.add("hide");
    document.getElementById("game-container").classList.remove("hide");
    document.getElementById("top-container").classList.add("flex");
    document.getElementById("anagram-container").classList.add("flex");
    document.getElementById("bottom-container").classList.add("flex");

    setQuestions(theme);
}

// Selecting questions
const numberOfRounds = 8;
const timeHardDifficulty = 20;
const timeNormalDifficulty = 45;
let counter;
let interval;
const checkAnswerBtn = document.getElementById("check-answer");
let questionsArray;
let questionElement = document.getElementById("anagram");
let userAnswer = document.getElementById("answer");
let questionsCurrentIndex = 0;
let roundElement = document.getElementById("round");
let currentRound = 1;
let askedForHint = false;
let scoreElement = document.getElementById("score");
let userScore = 0;


/**
 *  * Sets the array of questions depending on the theme selected by the user.
 * To avoid having always the same questions in the same order, the questions
 * are randomized using the sort function and subtracting .5
 * @param {*} theme 
 */
function setQuestions(theme) {
    questionsArray = anagrams[theme].sort(() => Math.random() - .5);
}

/**
 * Starts the timer depending on the difficulty chose by the user.
 * If the user runs out of time the checkAnswer function is called.
 * @param {*} difficulty 
 */
function startTimer(difficulty) {
    if (difficulty === "normal") {
        counter = timeNormalDifficulty;
    } else if (difficulty === "hard") {
        counter = timeHardDifficulty;
    } else {
        alert(`Something went wrong! ${difficulty} unknown`);
        throw (`Difficulty ${difficulty} was not defined!`);
    }

    interval = setInterval(function () {
        document.getElementById("time-left").innerText = counter === 1 ? `${counter} second` : `${counter} seconds`;
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            checkAnswer();
        }
    }, 1000);

}

/**
 * Assign the inner text of the html anagram element to the selected question.
 */
function setNextQuestion() {
    document.getElementById("answer-container").classList.remove("correct");
    document.getElementById("answer-container").classList.remove("incorrect");
    clearInterval(interval);
    askedForHint = false;
    roundElement.innerText = currentRound;
    scoreElement.innerText = userScore;
    questionElement.innerText = questionsArray[questionsCurrentIndex].anagram;
    startTimer(difficulty);
    document.getElementById("answer").focus();
}


// Script to open and close "hint" modal
const hinText = document.getElementById("hint-text");
const hintModal = document.getElementById("hint-modal");
const openHintModal = document.getElementsByClassName("open-hint")[0];
const closeHintModal = document.getElementsByClassName("close-hint")[0];

openHintModal.addEventListener("click", function () {
    hintModal.showModal();
    hinText.innerHTML = questionsArray[questionsCurrentIndex].hint;
    // Points from score will be subtracted only once per round
    if (!askedForHint) {
        askedForHint = true;
        if (difficulty === "hard") {
            userScore -= 2;
        } else if (difficulty == "normal") {
            userScore--;
        }
        scoreElement.innerText = userScore;
    }
});

closeHintModal.addEventListener("click", function () {
    hintModal.close();
});



/**
 * Checks if the answer is correct.
 * If it's correct increases the score.
 * After checking, calls the function to asses the state of the game
 */
function checkAnswer() {
    userAnswer = document.getElementById("answer").value.toLowerCase();
    if (userAnswer === questionsArray[questionsCurrentIndex].name) {
        // alert("Correct!");
        document.getElementById("answer-container").classList.add("correct");
        userScore += 3;
        scoreElement.innerText = userScore;
    } else {
        document.getElementById("answer-container").classList.add("incorrect");

        // alert(`Your answer ${userAnswer} is not correct. The correct answer is ${questionsArray[questionsCurrentIndex].name}`);
    }
    document.getElementsByTagName("input")[0].setAttribute("disabled", true);
    assesGameState();
}

/**
 * Increases the question index by 1 and checks if has reached the last question.
 * If it hasn't reached the end it sets the next question after a short delay.
 */
function assesGameState() {
    questionsCurrentIndex++;
    if (questionsCurrentIndex <= (numberOfRounds - 1)) {
        // setTimeout(setNextQuestion, 2000);
        setTimeout(function () {
            document.getElementsByTagName("input")[0].removeAttribute("disabled");
            document.getElementById("answer").value = "";
            setNextQuestion();
        }, 2000);
        currentRound++;
    } else {
        alert("Game over");
    }
}

/* Checks the answer from the user either clicking on Check Answer
   or pressing Enter as long as the field is not empty.
*/
checkAnswerBtn.addEventListener("click", checkAnswer);
userAnswer.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && userAnswer.value !== "") {
        checkAnswer();
    }
});







// Questions object
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
        },
        {
            name: "the dark knight",
            anagram: "thank third keg",
            hint: "Redifined movies of superheros and villains"
        }
    ],
    music: [
        {
            name: "linkin park",
            anagram: "plan kirk in",
            hint: "Created big hits like 'Numb' or 'In The End'"
        }
    ]
};