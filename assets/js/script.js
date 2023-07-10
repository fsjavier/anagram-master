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
        throw("Missing difficulty or theme")
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
const checkAnswerBtn = document.getElementById("check-answer");
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
        document.getElementById("time-left").innerText = `${counter}s`;
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
    themeChosenElement.innerText = theme;
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
    document.getElementById("answer").focus();
});



/**
 * Checks if the answer is correct.
 * If it's correct increases the score.
 * After checking, calls the function to asses the state of the game
 */
function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.toLowerCase();
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
        // alert("Game over");
        updateHighestScore();
        finalScoreElement.innerText = userScore;
        document.getElementById("game-container").classList.add("hide");
        document.getElementById("final-container").classList.remove("hide");
        document.getElementById("final-container").classList.add("flex");
        document.getElementById("outer-container").style.height = "100%"
    }
}

/* Checks the answer from the user either clicking on Check Answer
   or pressing Enter as long as the field is not empty.
*/
checkAnswerBtn.addEventListener("click", function() {
    if (document.getElementById("answer").value.length !== 0) {
        checkAnswer();
    } else {
        document.getElementById("answer").focus();
    }
});

document.getElementById("answer").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && this.value.length !== 0) {
        checkAnswer();
    } else {
        document.getElementById("answer").focus();
    }
});

// Check final score and set highest score
function updateHighestScore() {
    if(userScore > localStorage.getItem(highestScore)) {
        localStorage.setItem(highestScore, userScore);
        highestScoreElement.innerText = localStorage.getItem(highestScore);
    } else {
        highestScoreElement.innerHTML = localStorage.getItem(highestScore);
    }
}





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
            name: "leopard",
            anagram: "parole",
            hint: "Big cat known for its distinctive spots"
        },
        {
            name: "red panda",
            anagram: "nap dared",
            hint: "Arboreal mammal with a fluffy tail"
        },
        {
            name: "racoon",
            anagram: "corona",
            hint: "Mammal often associated with urban environments and dumpster diving."
        },
        {
            name: "horse",
            anagram: "shore",
            hint: "Powerful equine known for its strength and companionship with humans throughout history."
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
            hint: "Christopher Nolan redifined movies of superheros and villains"
        },
        {
            name: "city lights",
            anagram: "sigthly tic",
            hint: "One of best Chaplin's movies"
        },
        {
            name: "goodfellas",
            anagram: "fooledgals",
            hint: "Gripping crime masterpiece that follows the rise and fall of a charismatic mobster"
        },
        {
            name: "star wars",
            anagram: "raw arts",
            hint: "The most famous battle between the light and dark sides"
        },
        {
            name: "pulp fiction",
            anagram: "licit funpop",
            hint: "This interconnected stories made Tarantino one of the most popular directors"
        },
        {
            name: "blade runner",
            anagram: "burden learn",
            hint: "Humanity and artificial intelligence mixed in a dystopian future"
        }
    ],
    music: [
        {
            name: "linkin park",
            anagram: "plan kirk in",
            hint: "Created big hits like 'Numb' or 'In The End'"
        },
        {
            name: "radiohead",
            anagram: "hoardaide",
            hint: "Their timeless hits like 'Creep', 'Karma Police', and 'Paranoid Android' have left an indelible mark on music history"
        },
        {
            name: "the police",
            anagram: "epoch lite",
            hint: "Legendary rock band that defined the sound of the late '70s and early '80s creating unforgettable hits like 'Roxanne'"
        },
        {
            name: "tina turner",
            anagram: "nutria rent",
            hint: "Queen of Rock 'n' Roll with hits like 'Simply the Best'"
        },
        {
            name: "metallica",
            anagram: "claimlate",
            hint: "Heavy metal band with iconic hits like 'Enter Sandman' and 'Master of Puppets'"
        },
        {
            name: "pink floyd",
            anagram: "kindly fop",
            hint: "Rock band with timeless hits like 'Wish You Were Here' and 'Comfortably Numb' "
        },
        {
            name: "the doors",
            anagram: "dots hero",
            hint: "Pioneering rock band that fused psychedelia, blues, and poetic lyrics"
        },
        {
            name: "nirvana",
            anagram: "rainvan",
            hint: "groundbreaking grunge band that revolutionized the music scene"
        },
        {
            name: "bruce springsteen",
            anagram: "perturbing scenes",
            hint: "Legendary rock artist 'Born to run' known for his poetic storytelling and passionate performances"
        }
    ],
    countries: [
        {
            name: "portugal",
            anagram: "polartug",
            hint: "Located in southwestern Europe, known for its stunning coastline and vibrant culture."
        },
        {
            name: "iceland",
            anagram: "cleanid",
            hint: "Land of breathtaking natural wonders, geothermal hot springs and the mesmerizing Northern Lights."
        },
        {
            name: "vietnam",
            anagram: "vanitem",
            hint: "Southeast Asian nation with lush landscapes, bustling cities, and delicious cuisine."
        },
        {
            name: "italy",
            anagram: "layit",
            hint: "European country with exquisite art, rich history, picturesque landscapes, and world-renowned cuisine"
        },
        {
            name: "spain",
            anagram: "pains",
            hint: "Vibrant and passionate country, with lively festivals, mouthwatering cuisine, and sun-soaked beaches"
        },
        {
            name: "argentina",
            anagram: "giantearn",
            hint: "Captivating South American nation celebrated for its passionate tango and breathtaking landscapes ranging from the Andes to the Pampas"
        },
        {
            name: "germany",
            anagram: "greyman",
            hint: "European country that seamlessly combines rich history, cutting-edge technology and a deep appreciation for art, science, and engineering."
        },
        {
            name: "colombia",
            anagram: "claimboo",
            hint: "Country of vibrant colors, diverse landscapes, rhythmic music, and rich cultural heritage, also knonw for its delicious coffee"
        },
        {
            name: "united states",
            anagram: "situated nest",
            hint: "Vast and diverse nation that embodies the pursuit of freedom, opportunity, and innovation, with iconic landmarks and a captivating blend of natural wonders and urban marvels"
        }
    ]
};