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