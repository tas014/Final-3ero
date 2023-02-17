import Image from 'next/image';

export default function ProfileDisplay ( props )  {
 
    const { profilePicSrc, name:userName, totalGamesPlayed } = props.userData;
    console.log(`profilePicSrc is ${profilePicSrc}, userName is ${userName}, totalGamesPlayed is ${totalGamesPlayed}`)

    return (
    <div className='profilecontainer'>
        <Image src={profilePicSrc} alt="profile image" height={500} width={500}/>
        <div>
            <label>{userName}</label>
            <span>{`${totalGamesPlayed} games played`}</span>  
        </div>
    </div>
 )
}