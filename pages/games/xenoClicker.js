import XenoClicker from "../../components/games/XenoClicker"
import GetProfile from "../../components/Containers/GetProfile"
import DocWrapper from '../../components/Containers/DocWrapper'
import Leaderboard from "../../components/Leaderboard"
import Like from "../../components/Like"
import GameWrapper from "../../components/Containers/GameWrapper"

export default function superClicker() {
    return (
        <DocWrapper title='XenoClicker'>
            <GameWrapper>
                <XenoClicker />
            </GameWrapper>
        </DocWrapper>
    )
};
