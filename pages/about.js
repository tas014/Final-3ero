import DocWrapper from "../components/Containers/DocWrapper"
import Image from "next/image"
import Me from '../public/img/me.jpg'

export default function about() {
    return (
        <DocWrapper title='About'>
            <section className="about">
                <div className="aboutImgContainer">
                    <Image className="circle" src={Me} width={400} height={400} alt='An image of Franco Picco'/>
                </div>
                <div className="aboutInfo">
                    <h1>Hello, my name is Franco.</h1>
                    <p>The site you are using right now is a project that was tasked for my third year of programming in college, and it was a very good introduction to utilizing React, specifically the form of Next.js, and databases in general even though the one used here is specifically Firebase. <br /><br />Building this site was a little bit stressful since i have a bad habit of leaving myself little to no leeway when faced with a deadline but i can honestly look back at this project and say it was a very positive experience! Solving some problems like abstracting values to keep track of in order to make implementation easier is quite the absorbing task and even though it can become frustrating, it is most certainly never boring. <br /><br />I do recommend embarking in a React project of your own, it's a great learning experience and there is plenty of resources available out there, some channels i personally used as a helping hand with understanding the core concepts are <a target='_blank' href="https://www.youtube.com/@PedroTechnologies">PedroTech</a>, <a target='_blank' href="https://www.youtube.com/@LamaDev">LamaDev</a> and last but most certainly not least, <a href="https://www.youtube.com/@programmingwithmosh" target='_blank'>CodeWIthMosh</a>. I would also like to shoutout my programming professor Leandro Amaro, since he had the patience to deal with a confused me throughout an entire year and provided his time a lot regardless of wether or not us students would make it count. <br /><br />I don't really use socials much so i wanted to make a section here for anyone interested in reading about myself or the project, and if there's any Maimonides students seeing this, first of all hi! I want to strongly advice not to leave anything programming related for tomorrow. Get it out of the way as soon as you can, your future self will thank you for not having to stay up multiple nights just to finish a project. <br /><br />Thank you for reading this far, i don't really have much more to add so this is the end of this, i wish you the best in your endeavors and have a wonderful day!</p>
                </div>
            </section>
        </DocWrapper>
    )
};
