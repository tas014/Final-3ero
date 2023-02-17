import { auth } from '../APIs/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function LoginForm () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [redirecting, setRedirecting] = useState(false)
    const router = useRouter();


    const handleLogin = async (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(
          auth,
          email,
          password
          ).then( userCredential => {
            const user=userCredential.user;
            console.log(user);
            setRedirecting(true);
            router.push('/')
          }).catch((ex) => {
            setErrors(true)
            console.log(ex)
        })
      }

      return (
        <div className='logServiceForm flexcenter'>
          <div>  
            <div className='logService-title flex'>
              <h1>Log In</h1>
              <span>..Or <Link href='/signup'>Sign Up</Link> if you don't have an account</span>
            </div>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className='inputBox'>
                <label htmlFor='email'>Email</label>
                <input placeholder='johndoe@somemail.com' id='email' type="email" onChange={e => setEmail(e.target.value)}></input>
              </div>
              <div className='inputBox'>
                <label htmlFor='Password'>Password</label>
                <input id='Password' type="password" onChange={e => setPassword(e.target.value)}></input>
              </div>
              <button disabled={redirecting} type='submit'>{!redirecting ? 'Log In' : 'Redirecting...'}</button>
              <span className='fieldError'>{!errors ? '' : 'Incorrect Email or Password'}</span>
            </form>
          </div>  
        </div>
      )
    }