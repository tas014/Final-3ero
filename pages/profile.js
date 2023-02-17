import { useEffect, useState } from 'react'
import ProfileMenu from '../components/Profile/ProfileMenu'
import DataContent from '../components/Profile/ProfileContent/DataContent';
import OptionsContent from '../components/Profile/ProfileContent/OptionsContent';
import GetProfile from '../components/Containers/GetProfile';

import DocWrapper from '../components/Containers/DocWrapper';


export default function Profile() {

    const [currentContent, setCurrentContent] = useState('Account Data');
    const [renderedEl, setRenderedEl] = useState(<DataContent />);

    useEffect (() => {
      setRenderedEl(handleRender(currentContent));
    }, [currentContent])

    const handleSelect = (page) => {
      setCurrentContent(page);
    }

    const handleRender = (data) =>{
        switch (data) {
          default:    
          case 'Account Data':
              return (
                  <DataContent />
              )

          case 'Account Options':
              return (
                <GetProfile>
                  <OptionsContent />
                </GetProfile>
              )
        }
      }     

    return (
      <DocWrapper title='Profile'>  
              <section className='profileSection flex'>
                  <div className='profileMenu flex'>
                    <ProfileMenu selected={currentContent} onSelect={handleSelect} />   
                  </div>
                  <div className='profileData flex'>
                      <h1>{currentContent}</h1>
                      <div className='extend'>{renderedEl}</div>
                  </div>
              </section>
      </DocWrapper>
    )
  }