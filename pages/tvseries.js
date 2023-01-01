import Link from "next/link"
import { motion as m} from "framer-motion"

import {useRef,useEffect,useState} from 'react'

import axios from "axios"

import Footer from "../components/footer"


export default function Tvseries(){
    var count=0
    const [width,setWidth]=useState(0)
    const [discovertv,setDiscovertv]=useState(null)
    const [populartv,setPopulartv]=useState(null)
    const [topratedtv,setTopratedtv]=useState(null)
    const [tvonair,setTvonair]=useState(null)

    const carousel=useRef()

    const [searchword,setSearchword]=useState("all")

    const handlechange=(event)=>{
        setSearchword(event.target.value)
    }

    useEffect(()=>{
        const getData=async ()=>{
            const discoverTv=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
            const popularTv=await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&page=1`)
            const topratedTv=await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&page=1`)
            const Tvonair=await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US`)
            setDiscovertv(discoverTv.data)
            setPopulartv(popularTv.data)
            setTopratedtv(topratedTv.data)
            setTvonair(Tvonair.data)
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
                    <Link className=' m-3 ' href={'/movies'}>Movies</Link>
                    <Link className=' m-3 text-[#4181FF]' href={'/tvseries'}>Tv Series</Link>
                </div>
            </nav>
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
            <h2 className=" text-3xl p-10 pb-0">Discover Tv</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        discovertv && discovertv.results && discovertv.results.map(element=>{
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
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
            <h2 className=" text-3xl p-10 pb-0">Popular Tv</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        populartv && populartv.results && populartv.results.map(element=>{
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
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
            <h2 className=" text-3xl p-10 pb-0">Tv Currently on Air</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        tvonair && tvonair.results && tvonair.results.map(element=>{
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
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
            <h2 className=" text-3xl p-10 pb-0">Top Rated Tv</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        topratedtv && topratedtv.results && topratedtv.results.map(element=>{
                            return (
                                <m.div className="item" key={count++}>
                                    <img src={'https://image.tmdb.org/t/p/w500'+element.poster_path} alt="movie poster" />
                                    <Link className=" bg-transparent mx-24 watch-btn hover:bg-slate-900 hover:text-gray-400 px-7 py-2" href={''}>
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