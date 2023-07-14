# Anagram Master

Anagram Master is an online game designed to challenge and entertain word game enthusiasts. In this game, players are tasked with unraveling the mystery hidden within an anagram.

To enhance the gaming experience players can choose their preferred topic and challenge themselves selecting the level of difficulty.

## Table of Contents

* [User Goals](#user-goals)
* [Features](#features)
* [Design](#design)
* [Technologies Used](#technologies-used)
* [Testing](#testing)
* [Deployment](#deployment)
* [Credits](#credits)

## User Goals

* As a user, I want to:
  1. Know how to play.
  2. Select a level of difficulty.
  3. Select a theme for the anagrams.
  4. Receive help if I can't find the word.
  5. Track my score.
  6. Be able to end the game / start over.
  7. Save my highest score to try to improve it next time.


## Features

The website has been developed in one html file containing 3 main interactive sections, the user will see one of them at a time as they advance through the game: start, game and game over.

### Start screen

The screens consists of:
* Header with game name and logo.
* How to play button.
    * When clicked a modal is displayed with information about how to play.
    * The modal can be closed clicking on the "X" or anywhere outside the modal.
* Select Difficulty: the user can select either "normal" or "hard".
* Select Theme: the user can select the theme of the game. Only 1 of the 4 options can be chosen.
* Hovering over a button and selecting a theme and difficulty highlights the button.
* The "Let's go!" starts the game. If the user has not selected difficulty and/or theme they will be warned with a message above the button and it won't work until they do.

<details><summary>Start Screen</summary>
<img src="documentation/readme_images/start-screen.png">
</details>

### Game screen

The screens consists of:
* A background image matching the theme selected by the user.
* Header with game name and logo.
* Time remaining for each anagram. The time will be different depending on the difficulty level chosen.
* Restart button: Returns to "Start screen" and the game progress will be lost.
* The theme chosen is displayed as a reminder.
* The current anagram to solve. The anagrams will be displayed randomly to avoid showing always the same in the same order.
* An input field where the user must type their answer.
* A hint button:
    * It will display a modal with a hint that will help the user solve the anagram.
    * The modal can be closed clicking on the "X" or anywhere outside the modal.
    * Clicking on a hint will subtract points from the user's score (only the first time each round). The number of points will be different depending on the difficulty level.
* The check answer button checks if it's correct or incorrect:
    * To avoid being clicked by mistake, it will only work if the field is not empty.
    * If the user presses the "Enter" button it will have the same effect as clicking on "Check answer".
    * If the answer is correct the answer field will turn green and it will add points to the user's score and move on to the next round.
    * If the answer is incorrect the answer field will turn red and will move to the next round without adding any points. Not showing the correct answer is a deliberate decission to keep the game challenging it the user wants to play again.
* The round number: The game consists of 8 rounds and the current round is displayed.
* The current score.
* If the user runs out of time the answer will be checked.
* After all rounds have been completed the game moves to the next screen.

<details><summary>Game Screen (Animals Theme)</summary>
<img src="documentation/readme_images/game-screen-animals.png">
</details>
<details><summary>Game Screen (Movies Theme)</summary>
<img src="documentation/readme_images/game-screen-movies.png">
</details>
<details><summary>Game Screen (Music Theme)</summary>
<img src="documentation/readme_images/game-screen-music.png">
</details>
<details><summary>Game Screen (Countries Theme)</summary>
<img src="documentation/readme_images/game-screen-countries.png">
</details>

### Game Over screen

The screens consists of:
* Text indicating the game is over.
* The user's final score.
* The user's highest score:
    * The user's highest score is saved on local storage.
    * If the current score is higher than the previous saved highest score, the highest score is updated.
* "Play Again!" button sends the user back to the "Start screen".

<details><summary>Game Over Screen</summary>
<img src="documentation/readme_images/game-over-screen.png">
</details>

### Features left to implement

* Add more anagramas for each theme and more themes.
* The current system to answer anagrams is not ideal for mobile. The keyboard is displayed on the screen and covers important game information. A better solution should be achieved. An option being considered is dragging and dropping letters instead of writing.
* Add highest score for each theme instead of just one global highest score.
* Replace the highest score saved on local storage for scores being saved in a database, so that different users can compete with each other.

## Design

### Wireframes

<details><summary>Start Screen</summary>
<img src="documentation/wireframes/wireframe-start-screen.png">
</details>
<details><summary>Start Screen - How to Play Modal</summary>
<img src="documentation/wireframes/wireframe-start-screen-how-to-play.png">
</details>
<details><summary>Game Screen</summary>
<img src="documentation/wireframes/wireframe-game-screen.png">
</details>
<details><summary>Game Screen - Hint Modal</summary>
<img src="documentation/wireframes/wireframe-game-screen-hint.png">
</details>
<details><summary>Game Over Screen</summary>
<img src="documentation/wireframes/wireframe-game-over-screen.png">
</details>

## Technologies Used

### Languages

* HTML
* CSS
* JavaScript

### Frameworks and tools

* [Codeanywhere](https://codeanywhere.com) was the IDE used to develop the website.
* Git was used for version control.
* [GitHub](https://github.com) is used to host the code and deploy the website.
* [Balsamiq](https://balsamiq.com/wireframes) was used to create the wireframes.
* [Google Fonts](https://fonts.google.com) was used to import the Montserrat and Poiret One fonts.
* [Font Awesome](https://fontawesome.com) was used to import the icons.
* [TinyPNG](https://tinypng.com) was used to compress the images.
* [Convertio](https://convertio.co) was used to convert the images to webP.
* [Favicon](https://favicon.io/) to create the favicon files and links.

## Testing

### Validator Testing

#### HTML

The site passed without errors or warnings through the W3C Markup Validation Service.

<details><summary>HTML test</summary>
<img src="documentation/tests/test-html.png">
</details>

#### CSS

No errors were found through the W3C Jigsaw CSS Validation Service.

<details><summary>CSS test</summary>
<img src="documentation/tests/test-css.png">
</details>

#### JavaScript

JSHint quality tool has been used to test the code, without finding any significant issues.

<details><summary>JSHint test</summary>
<img src="documentation/tests/test-JSHint.png">
</details>

### Accessibility
 
#### Lighthouse

Lighthouse from Google Chrome Developer Tools was used to test performance and accessibility.

<details><summary>Lighthouse Test - Desktop</summary>
<img src="documentation/tests/test-lighthouse-desktop.png">
</details>
<details><summary>Lighthouse Test - Mobile</summary>
<img src="documentation/tests/test-lighthouse-mobile.png">
</details>
  
#### Wave WebAIM

The WAVE WebAIM web accessibility tool was used during the development of the website. It has warned me of low contrast between text and some of the background themes, what led me to change their styles.

In the final testing of the website to check there were no accessibility problems.

### Manual Testing

#### User goals fulfillment

| Goal | Feature | Steps | Expected Outcome | Outcome |
|------|---------|-------|------------------|---------|
| Know how to play. | "How to play" button. | Click on the "How to play" button. | A modal with the information will be displayed, which can be dismissed clicking on the "X" or anywhere outside the box. | Works as expected. |
| Select a level of difficulty. | Select difficulty. | Click on the "Select difficulty" buttons. | Selecting a button will highlight it to show the user the difficulty chosen.<br><br>Selecting a button deselects the previously selected difficulty button. | Works as expected. |
| Select a theme to play. | Select theme. | Click on the "Select theme" buttons. | Selecting a button will highlight it to show the user the theme chosen.<br><br>Selecting a button deselects the previously selected theme button. | Works as expected. |
| Receive help if I can't find the word. | "Hint" button. | 1. Select a difficulty level and theme and click "Let's go" to start the game.<br><br>2. When the anagram is presented click on "Hint". | Clicking on "Hint" shows a modal with information that will help the user solve the anagram.<br><br>The hint can be shown as many times as the user wants, but only first time the hint is displayed points will be subtracted.<br<br>The modal can be dismissed clicking on the "X" or anywhere outside the box. | Works as expected. |
| Track my score. | Score area. | 1. Select a difficulty level and theme and click "Let's go" to start the game.<br><br>2. The score is displayed in the bottom right side of the game screen.<br><br>3. After finishing all rounds the final score will be shown. | A correct answer will add 3 points to the user's score.<br><br> Asking for a hint will subtract 1 point or 2 points, depending on the difficulty level, from the user's score. | Works as expected. |
| Be able to end the game / Start over. | "Restart" button.<br><br>"Play again!" button". | 1. Select a difficulty level and theme and click "Let's go" to start the game.<br><br>Option 1: Click on "Restart" button in the top right side of the game screen.<br><br>Option 2: After finishing all rounds the final screen will be shown, click on "Play again!". | Clicking either on "Restart" or "Play again" reloads the page and the user can select their preferences again. | Works as expected. |
| Save my highest score to try to improve it next time. | Highest score saved on local storage. | 1. Select a difficulty level and theme and click "Let's go" to start the game.<br><br>2. Play all rounds.<br><br>3. After finishing all rounds both the final score and the user highest score will be shown. | The first time a user play their score will be saved as their highest score and it will be shown in the final screen.<br><br>Everytime the user beats their previously saved highest score, the current score will be saved as the new highest score. | Works as expected. |


#### Functional testing

#### Responsiveness

#### Browsers compatibility

### Bugs


## Deployment

### Deployment to GitHub Pages

### How to clone the repository


## Credits

### Content


### Code


### Media


### Acknowledgments