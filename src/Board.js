import React, { Component } from 'react'
import Square from './Square';

function Board(props) {
    const renderSquare = function(i){
        const isBold = (props.boldSquares[i])? true : false;
        return <Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)} isBold={isBold}/>
    }
    const boards = [];
    for (let i = 0; i < props.size; i++){
        const rows = [];
        for (let j = 0; j < props.size; j++){
            rows.push(
                renderSquare(i * props.size + j)
            )
        }
        boards.push(
            <div key={i} className="board-row">
                    {rows}     
            </div>
        );
    }
    return (
        <div>
            {boards}
        </div>
    )
}

export default Board
