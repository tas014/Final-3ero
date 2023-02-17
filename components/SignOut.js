import { signOut } from 'firebase/auth'
import { auth } from '../APIs/firebaseConfig'

export default function SignOut() {

    const logOut = async () => {
        try {
           await signOut(auth);
           console.log('signed out')
        } catch (ex) {
            console.log(ex)
        }  
    }

    return (
        <button className='signout' onClick={logOut}>Sign Out</button>
    )
};
