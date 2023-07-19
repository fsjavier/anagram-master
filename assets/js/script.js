// Script to open and close "how to play" modal
const howToPlayModal = document.getElementById("how-to-play-modal");
const openHowToPlayModal = document.getElementsByClassName("open-how-to-play")[0];
const closeHowToPlayModal = document.getElementById("close-how-to-play");

// When the user clicks the button, open the modal 
openHowToPlayModal.addEventListener("click", function() {
    howToPlayModal.style.display = "flex";
});

// When the user clicks on <span> (x), close the modal
closeHowToPlayModal.addEventListener("click", function() {
    howToPlayModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == howToPlayModal) {
    howToPlayModal.style.display = "none";
  }
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
const startButtonElement = document.getElementById("start-button");

startButtonElement.addEventListener("click", function () {
    startGame();
    setNextQuestion();
});

function startGame() {
    // Prevent the game from starting if a difficulty level and theme have not been selected
    if (!difficulty || !theme) {
        document.getElementById("start-requirement").classList.remove("hide");
        throw("Missing difficulty or theme");
    }

    // Hide info and display questions applying style
    document.getElementById("info-container").classList.add("hide");
    document.getElementsByTagName("body")[0].classList.remove("background-info");
    document.getElementsByTagName("body")[0].classList.add(`background-${theme}`);
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
const checkAnswerBtnElement = document.getElementById("check-answer");
let questionsArray;
let themeChosenElement = document.getElementById("theme-chosen");
let questionElement = document.getElementById("anagram");
let questionsCurrentIndex = 0;
let roundElement = document.getElementById("round");
let currentRound = 1;
let askedForHint = false;
let scoreElement = document.getElementById("score");
let userScore = 0;
let finalScoreElement = document.getElementById("final-score");
let highestScoreElement = document.getElementById("highest-score");
let highestScore = 0;
let finalMessageElement = document.getElementById("final-message");


/**
 *  * Sets the array of questions depending on the theme selected by the user.
 * To avoid having always the same questions in the same order, the questions
 * are randomized using the sort function and subtracting .5
 * @param {*} theme 
 */
function setQuestions(theme) {
    questionsArray = anagrams[theme].sort(() => Math.random() - 0.5);
}

/**
 * Starts the timer depending on the difficulty chosen by the user.
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
        document.getElementById("time-left").innerText = `${counter}s`;
        counter--;
        // change counter color to red to visually indicate users they are running out of time.
        if (counter < 5 && counter > 0) {
            document.getElementById("time-left").style.color = "red";
        }
        else if (counter < 0) {
            // if users run out of time check answer and set counter's color back to white.
            checkAnswer();
            document.getElementById("time-left").style.color = "white";
        }
    }, 1000);

}

/**
 * Assign the inner text of the html anagram element to the selected question.
 */
function setNextQuestion() {
    // Reset data from previous question
    document.getElementById("answer-container").classList.remove("correct");
    document.getElementById("answer-container").classList.remove("incorrect");
    askedForHint = false;
    // Update content
    roundElement.innerText = currentRound;
    scoreElement.innerText = userScore;
    themeChosenElement.innerText = theme;
    questionElement.innerText = questionsArray[questionsCurrentIndex].anagram;
    startTimer(difficulty);
    // Give focus to input field
    document.getElementById("answer").focus();
}

// Open and close "hint" modal
const hintText = document.getElementById("hint-text");
const hintModal = document.getElementById("hint-modal");
const openHintModal = document.getElementsByClassName("open-hint")[0];
const closeHintModal = document.getElementById("close-hint");

// When the user clicks the button, open the modal 
openHintModal.addEventListener("click", function () {
    hintModal.style.display = "flex";
    hintText.innerHTML = questionsArray[questionsCurrentIndex].hint;
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

// When the user clicks on <span> (x), close the modal
closeHintModal.addEventListener("click", function() {
    hintModal.style.display = "none";
    document.getElementById("answer").focus();
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target == hintModal) {
        hintModal.style.display = "none";
    }
  });


/**
 * Checks if the answer is correct.
 * If it's correct increases the score.
 * After checking, calls the function to asses the state of the game.
 */
function checkAnswer() {
    clearInterval(interval);
    let userAnswer = document.getElementById("answer").value.toLowerCase();
    if (userAnswer === questionsArray[questionsCurrentIndex].name) {
        document.getElementById("answer-container").classList.add("correct");
        userScore += 3;
        scoreElement.innerText = userScore;
    } else {
        document.getElementById("answer-container").classList.add("incorrect");
    }
    // disable input field once the answer is submitted
    document.getElementsByTagName("input")[0].setAttribute("disabled", true);
    assesGameState();
}

/**
 * Increases the question index by 1 and checks if has reached the last question.
 * If it hasn't reached the end it sets the next question after 2 seconds.
 */
function assesGameState() {
    questionsCurrentIndex++;
    if (questionsCurrentIndex <= (numberOfRounds - 1)) {
        // If the game hasn't reached the end clear the data from previous question and load next question.
        setTimeout(function () {
            document.getElementsByTagName("input")[0].removeAttribute("disabled");
            document.getElementById("answer").value = "";
            document.getElementById("time-left").style.color = "white";
            setNextQuestion();
        }, 2000);
        currentRound++;
    } else {
        setTimeout(function () {
            // If the game has ended hide the Game Screen and display Game Over Screen.
            updateHighestScore();
            finalScoreElement.innerText = userScore;
            document.getElementById("game-container").classList.add("hide");
            document.getElementById("final-container").classList.remove("hide");
            document.getElementById("final-container").classList.add("flex");
            document.getElementById("outer-container").style.height = "100%";
            if (userScore === 24) {
                finalMessageElement.innerText = "You are a Pro!"
            }
        }, 2000);
    }
}

// Checks the answer from the user clicking on Check Answer if the field is not empty.
checkAnswerBtnElement.addEventListener("click", function() {
    if (document.getElementById("answer").value.length !== 0) {
        checkAnswer();
    } else {
        document.getElementById("answer").focus();
    }
});

// Checks the answer from the user either pressing Enter if the field is not empty.
document.getElementById("answer").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && this.value.length !== 0) {
        checkAnswer();
    } else {
        document.getElementById("answer").focus();
    }
});

// Check final score and set highest score.
function updateHighestScore() {
    if(userScore > localStorage.getItem(highestScore)) {
        // If the user's score is higher than the highest score, set the highest score in localStorage.
        localStorage.setItem(highestScore, userScore);
        highestScoreElement.innerText = localStorage.getItem(highestScore);
    } else {
        // If it's not higher get the highest score from localStorage.
        highestScoreElement.innerHTML = localStorage.getItem(highestScore);
    }
}