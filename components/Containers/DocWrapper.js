import Heading from "./Content/Header/Header"
import Foot from "./Content/Footer/Footer"
import Head from "next/head"
import GetProfile from "./GetProfile"

export default function DocWrapper({children, title}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="A project made for a programming final assignment." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <GetProfile>
                <Heading />
            </GetProfile>
            <main>
                {children}
            </main>
            <Foot />
        </>
    )
};
