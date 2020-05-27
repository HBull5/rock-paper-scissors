class Game {
	constructor(scoreBoard, log) {
		this.playerScore = 0;
		this.botScore = 0;
		this.scoreBoard = scoreBoard;
		this.log = log;
	}

	rock(choice) {
		if (choice == "scissors") {
			return true;
		} else {
			return false;
		}
	}

	paper(choice) {
		if (choice == "rock") {
			return true;
		} else {
			return false;
		}
	}

	scissors(choice) {
		if (choice == "paper") {
			return true;
		} else {
			return false;
		}
	}

	updateScoreBoard(playerChoice, botChoice, playerWin) {
		let playerScoreClass, botScoreClass, playerChoiceClass, botChoiceClass;
		if (this.playerScore == this.botScore) {
			playerScoreClass = "tie";
			botScoreClass = "tie";
		} else if (this.playerScore > this.botScore) {
			playerScoreClass = "win";
			botScoreClass = "lose";
		} else {
			playerScoreClass = "lose";
			botScoreClass = "win";
		}
		if (playerChoice == botChoice) {
			playerChoiceClass = "tie";
			botChoiceClass = "tie";
		} else if (playerWin) {
			playerChoiceClass = "win";
			botChoiceClass = "lose";
		} else {
			playerChoiceClass = "lose";
			botChoiceClass = "win";
		}
		this.scoreBoard.innerHTML = `<h3 class="${playerScoreClass}">Player: ${this.playerScore}</h3>
        <h3 class="${botScoreClass}">Bot: ${this.botScore}</h3>`;
		this.log.innerHTML += `<p><span class="${playerChoiceClass}">Player: ${playerChoice}</span> | 
        <span class="${botChoiceClass}">Bot: ${botChoice}</span></p>`;
	}

	reset() {
		this.playerScore = 0;
		this.botScore = 0;
		this.scoreBoard.innerHTML = `<h3 class="tie">Player: 0</h3>
        <h3 class="tie">Bot: 0</h3>`;
		this.log.innerHTML = "";
	}

	opponentChoice() {
		let choice = "";
		const rand = Math.floor(Math.random() * 3) + 1;
		if (rand == 1) {
			choice = "rock";
		} else if (rand == 2) {
			choice = "paper";
		} else {
			choice = "scissors";
		}
		return choice;
	}

	whoWins(choice) {
		const botChoice = this.opponentChoice();
		let playerWin = false;
		let botWin = false;
		if (choice == botChoice) {
			this.updateScoreBoard(choice, botChoice, playerWin);
		} else {
			if (choice == "rock") {
				if (this.rock(botChoice)) {
					playerWin = true;
				} else {
					botWin = true;
				}
			} else if (choice == "paper") {
				if (this.paper(botChoice)) {
					playerWin = true;
				} else {
					botWin = true;
				}
			} else if (choice == "scissors") {
				if (this.scissors(botChoice)) {
					playerWin = true;
				} else {
					botWin = true;
				}
			}
			if (playerWin) {
				this.playerScore++;
			} else if (botWin) {
				this.botScore++;
			}
			this.updateScoreBoard(choice, botChoice, playerWin);
		}
	}
}

let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors");
let scoreBoard = document.querySelector(".score-board");
let log = document.querySelector(".log");
let reset = document.querySelector("#reset");
const myGame = new Game(scoreBoard, log);
rock.addEventListener("click", () => myGame.whoWins("rock"));
paper.addEventListener("click", () => myGame.whoWins("paper"));
scissors.addEventListener("click", () => myGame.whoWins("scissors"));
reset.addEventListener("click", () => myGame.reset());
