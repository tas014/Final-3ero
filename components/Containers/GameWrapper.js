import Leaderboard from "../Leaderboard"
import GetProfile from "./GetProfile"
import Like from "../Like"
import GameHandler from "./GameHandler"

export default function GameWrapper({children}) {
    return (
        <section className="gameSection">
            <div className="game-lb-container">
                <div className="game-like-container">
                   <div className="gameContainer">
                        <GameHandler>
                            {children} 
                        </GameHandler>      
                    </div>
                    <GetProfile>
                        <Like />  
                    </GetProfile>
                </div>
                
                <div className="lbContainer flexcenter">
                    <Leaderboard />  
                </div>
            </div>
            
        </section>
    )
};
