import { useEffect, useState, useContext, useCallback } from 'react';
import { GameContext } from '../../Context/GameContext';

export default function XenoClicker({}) {
    const { setPlayerScore } = useContext(GameContext);
    const [radius, setRadius] = useState(null);
    const [gameState, setGameState] = useState(false);
    const [clicks, setClicks] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [resetStatus, setResetStatus] = useState(true);

    
    const decrementTimer = useCallback(()=>{
        setRadius(prev => prev-1)
    },[])
    
    useEffect(()=>{
        if (gameState && !resetStatus) {
            if (radius <= 0) {
                endGame();
            } else {
                const timeOutFunction = setInterval(decrementTimer, 5);
                return () => clearInterval(timeOutFunction)
            }
        } else return
    },[decrementTimer, radius])
    
    const handleClick = () => {
        if (gameState) {
            setCurrentScore(prev => prev+radius)
            setClicks(prev => prev+1);
            setRadius(100-clicks*0.3);
        } else if (resetStatus) {
            activateGame();
            setResetStatus(false);
        }
    }

    const activateGame = () => {
        setGameState(true);
        setRadius(100);
    }

    const endGame = () => {
        setGameState(false);
        setCurrentScore(prev => Math.ceil(prev));
        //alert(`Game ended! The socre is ${currentScore} with ${clicks} clicks.`);
        setPlayerScore(currentScore)
        setClicks(0);
    }

    const handleReset = () => {
        setGameState(false);
        setResetStatus(true);
        setCurrentScore(0);
        setRadius(99.9);
    }

    return (
        <div className='flexcenter SCLK-container'>
            <h1 className='Game-title'>Xeno Clicker</h1>
            <div className='flexcenter'>
                <div className='SCLK-btnContainer flexcenter'>
                    <button 
                    style={ !resetStatus ? {width: `${radius < 30 ? 30 : radius}%`, height: `${radius < 30 ? 30 : radius}%`} : {width: '100%', height: '100%'} }  
                    className={!gameState && radius<=0 ? radius!=null ? 'SCLK-circle circle SCLK-circle-end flexcenter' : 'SCLK-circle circle flexcenter' : 'SCLK-circle circle flexcenter'} onClick={handleClick}><div className='SCLK-innerCircle circle' /></button>
                </div>
                <span className={ gameState ? 'SCLK-score flexcenter' : 'SCLK-score flexcenter SCLK-scoreEnd'}>Score: {Math.ceil(currentScore)}</span>
            </div>
            <button className='SCLK-reset' onClick={handleReset}>Reset</button>
        </div>
    )
};