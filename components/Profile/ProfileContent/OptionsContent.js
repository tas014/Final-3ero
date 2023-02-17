import { collection, deleteDoc ,doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../../APIs/firebaseConfig';
import { getAuth, deleteUser } from "firebase/auth";
import SignOut from "../../SignOut";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

export default function OptionsContent () {

    const [delStatus, setDelStatus] = useState(false)
    const [resetStatus, setResetStatus] = useState(false)     
    const [error, setError] = useState(false)
    const [lb, setLb] = useState([])
    const {user, authUser} = useContext(UserContext)

    useEffect(()=>{
        const getLeaderboards = async () => {
            const docRef = collection(db, 'leaderboards')
            try {
               const data= await getDocs(docRef);
               setLb(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            } catch (ex) {
                console.log('There was an error retrieving leaderboards');
            }
        }

        getLeaderboards()
    },[])

    const handleDelete = () => {
        handleLeaderboardCleaning();
        authDelete(); 
    }

    const authDelete = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        deleteUser(user).then(() => {
            setDelStatus(true);
            dbDelete(authUser.uid);
        }).catch((ex) => {
            setError(true);
            console.log(ex)
        });
    }

    const handleLeaderboardCleaning = async () => {
        const newLeaderboards = [];
        const newLbRef = [...lb]

        newLbRef.forEach((arr) => {
            const newArr = arr.data.filter(entry => {
                return entry.username != user.username
            })
            newLeaderboards.push({data:newArr, id:arr.id})
        })

        newLeaderboards.forEach( docu => {
            const docRef = doc(db, 'leaderboards', docu.id);
            updateLeaderboard(docRef, {data: docu.data});
        })
        setResetStatus(true)
    }

    const updateLeaderboard = async (ref, data) => {
            try {
                await updateDoc(ref, data)
            } catch (ex) {
                setError(true);
                console.log('There was an error updating Leaderboards', ex)
            }
    }

    const dbDelete = async (id) =>{
        const usersRef = doc(db, 'users', id);
        try {
            await deleteDoc(usersRef)
            setDelStatus(true);
        } catch (ex) {
            setError(true);
            console.log(ex)
        }        
    }

    const handleReset = () => {
        setResetStatus(false);
        handleLeaderboardCleaning();
    }

    return(
        <div className="profileOptions flexcenter">
            <div>    
                <SignOut />
                <button className="reset" onClick={handleReset}>Reset Account</button>
                <button className="delete" onClick={handleDelete}>Delete Account</button>
                {delStatus && !error ? <span className="success">Account yeeted and deleted.</span> : null}
                {resetStatus && !error ? <span className="success">Account has been reset and removed from the leaderboards.</span> : null}
                {error ? <span className="error">There was an error. Try logging in again.</span> : null}
            </div>
        </div>
    )
}