# Kahoot like application
## Install
`npm install` in `backend` and `frontend` directories.

Before running the app, you have to create a `.env` file in `backend` directory and add `OPEN_API_KEY` with your openai key. If not, it will use the FakeApiService which returns a default game.
## Run

`npm run start` in `backend` directory.

`npm run dev` in `frontend` directory.

This application is accessible from the url `http://localhost:3000`.

## Docker
Go to the `docker` directory, and run `docker-compose up` (or `docker compose up` depending on your docker installation).

## Realization
The team is composed of [Alexandre Monier](https://github.com/Alexti2d), [Bastien Takis](https://github.com/bastien15000) and [Myke Chastang](https://github.com/AlbertMcAvoy).

Alexandre realized the ResultPage component used to print players scores and the resolution of a round (player answers, wait for the next round and print the next question).

Bastien used the ResultPage to print the players scores for each round (instead of printing the scores between rounds).

Myke built the backend application, the Main and Lobby page, the timer and helped Alexandre and Bastien with React issues.
He also realised the docker environment.

## Instructions
## Dynamic Custom Topic Quiz Challenge: Project Description

Step into the future of trivia with the Dynamic Custom Topic Quiz Challenge, a revolutionary quiz platform where you're in control. Select from an endless array of topics and tailor your gameplay with difficulty settings. Immerse in the thrill of real-time, multiplayer action and compete for high scores. Seamlessly balanced with advanced security and rapid-fire performance - no lag, no downtime, just pure knowledge and fun. This is where instant gratification meets the intellect. Get ready to challenge your brain, climb the leaderboards, and be part of a vibrant trivia community. Are you up for the challenge?

### Essential Features

#### Topic Selection
- **Multiple Topic Choice:** Enables players to handpick their preferred quiz topics from a diverse selection.
- **Selective Difficulty Levels:** Allows players to adjust the challenge level of their quizzes.
- **Randomized Topic Mix Option:** Offers a randomized topic selection for a more varied quiz experience.

#### OpenAI API Integration
- **Real-time Question Generation:** Utilizes the OpenAI API to craft unique, on-the-spot questions each quiz round.
- **Contextual Hints and Explanations:** Provides players with hints during the quiz and explanations after answering, leveraging OpenAI's information processing capabilities.

#### Live Multiplayer Sessions
- **Private/Public Game Rooms:** Players can join public game rooms or create private ones for an exclusive group experience.
- **Instant Player Joining:** Ensures a fluid game joining process for players who wish to participate in ongoing quiz games.

#### Scoring System
- **Points Based on Response Accuracy:** Points are awarded for each correct answer, encouraging the accuracy of responses.
- **Bonus Points for Speed:** Time-based point bonuses add a competitive element to the game, rewarding quick-witted players.

#### Game Rounds
- **Configurable Number of Questions:** Players have control over the number of questions per quiz, allowing for quick or extended play.
- **Option to Set Round Limits:** Provides the flexibility to set a fixed number of rounds, catering to different game session lengths.

### Technical Bonuses

#### Security Enhancements
- **JWT Authentication:** Introduces a secure token-based system to manage user sessions and access control.

#### Performance Features
- **Caching:** Implements strategic data caching to decrease latency, enhance the user experience, and minimize API requests to OpenAI.

#### Scalability Additions
- **Horizontal Scaling with Redis:** Adopts Redis for session and state management in a distributed server environment, facilitating smooth performance even during high load and ensuring the system can scale out efficiently.
