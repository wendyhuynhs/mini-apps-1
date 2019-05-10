import React from 'react';

class Circle extends React.Component {
    constructor(props){
        super(props);

        this.setPieceColor = this.setPieceColor.bind(this);
    }

    setPieceColor() {
        this.props.fillinColFromBottom(this.props.rowIndex, this.props.colIndex);
    }

    render() {
        var color = this.props.column === 1 ? '#A10000' : this.props.column === 2 ? '#191919' : 'white';
        return (
            <div className="circle" id={`${this.props.rowIndex} ${this.props.colIndex}`} 
                onClick={this.setPieceColor} style={{ backgroundColor : color }}>
            </div>      
        );
    }   

}

export default Circle;