import Link from "next/link"
import { motion as m} from "framer-motion"

import {useRef,useEffect,useState} from 'react'
import axios from "axios"

import Footer from "../components/footer"

export default function Movies(){
    var count=0
    const [width,setWidth]=useState(0)
    const [discovermovie,setDiscovermovie]=useState(null)
    const [topratedmovies,setTopratedmovies]=useState(null)
    const [upcomingmovies,setUpcomingmovies]=useState(null)
    const [newmovies,setNewmovies]=useState(null)
    const carousel=useRef()
    const [searchword,setSearchword]=useState("all")

    const handlechange=(event)=>{
        setSearchword(event.target.value)
    }
    useEffect(()=>{
        const getData=async ()=>{
            const discoverMovie=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
            const topratedMovies=await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&page=1`)
            const upcomingMovie=await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&page=1`)
            const newMovies=await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&page=1`)
            setDiscovermovie(discoverMovie.data)
            setTopratedmovies(topratedMovies.data)
            setUpcomingmovies(upcomingMovie.data)
            setNewmovies(newMovies.data)
        }
        getData()
    },[])
    useEffect(()=>{
        
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth)
    })
    return (
        <div>
            <nav className=' py-10 mb-10 flex bg-slate-900'>
                <div className=' flex-1'>
                    <h1 className=' text-5xl px-10 text-[#4181FF]'>Hageregna</h1>
                </div>
                <form action="" className=' flex-1'>
                    <input className=' text-2xl rounded-2xl h-20 w-full text-center' onChange={handlechange} type="text" name="Search" id="search" placeholder='Search'/>
                    <Link href={`/search/${searchword}`}> <input type="submit" value=""/></Link>
                </form>
                <div className=' flex-1 px-10 text-2xl flex justify-center'>
                    <Link className=' m-3 text-[#4181FF]' href={'/movies'}>Movies</Link>
                    <Link className=' m-3' href={'/tvseries'}>Tv Series</Link>
                </div>
            </nav>
            
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
            <h2 className=" text-3xl p-10 pb-0">Discover Movies</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        discovermovie && discovermovie.results && discovermovie.results.map(element=>{
                            element.vote_count="movie"
                            console.log(element)
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
                                    <Link className=" bg-transparent mx-24 watch-btn hover:bg-slate-900 hover:text-gray-400 px-7 py-2" href={{pathname:`/watch/${element.id}`,query:element}}>
                                    Watch
                                    </Link>
                                </m.div>
                            )
                        })
                    }
                </m.div>
            </m.div>
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
            <h2 className=" text-3xl p-10 pb-0">Top Rated Movies</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        topratedmovies && topratedmovies.results && topratedmovies.results.map(element=>{
                            element.vote_count="movie"
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
                                    <Link className=" bg-transparent mx-24 watch-btn hover:bg-slate-900 hover:text-gray-400 px-7 py-2" href={{pathname:`/watch/${element.id}`,query:element}}>
                                    Watch
                                    </Link>
                                </m.div>
                            )
                        })
                    }
                </m.div>
            </m.div>
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
            <h2 className=" text-3xl p-10 pb-0">Up-Coming Movies</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        upcomingmovies && upcomingmovies.results && upcomingmovies.results.map(element=>{
                            element.vote_count="movie"
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
                                    <Link className=" bg-transparent mx-24 watch-btn hover:bg-slate-900 hover:text-gray-400 px-7 py-2" href={{pathname:`/watch/${element.id}`,query:element}}>
                                    Watch
                                    </Link>
                                </m.div>
                            )
                        })
                    }
                </m.div>
            </m.div>
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
            <h2 className=" text-3xl p-10 pb-0">New Released</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        newmovies && newmovies.results && newmovies.results.map(element=>{
                            element.vote_count="movie"
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
                                    <Link className=" bg-transparent mx-24 watch-btn hover:bg-slate-900 hover:text-gray-400 px-7 py-2" href={{pathname:`/watch/${element.id}`,query:element}}>
                                    Watch
                                    </Link>
                                </m.div>
                            )
                        })
                    }
                </m.div>
            </m.div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}