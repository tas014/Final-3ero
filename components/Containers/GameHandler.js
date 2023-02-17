import { GameContext } from "../../Context/GameContext";
import { useState, useEffect } from "react";
import { auth, db } from "../../APIs/firebaseConfig";
import { onAuthStateChanged, setAuthUser } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router"

export default function GameHandler({ children }) {
    const [user, setUser] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    const [playerScore, setPlayerScore] = useState(0)
    const router = useRouter();
    const lbRef = router.pathname.slice(router.pathname.lastIndexOf('/')+1);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setAuthUser(currentUser)
          })
    },[])

    useEffect(() => {

        const callDb = async () =>{
            if (authUser) {
                const docRef = doc(db, 'users', authUser.uid) 
                getDoc(docRef).then((res)=>{
                    setUser(res.data());
                }).catch (ex => console.log('There was an error retrieving user data from database', ex))     
            }  
        } 

        callDb();  
    },[authUser])

    useEffect(() => {
        const callLeaderboard = async () =>{
            const docRef = doc(db, 'leaderboards', lbRef) 
            getDoc(docRef).then((res)=>{
                setLeaderboard(res.data());
            }).catch (ex => console.log('There was an error retrieving leaderboard data.', ex))     
        } 

        callLeaderboard();  
    },[])

    useEffect(()=>{
        if (Object.keys(user).length > 0 && playerScore > 0) {
            const handleLb = async () =>{
                const newHs = newHighscore();
                if (newHs) {
                    const newLbArray = leaderboard.data.filter(player => {
                        return player.username != user.username
                    })
                    newLbArray.push({
                        username: user.username,
                        score: playerScore
                    });
                    const docRef = doc(db, 'leaderboards', lbRef);
                    try {
                        await updateDoc(docRef, {data:newLbArray});
                    } catch (ex) {
                        console.log(ex)
                    }
                }
            }

            const handleGamesPlayed = async () => {
                const newGamesPlayed = user.totalGamesPlayed+1;
                const userDoc = doc(db, 'users', authUser.uid);
                try {
                    await updateDoc(userDoc, {
                        totalGamesPlayed: newGamesPlayed
                    });
                } catch (ex) {
                    console.log('Failed to update games played.')
                }
            }
    
            handleLb();
            handleGamesPlayed();
        }
    },[playerScore])

    const newHighscore = () => {
        const currentHighscore = leaderboard.data.filter(player => {
            return player.username == user.username
        })
        if (currentHighscore.length > 0) {
            if (playerScore > currentHighscore[0].score) {
                return Math.ceil(playerScore)
            } 
        } else {
            return Math.ceil(playerScore)
        }
    }

    return (
        <GameContext.Provider value={{ setPlayerScore }}>
            {children}
        </GameContext.Provider>
    )
};