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


// Game Logic

const startGame = document.getElementById("start-button");
const gameContainer = document.getElementsByClassName("game-container")[0];
let anagram = document.getElementById("anagram");



startGame.addEventListener("click", function () {
    document.getElementsByClassName("info-container")[0].classList.add("hide");
    document.getElementsByClassName("game-container")[0].classList.remove("hide");
    document.getElementsByClassName("top-container")[0].classList.add("flex");
    document.getElementsByClassName("anagram-container")[0].classList.add("flex");
    document.getElementsByClassName("bottom-container")[0].classList.add("flex");
});























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