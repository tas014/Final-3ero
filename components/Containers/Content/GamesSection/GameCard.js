import Image from 'next/image'

export default function GameCard( props ) {
    const { img, title } = props;
    return (
        <div className='gameCard'>
            <img src={img} className='gameImg' alt={`an image of the game "${title}".`} />
            <h3 className='inter'>{title}</h3>
        </div>
    )
}