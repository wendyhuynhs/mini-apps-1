import React from 'react';
import Board from './board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      isPlayerOneTurn: true,
      isWinner: null
    };

    this.onToggleColorPiece = this.onToggleColorPiece.bind(this);
    this.fillinColFromBottom = this.fillinColFromBottom.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.checkForTie = this.checkForTie.bind(this);
    this.reset = this.reset.bind(this);
  }

  onToggleColorPiece() {
    this.setState({ isPlayerOneTurn: !this.state.isPlayerOneTurn });
  }

  fillinColFromBottom(row, col) {
    if (this.state.board[0][col] === null) {
      var row = 5;

      while (this.state.board[row][col] !== null && row !== 0) {
        row--;
      }
      if (row >= 0) {
        var currentBoard = this.state.board.map(function(arr) {
          return arr.slice();
        });
        currentBoard[row][col] = this.state.isPlayerOneTurn ? 1 : 2;

        this.setState({ board: currentBoard }, () => {
          this.checkForWin(row, col);
          this.onToggleColorPiece();
        });
      }
    }
  }

  checkForWin(row, col) {
    var player = this.state.isPlayerOneTurn ? 1 : 2;
    for (var c = 0; c < 4; c++) {
      if (
        this.state.board[row][c] === player &&
        this.state.board[row][c + 1] === player &&
        this.state.board[row][c + 2] === player &&
        this.state.board[row][c + 3] === player
      ) {
        this.setState(
          { isWinner: this.state.isPlayerOneTurn ? '1' : '2' },
          () => {
            console.log(this.state.isWinner);
            document.querySelector('.board').style.pointerEvents = 'none';
          }
        );
      }
    }

    // check for win vertical
    for (var r = 0; r < 3; r++) {
      if (
        this.state.board[r][col] === player &&
        this.state.board[r + 1][col] === player &&
        this.state.board[r + 2][col] === player &&
        this.state.board[r + 3][col] === player
      ) {
        this.setState(
          { isWinner: this.state.isPlayerOneTurn ? '1' : '2' },
          () => {
            console.log(this.state.isWinner);
            document.querySelector('.board').style.pointerEvents = 'none';
          }
        );
      }
    }

    var diagonal = col - row;
    var fourInARowMajor = 0;
    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        if (c - r === diagonal) {
          if (this.state.board[r][c] === player) {
            fourInARowMajor++;
          } else {
            fourInARowMajor = 0;
          }
        }
      }
    }

    if (fourInARowMajor === 4) {
      console.log('WINNER');
      this.setState(
        { isWinner: this.state.isPlayerOneTurn ? '1' : '2' },
        () => {
          console.log(this.state.isWinner);
          document.querySelector('.board').style.pointerEvents = 'none';
        }
      );
    }

    var diagonal = col + row;
    var fourInARowMinor = 0;
    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        console.log('row:', r, 'col', c);
        if (c + r === diagonal) {
          if (this.state.board[r][c] === player) {
            fourInARowMinor++;
          } else {
            fourInARowMinor = 0;
          }
        }
      }
    }

    if (fourInARowMinor === 4) {
      this.setState(
        { isWinner: this.state.isPlayerOneTurn ? '1' : '2' },
        () => {
          document.querySelector('.board').style.pointerEvents = 'none';
        }
      );
    }
  }

  checkForTie() {
    var nullCt = 0;
    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        if (this.state.board[r][c] === null) {
          nullCt++;
        }
      }
    }
    if (nullCt === 42) {
      console.log('Tie!');
    }
  }

  reset(e) {
    e.preventDefault();
    var emptyBoard = [];
    for (var i = 0; i < 6; i++) {
      var row = [];
      for (var j = 0; j < 7; j++) {
        row.push(null);
      }
      emptyBoard.push(row);
    }

    this.setState({ board: emptyBoard }, () => {
      this.setState({ isWinner: null }, () => {
        this.setState({ isPlayerOneTurn: true }, () => {
          document.querySelector('.board').style.pointerEvents = 'auto';
        });
      });
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-description">
          <div className="instructions">
            Click on the first row, to choose where you want your piece to go
          </div>
          {this.state.isWinner === null && (
            <div className="players">
              <div
                className="turn player1"
                style={{
                  display: this.state.isPlayerOneTurn ? 'block' : 'none'
                }}
              >
                Player 1 Turn
              </div>
              <div
                className="turn player2"
                style={{
                  display: this.state.isPlayerOneTurn ? 'none' : 'block'
                }}
              >
                Player 2 Turn
              </div>
            </div>
          )}
          {this.state.isWinner !== null && (
            <div className="finished">
              <div className="winner">
                <div className="winner-description">
                  Player<span>{this.state.isWinner}</span> has won!!!!
                </div>
              </div>
              <button className="reset" onClick={e => this.reset(e)}>
                RESET!!!
              </button>
            </div>
          )}
        </div>
        <Board
          board={this.state.board}
          onToggleColorPiece={this.onToggleColorPiece}
          isPlayerOneTurn={this.state.isPlayerOneTurn}
          fillinColFromBottom={this.fillinColFromBottom}
        />
      </div>
    );
  }
}

export default App;
