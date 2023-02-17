import Link from 'next/link';
import { UserContext } from "../../../../Context/UserContext"
import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/router';

export default function Heading() {

    const { user } = useContext(UserContext);
    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/community-gaming-platform.appspot.com/o/profilePics%2FdefaultUser.png?alt=media&token=eeba24b6-0b30-435f-84fb-6b84e3b9ee0d'
    const router = useRouter();
    const [current, setCurrent] = useState('')

    useEffect(()=>{
      switch (router.pathname) {
        case '/about':
            setCurrent('about')
          break;
        
        case '/profile':
          setCurrent('profile')
          break
        case '/':
          setCurrent('home')
          break;
        default:
          setCurrent('')
        }
    },[])

    return (
      <>
        <header>
            <div>
              <div className='flexcenter'>
                <h1>CVP Games</h1>
              </div>
              <nav>
                <Link href="/" className={current == 'home' ? 'navSelected' : null}><div className='flexcenter'>Home</div></Link>
                <Link href="/about" className={current == 'about' ? 'navSelected' : null}><div className='flexcenter'>About</div></Link>
                <Link href="/profile" className={current == 'profile' ? 'navSelected' : null}>
                  <div className='flexcenter'>
                    <img className='headerPfp circle' src={user.imgUrl ? user.imgUrl : defaultPic} alt='An image of the users prfile picture' />
                  </div>
                </Link>
              </nav>
            </div>
        </header>
      </>
    )
  }
  