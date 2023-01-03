import axios from "axios";
import { useRouter } from "next/router";
import { useEffect,useState,useRef } from "react";
import Link from "next/link";
import { motion as m} from "framer-motion"
export default function Search(){
    const router=useRouter()
    const {id}=router.query
    var count=0
    const [width,setWidth]=useState(0)
    const [allsearch,setAllsearch]=useState(0)
    //const [searchresultsmovies,setSearchresultsmovies]=useState(null)
    //const [searchresultstv,setSearchresultstv]=useState(null)
    //const [searchresultspeople,setSearchresultspeople]=useState(null)

    const carousel=useRef()
    const [searchword,setSearchword]=useState("all")

    const handlechange=(event)=>{
        setSearchword(event.target.value)
    }

    useEffect(()=>{
        const getData=async()=>{
            const allSearch=await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&query=${id}&page=1&include_adult=flase`)
            //const searchresultsMovies=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&query=${id}&page=1&include_adult=false`)
            // const searchresultsTv=await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&query=${id}&page=1&include_adult=false`)
            // const searchresultsPeople=await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&query=${id}&page=1&include_adult=false`)
            setAllsearch(allSearch.data)
            //setSearchresultsmovies(searchresultsMovies.data)
            // setSearchresultstv(searchresultsTv.data)
            // setSearchresultspeople(searchresultsPeople.data)
            setSearchword(id)
            console.log(allSearch.data)
        }
        getData()
    },[])

    useEffect(()=>{
        
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth)
    })

    return(
        <div>
            <nav className=' py-10 mb-10 flex bg-slate-900'>
                <div className=' flex-1'>
                    <h1 className=' text-5xl px-10 text-[#4181FF]'>Hageregna</h1>
                </div>
                {/* <form action="" className=' flex-1'>
                    <input className=' text-2xl rounded-2xl h-20 w-full text-center' onChange={handlechange} type="text" name="Search" id="search" placeholder='Search'/>
                    <Link href={`/search/${searchword}`}> <input type="submit" value=""/></Link>
                </form> */}
                <div className=' flex-1 px-10 text-2xl flex justify-center'>
                    <Link className=' m-3 ' href={'/movies'}>Movies</Link>
                    <Link className=' m-3 ' href={'/tvseries'}>Tv Series</Link>
                </div>
            </nav>
            <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
            <h2 className=" text-3xl p-10 pb-0">All</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        allsearch && allsearch.results && allsearch.results.map(element=>{
                            element.vote_count=element.media_type
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
            {/* <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
            <h2 className=" text-3xl p-10 pb-0">Movies</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        searchresultsmovies && searchresultsmovies.results && searchresultsmovies.results.map(element=>{
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
            <h2 className=" text-3xl p-10 pb-0">Tv</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        searchresultstv && searchresultstv.results && searchresultstv.results.map(element=>{
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
            <h2 className=" text-3xl p-10 pb-0">People</h2>
                <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                    {
                        searchresultspeople && searchresultspeople.results && searchresultspeople.results.map(element=>{
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
            </m.div> */}
        </div>
    )
}