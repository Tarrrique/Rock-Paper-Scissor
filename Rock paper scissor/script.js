let playerScore = 0;
let computerScore = 0;
let rounds = 0;
let timer;

function playGame(playerChoice) {
    if (timer) {
        clearTimeout(timer);
    }

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    const result = getResult(playerChoice, computerChoice);
    updateScore(result);

    rounds++;
    displayResult(playerChoice, computerChoice, result);

    if (playerScore === 5 || computerScore === 5) {
        endGame();
    } else {
        startCountdown();
    }
}

function startCountdown() {
    let seconds = 20;
    document.getElementById('timer').innerHTML = `Time left: ${seconds}s`;

    timer = setInterval(() => {
        seconds--;

        if (seconds >= 0) {
            document.getElementById('timer').innerHTML = `Time left: ${seconds}s`;
        } else {
            clearTimeout(timer);
            document.getElementById('timer').innerHTML = 'Time\'s up!';
            disableButtons();
        }
    }, 1000);
}

function getResult(player, computer) {
    if (player === computer) {
        return 'tie';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
}

function displayResult(player, computer, result) {
    const resultMessage = getResultMessage(result);
    const playerChoiceElement = capitalizeFirstLetter(player);
    const computerChoiceElement = capitalizeFirstLetter(computer);

    document.getElementById('result').innerHTML = `${playerChoiceElement} vs ${computerChoiceElement}: ${resultMessage}`;
    document.getElementById('player-score').innerHTML = `Player: ${playerScore}`;
    document.getElementById('computer-score').innerHTML = `Computer: ${computerScore}`;
}

function getResultMessage(result) {
    if (result === 'win') {
        return 'You Win!';
    } else if (result === 'lose') {
        return 'You Lose!';
    } else {
        return 'It\'s a Tie!';
    }
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function endGame() {
    let gameOverMessage = '';
    if (playerScore > computerScore) {
        gameOverMessage = 'Congratulations! You won the game!';
    } else if (playerScore < computerScore) {
        gameOverMessage = 'Sorry! You lost the game.';
    } else {
        gameOverMessage = 'It\'s a tie! Play again.';
    }

    document.getElementById('game-over').innerHTML = gameOverMessage;
    disableButtons();
    clearInterval(timer);
    document.getElementById('timer').innerHTML = '';
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    rounds = 0;
    document.getElementById('result').innerHTML = '';
    document.getElementById('game-over').innerHTML = '';
    document.getElementById('player-score').innerHTML = 'Player: 0';
    document.getElementById('computer-score').innerHTML = 'Computer: 0';
    enableButtons();
    clearInterval(timer);
    document.getElementById('timer').innerHTML = '';
}

function disableButtons() {
    const buttons = document.querySelectorAll('.choices button');
    buttons.forEach(button => button.disabled = true);
}

function enableButtons() {
    const buttons = document.querySelectorAll('.choices button');
    buttons.forEach(button => button.disabled = false);
}

