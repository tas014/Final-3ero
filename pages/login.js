import LoginForm from '../components/LoginForm'
import Head from 'next/head'

export default function Login() {
    return (
      <>
        <Head>
            <title>Log In</title>
            <meta name="description" content="A project made for a programming final assignment." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />   
          </Head>
        <main className='logService'>
          <div className='LoginImg flexcenter'>CVP</div> 
          <LoginForm />    
        </main>
      </>
    )
  }