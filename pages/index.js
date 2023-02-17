import HomePage from '../components/HomePage';
import DocWrapper from '../components/Containers/DocWrapper';
import GetProfile from '../components/Containers/GetProfile';

export default function Home() {

  return (
      <DocWrapper title='CVP Home'>
        <GetProfile>
          <HomePage />
        </GetProfile>
      </DocWrapper>
      
     
  )
}
