import React from 'react';
import './ConnectFour.css';

class ConnectFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialMatrix: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
            currentPlayer: 1
        };
    }

    fillBox = (e) => {
        const colValue = parseInt(e.target.getAttribute("data-value"));
        this.setPiece(5, colValue);
        this.setState(prevState => ({
            currentPlayer: prevState.currentPlayer === 1 ? 2 : 1
        }));
    }

    setPiece = (startCount, colValue) => {
        const { initialMatrix, currentPlayer } = this.state;
        const rows = document.querySelectorAll(".grid-row");

        try {
            while (initialMatrix[startCount][colValue] !== 0) {
                startCount--;
            }
            const currentRow = rows[startCount].querySelectorAll(".grid-box");
            currentRow[colValue].classList.add(`filled`, `player${currentPlayer}`);
            initialMatrix[startCount][colValue] = currentPlayer;

            if (this.winCheck()) {
                alert(`Player ${currentPlayer} wins!`);
            }
        } catch (e) {
            alert("Column full, select again");
        }

        this.gameOverCheck();
    }

    winCheck = () => {
        return (
            this.checkHorizontal() ||
            this.checkVertical() ||
            this.checkPositiveDiagonal() ||
            this.checkNegativeDiagonal()
        );
    }

    checkHorizontal = () => {
        const { initialMatrix, currentPlayer } = this.state;
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (
                    initialMatrix[row][col] === currentPlayer &&
                    initialMatrix[row][col + 1] === currentPlayer &&
                    initialMatrix[row][col + 2] === currentPlayer &&
                    initialMatrix[row][col + 3] === currentPlayer
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    checkVertical = () => {
        const { initialMatrix, currentPlayer } = this.state;
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                if (
                    initialMatrix[row][col] === currentPlayer &&
                    initialMatrix[row + 1][col] === currentPlayer &&
                    initialMatrix[row + 2][col] === currentPlayer &&
                    initialMatrix[row + 3][col] === currentPlayer
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    checkPositiveDiagonal = () => {
        const { initialMatrix, currentPlayer } = this.state;
        for (let row = 3; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (
                    initialMatrix[row][col] === currentPlayer &&
                    initialMatrix[row - 1][col + 1] === currentPlayer &&
                    initialMatrix[row - 2][col + 2] === currentPlayer &&
                    initialMatrix[row - 3][col + 3] === currentPlayer
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    checkNegativeDiagonal = () => {
        const { initialMatrix, currentPlayer } = this.state;
        for (let row = 3; row < 6; row++) {
            for (let col = 3; col < 7; col++) {
                if (
                    initialMatrix[row][col] === currentPlayer &&
                    initialMatrix[row - 1][col - 1] === currentPlayer &&
                    initialMatrix[row - 2][col - 2] === currentPlayer &&
                    initialMatrix[row - 3][col - 3] === currentPlayer
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    gameOverCheck = () => {
        const { initialMatrix } = this.state;
        let count = 0;

        for (let row = 0; row < 6; row++) {
            if (initialMatrix[row].every(val => val !== 0)) {
                count++;
            }
        }

        if (count === 6) {
            alert("Game over");
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="grid-row">
                            {[...Array(7)].map((_, j) => (
                                <div
                                    key={j}
                                    className="grid-box"
                                    data-value={j}
                                    onClick={(e) => this.fillBox(e)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
                <div id="information">
                    <div className="player-wrappers">
                        Player 1
                        <div className="player1"></div>
                    </div>
                    <div className="player-wrappers">
                        Player 2
                        <div className="player2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConnectFour;
