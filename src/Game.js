import React, { useState } from 'react'
import Board from './Board'

function Game(props){
    const [size, setSize] = useState(3);
    const [history, setHistory] = useState([
        {
            squares: Array(size * size).fill(null),
            move: null
        }
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [sortAsc, setSortAsc] = useState(true);

    const handleClick = function(i){
        const historyy = history.slice(0, stepNumber + 1);
        const current = historyy[historyy.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = (xIsNext)? 'X' : 'O';
        setHistory(historyy.concat([{
            squares: squares,
            move: i
        }]));
        setStepNumber(historyy.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = function(step){
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const handleSort = function(){
        setSortAsc(!sortAsc);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const boldSquares = {};
    const sortStr = (!sortAsc)? 'Sort Ascending' : 'Sort Descending';

    const moves = history.map((step, move) => {
        const desc = move? 'Go to move #' + move  + ` ->   At: (Row: ${parseInt(step.move /3 + 1)}, Column: ${parseInt(step.move % 3 + 1)})` 
                        + `, Player: ${(move % 2 != 0)? 'X' : 'O'}`
                    : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    if (!sortAsc){
        moves.reverse();
    }

    let status;
    if (winner){
        winner.forEach((cell, index) => {
            boldSquares[cell] = true;
        })
        status = 'Winner: ' + current.squares[winner[0]];
    } else {
        // Bold last move
        if (current.move != null){
            boldSquares[current.move] = true;
        }
        // Draw
        if (stepNumber == 9){
            status = 'Draw';
        } else {
            status = 'Next player: ' + ((xIsNext)? 'X' : 'O');
        }
    }

    return (
        <div className="game">
            <div className="game-board">
                <div className="status">
                    {status}
                </div>
                <Board 
                    size={size}
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                    boldSquares={boldSquares}
                />
            </div>
            <div className="game-info">
                
            </div>

            <div className="sortWrapper">
                <h3>Sort</h3>
                <button onClick={() => handleSort()}>{sortStr}</button>
            </div>

            <div className="moveHistory">
                <h3>History</h3>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
}

export default Game
