import { useState, useEffect} from 'react'; 
import brownLogo from './assets/biglog.png';
import whiteLogo from './assets/whiteLog.png';
import orangeCat from './assets/orangeCat.png';
import blackCat  from './assets/blackCat.png';
import { FaPaw } from "react-icons/fa";
import { FaCat } from 'react-icons/fa';
import { TbCat } from "react-icons/tb";
import { FaCrown } from "react-icons/fa6";
import stoneSound from "./assets/stoneDrop.mp3";
import Switch from './Switch.js';
import shuffle from './assets/shuffle.mp3'; 
import meowSound from './assets/meow.mp3'; 
import bigEyeCat from './assets/pfps/bigEyeCat.jpg';
import blankPf from './assets/pfps/blankPf.jpg';
import bunnyCat from './assets/pfps/bunnyCat.jpeg';
import hatCat from './assets/pfps/hatCat.jpg';
import santaCat from './assets/pfps/santaCat.png';
import wiseCat from './assets/pfps/wiseCat.jpg';
import zoomCat from './assets/pfps/zoomCat.jpg';
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";



import { RiResetLeftFill } from "react-icons/ri";

export default function board(){
    const [profilePicture, setProfilePicture] = useState(blankPf);
    const [dropSound, setDropSound] = useState(stoneSound);
    const [p1Wins, setp1Wins] = useState(0);
    const [p2Wins, setp2Wins] = useState(0);
    const [userName, setUserName] = useState("Unknown Cat");
    const [draftName,setDraftName] = useState(userName);
    const [isEditingName, setIsEditingName] = useState(false); 
    const[currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(null);
    const [pfpWindowOn, togglePfpWindow] = useState(false); 
    const[board, setBoard] = useState(() => Array.from({length: 15}, () => Array(15).fill('')))
    const [darkMode, setDarkMode] = useState(false);
    const finishEditing = () => {
      let trimmed = draftName.trim();
      if (!trimmed) {
        // if blank, revert to previous username
        setDraftName(userName);
      } else {
        setUserName(trimmed);
      }
      setIsEditingName(false);
    };
    function restartGame(){
        setBoard(Array.from({ length: 15 }, () => Array(15).fill('')));
        setCurrentPlayer(1);
        setWinner(false);
        const resetAudio = new Audio(shuffle);
        resetAudio.play().catch((_) => {
        });

    }
    function toggleSound(){
      dropSound === stoneSound ? setDropSound(meowSound) : setDropSound(stoneSound);
    }
    function handleClick(row, col){
        console.log('clicked');
        if(board[row][col] !== ''|| winner || row === 14 || col === 14){
            return;
        }
        const audio = new Audio(dropSound);
        audio.play().catch((_) => {
        });
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

    useEffect(() => {
      document.body.classList.toggle('nightmode', darkMode);
    }, [darkMode]);
    return (
      <div className= "app-container" > 
        <div className='header'>
            <img src={brownLogo} alt="Gomeowku Logo" className={darkMode ? "logo whiteLogo" : "logo"} />
            <button className='nightmode-switch' onClick = {()=> setDarkMode(!darkMode)}> {darkMode ? <IoSunnySharp size={50} color={"yellow"}> </IoSunnySharp> : <FaMoon size= {50} > </FaMoon>} </button>
        </div>
        <div className='lower'> 
          <div className='leftside'> 
              <img src={orangeCat} className="orangeCat"/>
          </div>
           <div className='middle'>
              <div className="board-wrapper">
                <div className="board-container"> 
                   <div>
                       {board.map((row, i) => (
                          <div key={i} className="row">
                             {row.map((cell, j) => (
                               <Square 
                                key={`${i}-${j}`}
                                i ={i}
                                j = {j}
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
                     </div>
                </div>
             </div>
          </div>
          <div className='rightside'>
                <img src={blackCat} className='blackCat'/>
          </div>
 
        </div>
        <div className="belowBoard">
             <div className='profileWidget'> 
                  <div className='widgetProfilePictureWrapper'>
                      <button onClick ={() => togglePfpWindow(true)}>
                        <img className ='widgetProfilePicture' src={profilePicture}/>
                      </button>
                </div>

               <div className = 'widgetUserName'>
                  {isEditingName ? (
                     <input
                           maxlength="12"
                           type="text"
                           className="edit-username-input"
                           value={draftName}
                           autoFocus
                           onChange={(e) => setDraftName(e.target.value)}
                           onBlur={finishEditing}
                           onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    finishEditing();
                                } else if (e.key === "Escape") {
                                // cancel edit on Escape
                                    setDraftName(userName);
                                    setIsEditingName(false);
                                }
                           }}
                       />
                   ) : (
                       <span
                           className="username-display"
                           onClick={() => {
                              setDraftName(userName);
                              setIsEditingName(true);
                           }}>
                            {userName}
                        </span>
                       ) 
                  } 
              </div> 
            </div>
             <div className="restart">
                  <button className="restart-button" onClick={restartGame}>
                    <RiResetLeftFill size={24} />
                   </button>
             </div>
             <div className="soundSwitch">
                <Switch checked={dropSound === meowSound} onChange={() => toggleSound()}>  </Switch>
             </div>
        </div>
          {pfpWindowOn && <PfpPopUp onClose={() => togglePfpWindow(false)} />}
        
        {winner && <WinPopUp winner={winner} onPlayAgain={restartGame} />}
        </div>
        

      ) 
    

function Square({ i, j, value, onSquareClick, hasDot, currentPlayer, isOccupied }) {
    const [hovered, setHovered] = useState(false);
    const showPreview = !isOccupied && hovered && !winner && i !== 14 && j !== 14;
  
    let stoneClass = "";
    if (value === 1) stoneClass = "stone black";
    else if (value === 2) stoneClass = "stone white";
  
    let previewClass = "";
    if (showPreview) {
      previewClass = "preview";
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
        {value !== '' && <div className={stoneClass}>
          <div className="catFace">
            <TbCat size={20} color={stoneClass === "stone black" ? "white" : "black"} />
          </div>
          </div>}
  
        {/* Ghost stone preview */}
        {showPreview && <div className={previewClass}>
           <FaCat size={20} color={currentPlayer === 1 ? "black" : "white"} />

          </div>}
  
        {/* Board dot */}
        {hasDot && <div className="dot"></div>}
      </button>
    );
  }
   

function hasDot(i, j){
    return(
        (i === 6 && j === 6) || 
        ((i === 2 || i === 10) &&
        (j ===2 || j=== 10)
        )   
    );
}
function WinPopUp({winner, onPlayAgain}){
    return(
        <div className='winPopUpWindow ' >
            <div className='winPopUp'> 
              <div className ='winLogo'>
                <div className='Crown'> 
                    <FaCrown size={30}color={"#FFD700"}></FaCrown>
                   </div> 
                   <div className='winCat'> 
                    <FaCat size={100} color={winner === 1 ? "black" : "white"}/>
                </div>
              </div> 
                <button className = {"playAgain" + (winner === 1 ? " winnerBlack" : " winnerWhite")} onClick={onPlayAgain}> <RiResetLeftFill size ={80}> </RiResetLeftFill></button>
              </div>
          </div>
 
    )  
}
function PfpPopUp({onClose}){
  return(
    <div className='pfpPopUp'>
      <div className='pfpPopUpRow'>
          <button className='profilePictureWrapper' onClick={()=> {setProfilePicture(bigEyeCat); onClose();}}> <img className ='pfp' src={bigEyeCat} /></button>
          <button className='profilePictureWrapper' onClick={()=> {setProfilePicture(bunnyCat); onClose();}}> <img className ='pfp' src={bunnyCat} /></button>
          <button className='profilePictureWrapper' onClick={()=> {setProfilePicture(hatCat); onClose();}}> <img className ='pfp' src={hatCat} /></button>
      </div>
      <div className='pfpPopUpRow'>
         <button className='profilePictureWrapper' onClick={()=> {setProfilePicture(santaCat); onClose();}}> <img className ='pfp' src={santaCat} /></button>
          <button className='profilePictureWrapper' onClick={()=> {setProfilePicture(wiseCat); onClose();}}> <img className ='pfp' src={wiseCat} /></button>
          <button className='profilePictureWrapper' onClick={()=> {setProfilePicture(zoomCat); onClose();}}> <img className ='pfp' src={zoomCat} /></button>
       </div>
    </div>

  )
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
  };
}