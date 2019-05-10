import React from 'react';
import Column from './column.jsx';

const Row = () => (
  <div className="row">
    {this.props.row.map((column, index) => {
      return (
        <Column
          key={index}
          column={column}
          colIndex={index}
          rowIndex={this.props.rowIndex}
          togglePiece={this.props.togglePiece}
          playersOneTurn={this.props.playersOneTurn}
          fillinColFromBottom={this.props.fillinColFromBottom}
        />
      );
    })}
  </div>
);

export default Row;
