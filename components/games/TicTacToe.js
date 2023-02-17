import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';


export default function TicTacToe( props ) {

  const { setPlayerScore } = useContext(GameContext)

  const [gameMatrix, setGameMatrix] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState(0);

  const restartGameMatrix = () => {
    setGameMatrix(Array(9).fill(null))     
  }

  const setSquareValue = (ind) => {
    let newData = [...gameMatrix]
    if (newData[ind] == null) {
      newData[ind] = player
    } else {
      return
    }
    setGameMatrix(newData);
    const winner = checkForWin(newData);
    if (winner) {
      //alert(`We have a winner! Player ${player ? 'X' : 'O'} has won the game with ${winner} points!`);
      setPlayerScore(winner);
      setWinner(true);
      setScore(winner);
    }
    setPlayer(!player);
  }

  const checkForWin = (gameMatrix) => {
    let merit = 0;
    if (!player) {
      merit = 400
    }
    if ((gameMatrix[0] == gameMatrix[1] && gameMatrix[0] == gameMatrix[2]) && gameMatrix[0]!= null) {
      return 500+merit
    }
    if ((gameMatrix[3] == gameMatrix[4] && gameMatrix[3] == gameMatrix[5]) && gameMatrix[3]!= null) {
      return 1000+merit
    }
    if ((gameMatrix[6] == gameMatrix[7] && gameMatrix[6] == gameMatrix[8]) && gameMatrix[6]!= null) {
      return 1500+merit
    }
    if ((gameMatrix[0] == gameMatrix[3] && gameMatrix[0] == gameMatrix[6]) && gameMatrix[0]!= null) {
      return 2500+merit
    }
    if ((gameMatrix[1] == gameMatrix[4] && gameMatrix[1] == gameMatrix[7]) && gameMatrix[1]!= null) {
      return 3500+merit
    }
    if ((gameMatrix[2] == gameMatrix[5] && gameMatrix[2] == gameMatrix[8]) && gameMatrix[2]!= null) {
      return 2000+merit
    }
    if ((gameMatrix[0] == gameMatrix[4] && gameMatrix[0] == gameMatrix[8]) && gameMatrix[0]!= null) {
      return 3000+merit
    }
    if ((gameMatrix[2] == gameMatrix[4] && gameMatrix[2] == gameMatrix[6]) && gameMatrix[2]!= null) {
      return 9000+merit
    }
    return false;
  }

  const handleClick = (ind) =>{
    if (!winner) {
      setSquareValue(ind)
    };
  }

  const handleReset= () => {
    setWinner(null);
    setPlayer(true);
    restartGameMatrix();
  }

    return (
      <>
        <div className='flexcenter' style={ {width: '100%', flexDirection:'column'} }>
          <div className='flexcenter'>
            <h1 className='Game-title'>Tic Tac Toe</h1>
          </div>
          <section className="TTT-section">
            <div>
              {Array(9).fill(null).map((_, i) => {
                  return <button
                  onClick={() => handleClick(i)}
                  key={i}
                  className={gameMatrix[i]==null ? 'TTTButton' : gameMatrix[i] ? 'TTTButton TTT-X' : 'TTTButton TTT-O'}
                  value={gameMatrix[i]}>{gameMatrix[i]==null ? 'X' : gameMatrix[i] ? 'X' : 'O'}</button>
                })
              } 
            </div>
            <span className='TTT-score'>{winner ? `Score: ${score}` : ' '}</span>          
            <button className='TTT-reset' onClick={handleReset}>Reset</button>  
          </section>
        </div>
      </>
    )
  }