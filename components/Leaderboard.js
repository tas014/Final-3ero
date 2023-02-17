import { db } from "../APIs/firebaseConfig"
import { getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Leaderboard() {

    const router = useRouter();
    const [lb, setLb] = useState([]);
    const [sortFlag, setSortFlag] = useState(false);
    const lbRef = router.pathname.slice(router.pathname.lastIndexOf('/')+1);
    
    useEffect(() => {
        const callDb = async () =>{
            const docRef = doc(db, 'leaderboards', lbRef) 
            getDoc(docRef).then((res)=>{
                const processedRes = res.data();
                setLb(processedRes.data);
            }).catch (ex => console.log('There was an error retrieving leaderboard', ex))      
        }

        callDb();
    },[])

    useEffect(()=>{
        if (lb && lb.length > 0) {
            const lbRefArr = [...lb];
            lbRefArr.sort((a, b) => {
                return b.score - a.score
            })
            if (!sortFlag) {
                setLb(lbRefArr);
                setSortFlag(true);
            }
        }
    },[lb])

    return (
        <div className="flexcenter">
            <h2>Leaderboard</h2>
            {lb && lb.length>0 ? 
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>User</td>
                        <td>Score</td>
                    </tr>
                </thead>
                <tbody>
                    {lb.map((user, i) => {
                        return (
                            <tr key={user.username}>
                                <td>{i+1}</td>
                                <td>{user.username}</td>
                                <td>{user.score}</td>
                            </tr>
                        )})}
                </tbody>
            </table>
            : <span>Loading Leaderboard...</span>}
        </div>
    )
};
