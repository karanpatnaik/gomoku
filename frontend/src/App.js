import { useState } from 'react'; 
import { FiRefreshCw } from "react-icons/fi";


export default function board(){
    const [p1Wins, setp1Wins] = useState(0);
    const [p2Wins, setp2Wins] = useState(0);
    const[currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(null);
    const[board, setBoard] = useState(() => Array.from({length: 15}, () => Array(15).fill('')))
    function restartGame(){
        setBoard(Array.from({ length: 15 }, () => Array(15).fill('')));
        setCurrentPlayer(1);
    }
    function resetScore() {
       setp1Wins(0);
       setp2Wins(0);
     }
    function handleClick(row, col){
        console.log('clicked');
        if(board[row][col] !== ''|| winner ){
            return;
        }
        const newBoard = board.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ?  currentPlayer : cell))
        );
    setBoard(newBoard); 
    if(checkWins(currentPlayer, newBoard, row, col)){
        setWinner(currentPlayer);
        if (currentPlayer === 1) {
            setp1Wins(p1Wins + 1);
        } else {
            setp2Wins(p2Wins + 1);
        }
    }else{
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1); 
    }
    }
    return (
        <div className="board-container">
            <div>
            <ScoreBoard p1Wins={p1Wins} p2Wins={p2Wins}/>
                {board.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((cell, j) => (
                            <Square 
                             key={`${i}-${j}`}
                             value={cell}
                             onSquareClick={() => handleClick(i, j)}
                             hasDot = {hasDot(i, j)}
                             currentPlayer={currentPlayer}
                             isOccupied={cell !== ''}
                             hasWinner={winner}
                            />
                        ))}
                </div>
                ))}
              <div className="restart">
                  <button className="restart-button" onClick={restartGame}>
                     <FiRefreshCw size={24} />
                   </button>
             </div>
            </div>
        </div>
    )
}
function Square({ value, onSquareClick, hasDot, currentPlayer, isOccupied }) {
    const [hovered, setHovered] = useState(false);
    const showPreview = !isOccupied && hovered;
  
    let stoneClass = "";
    if (value === 1) stoneClass = "stone black";
    else if (value === 2) stoneClass = "stone white";
  
    let previewClass = "";
    if (showPreview) {
      previewClass = currentPlayer === 1 ? "stone preview black" : "stone preview white";
    }
  
    return (
      <button
        className="square"
        onClick={onSquareClick}
        onMouseEnter={() => {
          console.log('hovered');
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}

      >
        {/* Real stone */}
        {value !== '' && <div className={stoneClass}></div>}
  
        {/* Ghost stone preview */}
        {showPreview && <div className={previewClass}></div>}
  
        {/* Board dot */}
        {hasDot && <div className="dot"></div>}
      </button>
    );
  }
   /*   
    let stoneClass = ""; 
    if(value === 1) stoneClass = "stone black";
    else if (value === 2) stoneClass = "stone white"; 
    return(
      <button className="square" onClick={onSquareClick} >
        <div className={stoneClass}></div>
        {hasDot && <div className="dot"></div>}
      </button>
    */

function hasDot(i, j){
    return(
        (i === 6 && j === 6) || 
        ((i === 2 || i === 10) &&
        (j ===2 || j=== 10)
        )   
    );
}
function ScoreBoard({p1Wins, p2Wins}){
    return(
      <div className="scoreboard">
         <h1 className="score p1Wins"> {p1Wins}</h1>
          <h1 className="seperator"> - </h1>
        <h1 className="score p2Wins"> {p2Wins}</h1>
      </div>
    )
  }
function checkWins(currentPlayer, board, row, col){
    const player = board[row][col];
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    const isValid = (r,c) => r >= 0 && r < 15 && c>=0 && c < 15;
    for(let [dr, dc] of directions){
        let count = 1; 

        //forwards
        let r = row + dr, c = col + dc; 
        while(isValid(r,c)  && board[r][c] === player){
            count++;
            r+= dr;
            c+= dc; 
        }
        //backwards
        r = row - dr; c = col - dc; 
        while(isValid(r,c) && board[r][c] === player){
            count++; 
            r -= dr; 
            c -= dc; 
        }
        if(count >= 5){
            return true; 
        }
    }
    return false; 
    

}