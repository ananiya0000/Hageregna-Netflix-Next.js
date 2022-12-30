import Link from "next/link"
import { motion as m} from "framer-motion"

import {useRef,useEffect,useState} from 'react'


export default function Tvseries(){
    var images=[
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
    ]
    var imagess=[
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
        'https://c8.alamy.com/comp/F762XE/film-movie-poster-of-titanic-F762XE.jpg',
    ]
    const [width,setWidth]=useState(0)


    const carousel=useRef()

    useEffect(()=>{
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth)
    },[])
    return (
        <div>
            <nav className=' py-10 mb-10 flex bg-slate-900'>
                <div className=' flex-1'>
                    <h1 className=' text-5xl px-10 text-[#4181FF]'>Hageregna</h1>
                </div>
                <form action="" className=' flex-1'>
                    <input className=' text-2xl rounded-2xl h-20 w-full text-center' type="text" name="Search" id="search" placeholder='Search'/>
                </form>
                <div className=' flex-1 px-10 text-2xl flex justify-center'>
                    <Link className=' m-3 ' href={'/movies'}>Movies</Link>
                    <Link className=' m-3 text-[#4181FF]' href={'/tvseries'}>Tv Series</Link>
                </div>
            </nav>
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        images.map(image=>{
                            return (
                                <m.div className="item" key={image}>
                                    <img src={image} alt="movie poster" />
                                    <Link className=" bg-transparent mx-24 watch-btn hover:bg-slate-900 hover:text-gray-400 px-7 py-2" href={''}>
                                    Watch
                                    </Link>
                                </m.div>
                            )
                        })
                    }
                </m.div>
            </m.div>
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        imagess.map(image=>{
                            return (
                                <m.div className="item" key={image}>
                                    <img src={image} alt="movie poster" />
                                    <Link className=" bg-transparent mx-24 watch-btn hover:bg-slate-900 hover:text-gray-400 px-7 py-2" href={''}>
                                    Watch
                                    </Link>
                                </m.div>
                            )
                        })
                    }
                </m.div>
            </m.div>
        </div>
    )
}