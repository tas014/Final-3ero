import Link from 'next/link'

export default function SubmitGamesSection() {
    return (
      <>
        <section>
            <h1>You can contribute to the site!</h1>
            <p>The whole point of this project is to have community members submit their own games to our website! There's a couple norms and rules to follow, if you are interested, click the button below.</p>
            <Link href='/pages/about.js'>Submit your Game</Link>
        </section>
      </>
    )
  }