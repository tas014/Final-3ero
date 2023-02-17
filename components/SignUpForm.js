import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../APIs/firebaseConfig'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignUpForm () {

    const router = useRouter();
    const defaultPfp = 'https://firebasestorage.googleapis.com/v0/b/community-gaming-platform.appspot.com/o/profilePics%2FdefaultUser.png?alt=media&token=eeba24b6-0b30-435f-84fb-6b84e3b9ee0d'

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    
    const handleSubmit = (e) => {
      e.preventDefault();  
      handleAdd()
    }

    const handleDbAdd = async (id) => {
      try {
        await setDoc(doc(db, 'users', id), {
          username: username,
          password: password,
          email: email,
          imgUrl: defaultPfp,
          timeStamp: serverTimestamp(),
          likedGames: [],
          totalGamesPlayed: 0,
          admin: false
        });
        router.push('/')
      } catch (ex) {
        console.log(ex);
      }
    }

    const handleAdd = async () => {
        createUserWithEmailAndPassword(
          auth,
          email,
          password
          ).then(res => {
            console.log(res.user.uid, 'Auth succeeded');
            handleDbAdd(res.user.uid);
            setRedirecting(true)
          }).catch (ex => {
            setErrors(true);
            console.log(ex);
          })
    }

      return (
        <div className='logServiceForm flexcenter'>
          <div>
            <div className='logService-title flex'>
                <h1>Sign Up</h1>
                <span>Or <Link href='/login'>Log in</Link> if you already have an account</span>
              </div>
            <form onSubmit={e => handleSubmit(e)}>
              <div className='inputBox'>
                <label placeholder='TheMightyZebra123' htmlFor='Username'>Username</label>
                <input id='Username' type="text" onChange={e => setUsername(e.target.value)}></input>
              </div>
              <div className='inputBox'>
                <label placeholder='johndoe@somemail.com' htmlFor='email'>Email</label>
                <input id='email' type="email" onChange={e => setEmail(e.target.value)}></input>
              </div>
              <div className='inputBox'>
                <label htmlFor='Password'>Password (5+ characters)</label>
                <input id='Password' type="password" onChange={e => setPassword(e.target.value)}></input>
              </div>
              <span className='fieldError'>{!errors ? '' : 'There was an error creating the account.'}</span>
              <button type='submit'>Sign Up</button>
              {redirecting ? <span className='redirect'>Redirecting...</span> : null}
            </form>
          </div>
        </div>
      )
  }