import TagSelector from '../components/Buttons/TagSelector'
import GamesSection from '../components/Containers/Content/GamesSection/GamesSection'
import MainInfo from '../components/Containers/Content/MainInfo'
import { db } from '../APIs/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'


export default function HomePage() {
    const [games, setGames] = useState([]);
    const [fullGamesList, setFullGamesList] = useState([]);
    const gamesCollectionRef = collection(db, 'games');
    const { user } = useContext(UserContext)

    useEffect(()=>{
        const getGames = async () => {
        const data= await getDocs(gamesCollectionRef);
        setGames(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        setFullGamesList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getGames();
    }, [])

    const handleSort = (e) => {
        switch (e.target.value) {
        default:
        case 'All':
            setGames([...fullGamesList])
            break;
        
        case 'Alphabetical': 
            const sortedArr = [...fullGamesList]
            sortedArr.sort((a, b) => {
            if (a.reference < b.reference) {
                return -1
            }
            if (a.reference > b.reference) {
                return 1
            }
            return 0
            });
            setGames(sortedArr);  
            break;

        case 'Liked':
            const filteredArr = fullGamesList.filter(game => {
                return user.likedGames.includes(game.reference)
            })
            setGames(filteredArr)
            break;
        }
    }

    return (
        <>
            <div className='landingContainer flexcenter'>
            <div>
                <div className='landingTitleContainer'>
                <h1>Games</h1>
                <TagSelector onSort={handleSort} />
                </div>
                <GamesSection gamesData={games} />
            </div>
            <div>
                <MainInfo />
            </div>
            </div> 
        </>
        
        
  )
};
