import React from 'react';
import Row from './eachRow.jsx';

const Board = props => (
  <div>
    <div className="board">
      {props.board.map((row, index) => {
        return (
          <Row
            key={index}
            row={row}
            rowIndex={index}
            togglePiece={props.onToggleColorPiece}
            playersOneTurn={props.isPlayerOneTurn}
            fillinColFromBottom={props.fillinColFromBottom}
          />
        );
      })}
    </div>
  </div>
);

export default Board;
