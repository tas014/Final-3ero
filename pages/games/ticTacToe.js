import GameHandler from "../../components/Containers/GameHandler";
import TicTacToe from "../../components/games/TicTacToe";
import DocWrapper from '../../components/Containers/DocWrapper'
import GameWrapper from "../../components/Containers/GameWrapper";

export default function ticTacToe(params) {
    return (
        <DocWrapper title='Tic-Tac-Toe'>
            <GameWrapper>
                <TicTacToe />  
            </GameWrapper>          
        </DocWrapper>
    )
};
