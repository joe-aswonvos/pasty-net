# pasty-net


1. Homepage with a Cornish Theme
   User Story:
   As a visitor, I want to see a welcoming homepage with a Cornish theme, so that I immediately feel immersed in the culture and style of Cornwall.

Acceptance Criteria:

The homepage should have a Cornish-inspired design (e.g., colors, imagery, typography).
A brief welcome message about Cornwall is displayed.
A clear call-to-action (e.g., "Play the Game") is present.
Tasks:
✅ Design and implement homepage layout.
✅ Add a Cornish-themed background and images.
✅ Write and display a short introduction to Cornwall.

2. Simple Navigation Menu
   User Story:
   As a user, I want to browse a simple navigation menu, so that I can easily find different sections of the website.

Acceptance Criteria:

The menu should include links to Home, Game, Leaderboard, and About.
The menu should be accessible from all pages.
Links should be visually distinct and easy to click.
Tasks:
✅ Design and implement the navigation bar.
✅ Ensure menu links work correctly.
✅ Apply responsive design for mobile and desktop views.

3. Cornwall Introduction Page
   User Story:
   As a visitor, I want to read a short introduction about Cornwall and its culture, so that I understand the theme of the website.

Acceptance Criteria:

A page titled “About Cornwall” exists.
The page includes a short history of Cornwall, its traditions, and famous foods.
At least one image representing Cornwall is included.
Tasks:
✅ Create an "About Cornwall" page.
✅ Write content about Cornwall’s history, culture, and food.
✅ Add relevant images with alt text for accessibility.

4. Playable Whack-a-Mole-Style Game
   User Story:
   As a user, I want to play a Cornish-themed version of Whack-a-Mole, so that I can enjoy a fun and interactive experience.

Acceptance Criteria:

The game starts when the user clicks “Play.”
Cornwall-themed “moles” (e.g., smugglers, piskies, seagulls) pop up randomly.
The user can click/tap to "whack" the characters.
A score counter increases with each successful hit.
Tasks:
✅ Develop game mechanics using JavaScript.
✅ Design and animate Cornwall-themed characters.
✅ Implement score tracking.

5. High Score Saving
   User Story:
   As a returning player, I want my high scores to be saved, so that I can try to beat my previous record.

Acceptance Criteria:

The game saves the highest score achieved by the user in local storage.
When the game starts, the highest score is displayed.
Tasks:
✅ Implement local storage to save high scores.
✅ Display the high score on the game screen.
✅ Add a reset button to clear high scores if needed.

6. Themed Game Characters
   User Story:
   As a player, I want to “whack” Cornish-themed characters (e.g., smugglers, piskies, or seagulls stealing pasties), so that the game feels unique and fun.

Acceptance Criteria:

The game features at least 3 different Cornish characters.
Each character has a unique animation when hit.
Character appearances are randomized.
Tasks:
✅ Design and animate Cornish-themed characters.
✅ Assign different sound effects to each character.
✅ Ensure randomness in character appearances.

7. Score Counter & Timer
   User Story:
   As a player, I want a timer and score counter displayed during the game, so that I can track my progress and compete for a high score.

Acceptance Criteria:

A visible timer counts down from 60 seconds.
The score increases with each successful hit.
When the timer reaches zero, the game ends and displays the final score.
Tasks:
✅ Implement a countdown timer.
✅ Update and display the score as the player hits targets.
✅ Show a game-over screen when time runs out.

8. Increasing Difficulty Levels
   User Story:
   As a player, I want increasing difficulty levels, so that the game becomes more challenging and exciting the longer I play.

Acceptance Criteria:

The speed of character appearances increases as the game progresses.
More characters appear at once after a set time.
Difficulty resets when a new game starts.
Tasks:
✅ Adjust game logic to increase difficulty over time.
✅ Balance game mechanics to maintain fairness.
✅ Test difficulty progression at different levels.

9. Sound Effects & Feedback
   User Story:
   As a player, I want fun Cornish sound effects (e.g., seagull squawks, “Proper Job!” voice clips), so that the game feels lively and engaging.

Acceptance Criteria:

A different sound effect plays for each character hit.
Background music enhances gameplay but can be muted.
A visual effect (e.g., flash or shake) appears when a character is hit.
Tasks:
✅ Select and add appropriate Cornish-themed sounds.
✅ Implement an on/off toggle for sound settings.
✅ Add a small animation or visual cue on successful hits.

10. Leaderboard for Top Scores
    User Story:
    As a competitive user, I want a leaderboard showcasing the top scores, so that I can compete with other players.

Acceptance Criteria:

The top 5 highest scores are displayed on a leaderboard page.
The leaderboard updates in real time.
The player's name or initials can be entered for high scores.
Tasks:
✅ Design and implement the leaderboard UI.
✅ Store and update scores in local storage or a database.
✅ Create a form for players to enter their name when they get a high score.


# Wireframes:

![Balsamiq Desktop Wireframe](assets/images/wireframe-desktop.png)

![Balsamiq Tablet Wireframe](assets/images/wireframe-tablet.png)

![Balsamiq Mobile Wireframe](assets/images/wireframe-mobile.png)

## Cornish Combination

Cornish Combination is a portmanteau creating game, based on the *Answer Smash* round of BBC's *Richard Osman's House of Games*. The player is displayed a question and an image; the last letters of the answer to the question will be the same as the first letters of what is depicted in the image. The player must combine these two words or phrases, overlapping the matching letters, and make a new word or phrase that is a portmanteau of the two. The player has three attempts to get it right before being given the solution and a button to continue to the next question. A score of correct answers is displayed.

### Accessibility

Each image has alt text that does not simply state what the image is as it would give away the answer, so the alt text is descriptive and can effectively be used as a second text question.

### Known Issues

* The game only has three questions and loops indefinitely, therefore the player can gain infinite points after learning the correct answers
* The enter key cannot be used to replace clicking the Next Question button
* The game is not case sensitive but the answer must be an exact match otherwise, with no room for error such as missing "A"s and "The"s

### Roadmap

If work were to continue on the project, the following features would be considered:

* Place the questions in an external file accessed by JavaScript -  they are currently in the JS file
* The game would compare strings and create puzzles dynamically from a large selection of questions and images that share starting and ending letters
* The questions would be randomised
* There would be a way to have close enough but not quite matching answers be accepted
* The game would have flashier styling and animations

## Credits

### Media

* Botanical garden tourist attraction from [Wikimedia](https://commons.wikimedia.org/wiki/File:Eden_project.JPG) - public domain
* Baked pastry from [Wikimedia](https://commons.wikimedia.org/wiki/File:Cornish_pasty.jpeg) - licensed under the Creative Commons Attribution-Share Alike 2.0 UK: England & Wales license
* Red-beaked corvid from [Wikimedia](https://commons.wikimedia.org/wiki/File:Red-billed_chough_(Pyrrhocorax_pyrrhocorax).jpg) - public domain