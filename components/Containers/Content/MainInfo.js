import Image from "next/image"
import url from '../../../public/img/mario.jpg'

export default function MainInfo () {
    return (
        <section className="mainInfo">
            <Image className="circle marginv" src={url} width={300} height={300} alt='An image of Mario with his thumbs up'/>
            <h2>Welcome to the CVP project!</h2>
            <p>The concept of this site is to be a community-driven online web gaming platform! Every game has some mechanism that allows for leaderboarding, even for multiple player games without online pvp!</p>
        </section>
    )
}