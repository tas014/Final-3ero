import SignUpForm from '../components/SignUpForm'
import Head from 'next/head'
import { db } from '../APIs/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DocWrapper from '../components/Containers/DocWrapper'

export default function Signup() {

    return (
      <>
        <Head>
          <title>Sign Up</title>
          <meta name="description" content="A project made for a programming final assignment." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />   
        </Head>
        <main className='logService'>
            <div className='SignUpImg flexcenter'>CVP</div>      
            <SignUpForm />
        </main>
      </>
    )
  }