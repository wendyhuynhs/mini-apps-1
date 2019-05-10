import React from 'react';
import Circle from './circle.jsx';

const Column = (props) => (
    <div className="column">
        <Circle 
            column={props.column}
            colIndex={props.colIndex} 
            rowIndex={props.rowIndex}
            togglePiece={props.togglePiece} 
            playersOneTurn={props.playersOneTurn} 
            fillinColFromBottom={props.fillinColFromBottom} 
            key={props.recentAddedCol}
        />
    </div>
);

export default Column;