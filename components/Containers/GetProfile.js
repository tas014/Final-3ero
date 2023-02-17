import { useRouter } from 'next/router';
import { UserContext } from '../../Context/UserContext'
import { useState, useEffect } from "react";
import { auth, db } from "../../APIs/firebaseConfig";
import { onAuthStateChanged, setAuthUser } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";


export default function GetProfile({children}) {

    const router = useRouter();
    const [user, setUser] = useState({});
    const [authUser, setAuthUser] = useState('');

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
        if ((Object.keys(user) > 0 && !authUser) || authUser == null) {
            router.push('/login')
        }
    },[authUser])
   
    return (
        <>
            <UserContext.Provider value={{user, authUser}}>
                {children}
            </UserContext.Provider>
        </>
        )    
};
