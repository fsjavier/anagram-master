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
  6. Navigate easily through the game.
  7. Be able to end the game / start over.
  8. Save my highest score to try to improve it next time.


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
* The "Let's go!" starts the game. If the user has not selected difficulty and/or theme they will be warned with a message above the button and it won't work until they do.

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

### Game Over screen

The screens consists of:
* Text indicating the game is over.
* The user's final score.
* The user's highest score:
    * The user's highest score is saved on local storage.
    * If the current score is higher than the previous saved highest score, the highest score is updated.
* "Play Again!" button sends the user back to the "Start screen".

### Features left to implement

* Add more anagramas for each theme and more themes.
* The current system to answer anagrams is not ideal for mobile. The keyboard is displayed on the screen and covers important game information. A better solution should be achieved. An option being considered is dragging and dropping letters instead of writing.
* Add highest score for each theme instead of just one global highest score.
* Replace the highest score saved on local storage for scores being saved in a database, so that different users can compete with each other.

## Design

### Wireframes


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

#### CSS

### Accessibility
 
#### Lighthouse
  
#### Wave WebAIM

### Manual Testing

#### User goals fulfillment

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