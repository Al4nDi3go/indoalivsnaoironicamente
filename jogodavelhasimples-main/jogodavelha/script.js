window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const playerXWinsDisplay = document.querySelector('.playerXWins');
    const playerOWinsDisplay = document.querySelector('.playerOWins');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'Indo ali'; // Alterado para "Indo ali"
    let isGameActive = true;
    let xWins = 0;
    let oWins = 0;

    const indoaliImage = '<img src="imagens/indoali.png">'; // Alterado para imagem de "Indo ali"
    const naoironicamenteImage = '<img src="imagens/naoironicamente.png">'; // Alterado para imagem de "Não ironicamente"
    const empate = 'empate';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isValidAction = (tile) => {
        if (tile.innerHTML === indoaliImage || tile.innerHTML === naoironicamenteImage) {
            return false;
        }
        return true;
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'Indo ali' ? 'Não ironicamente' : 'Indo ali'; // Alterado para alternar entre "Indo ali" e "Não ironicamente"
        playerDisplay.innerHTML = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const announce = (type) => {
        switch (type) {
            case naoironicamenteImage:
                announcer.innerHTML = '<span class="playerO">Não Ironicamente</span> ganhou';
                break;
            case indoaliImage:
                announcer.innerHTML = '<span class="playerX">Indo Ali</span> ganhou';
                break;
            case empate:
                announcer.innerText = 'Empate';
        }
        announcer.classList.remove('hide');
    };

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winnerImage = currentPlayer === 'Indo ali' ? indoaliImage : naoironicamenteImage;
            announce(winnerImage);
            if (currentPlayer === 'Indo ali') {
                xWins++;
            } else {
                oWins++;
            }
            updateWinCount();
            isGameActive = false;
            return;
        }

        if (!board.includes("")) {
            announce(empate);
        }
    }

    function updateWinCount() {
        playerXWinsDisplay.textContent = `Vitórias Indo ali: ${xWins}`;
        playerOWinsDisplay.textContent = `Vitórias Não ironicamente: ${oWins}`;
    }

    updateWinCount();

    const userAction = (tile) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerHTML = currentPlayer === 'Indo ali' ? indoaliImage : naoironicamenteImage;
            tile.classList.add(`player${currentPlayer}`);
            const index = tiles.indexOf(tile);
            board[index] = currentPlayer;
            handleResultValidation();
            changePlayer();
        }
    };

    tiles.forEach((tile) => {
        tile.addEventListener('click', () => userAction(tile));
    });

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'Não ironicamente') {
            changePlayer();
        }

        tiles.forEach((tile) => {
            tile.innerHTML = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    };

    resetButton.addEventListener('click', resetBoard);
});
