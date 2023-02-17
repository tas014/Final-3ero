import React, { Component } from 'react';
import GameCard from './GameCard';
import Link from 'next/link';

export default function GamesSection ({gamesData:games}) {
    
    return (
      <section className='gamesContainer'>
        <div className='flexcenter'>
          {games.map(game => {
            return (
              <Link key={game.id} href={`/games/${game.reference}`}>
                <GameCard img={game.imgUrl} title={game.title}  />
              </Link>
          )})}
          {games.length == 0 ? <span className='hater'>It appears you are a hater, you have no liked games!</span> : null}
        </div>
      </section>
    )
}