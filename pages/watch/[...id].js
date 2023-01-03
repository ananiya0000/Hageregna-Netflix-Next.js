import Header from '../../components/header'
import Footer from '../../components/footer'
import { useRouter } from 'next/router'
import { useState,useEffect,useRef } from 'react'
import { motion as m} from "framer-motion"
import axios from "axios"
import Link from 'next/link'

export default function Watch(){
    var count=0
    const router=useRouter()
    const query=router.query
    const [width,setWidth]=useState(0)
    const carousel=useRef()
    const [looklikemovies,setLooklikemovies]=useState(null)

    const [selectedseason,setSelectedseason]=useState(1)
    const [seasonnumber,setSeasonnumber]=useState(null)
    const [episodenumber,setEpisodenumber]=useState(null)

    const [url_tv_or_movie,setUrl_tv_or_movie]=useState("")

    var sea_epi_count={}
    console.log(query)
    useEffect(()=>{
        const getData=async ()=>{
            var looklikeMovies;
            if(query.vote_count=="tv"){
                const tvInfo= await axios.get(`https://api.themoviedb.org/3/tv/${query.id}?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US`)
                setSeasonnumber(tvInfo.data)
                setUrl_tv_or_movie(`https://2embed.org/embed/series?tmdb=${query.id}&s=1&e=1`)
                looklikeMovies=await axios.get(`https://api.themoviedb.org/3/tv/${query.id}/similar?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&page=1`)

            }else{
                setUrl_tv_or_movie(`https://2embed.org/embed/movie?tmdb=${query.id}`)
                looklikeMovies=await axios.get(`https://api.themoviedb.org/3/movie/${query.id}/similar?api_key=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}&language=en-US&page=1`)
            }
            setLooklikemovies(looklikeMovies.data)
        }
        getData()
    },[])
    useEffect(()=>{
        
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth)
    })

    const handleSelect=(event)=>{
        var selseason="Season 1"
        if(event!=null)
            selseason=event.target.value
        var epi=sea_epi_count[selseason]
        setSelectedseason(selseason)
        var episo=[]
        for(var i=0;i<epi;i++){
            episo.push(i+1)
        }
        setEpisodenumber(episo)
    }   
    const episodclickHandler=(event)=>{
        var selepisode=event.target.value
        console.log(selepisode)
        var index=1
        for (const key in sea_epi_count) {
            if(key==selectedseason){
                break
            }
            index++
        }
        setUrl_tv_or_movie(`https://2embed.org/embed/series?tmdb=${query.id}&s=${index}&e=${selepisode}`)
        console.log(url_tv_or_movie)
    }

    return (
        <div>
            <Header/>
            <div className=' m-16'>
                <iframe src={url_tv_or_movie} width="100%vw" title={query.title} height="500px" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
            </div>
            <div className=' flex mx-80 my-28'>
                <div>
                    <img src={'https://image.tmdb.org/t/p/w500'+query.poster_path} className=" w-96 h-auto"  alt="" />
                </div>
                <div className=' px-10'>
                    <h3 className=' text-[#4181FF] text-5xl '>Description</h3>
                    <p className=' text-3xl'>{query.overview}</p>
                </div>
            </div>
            {seasonnumber && <div>
                <div className=" flex">
                    <div className=" w-40 mx-64 my-30">
                        <h1>Seasons</h1>
                        <div >
                            <select onClick={handleSelect} className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                                {seasonnumber && seasonnumber.seasons && seasonnumber.seasons.map((element)=>{
                                    let temp1=element.name
                                    let temp2=element.episode_count
                                    sea_epi_count[temp1]=temp2
                                    console.log(element)
                                    count+=1
                                    return (
                                        <option value={element.name}>{element.name}</option>
                                    )
                                    
                                }) }
                            </select>
                        </div>
                    </div>
                    
                    <div className=" w-40 mx-40 my-30 ml-0">
                    <h1>Episodes</h1>
                        <select onClick={episodclickHandler} className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                            {episodenumber !=null && episodenumber.map((element)=>{
                                return(
                                    <option value={element}>Episode {element}</option>
                                )
                            })}
                            </select>
                    </div>
                </div>
            </div>}
            <div className=' m-24'>
                <div className=' px-20'>
                    <h1 className=' text-5xl text-[#4181FF]'></h1>
                </div>
                <m.div ref={carousel} className="carousel" whileTap={{cursor:"grabbing"}}>
                    <h2 className=" text-3xl p-10 pb-0">You Might Also like</h2>
                    <m.div drag="x" dragConstraints={{right:0, left:-width}} className="inner-carousel">
                        {
                            looklikemovies && looklikemovies.results && looklikemovies.results.map(element=>{
                                element.vote_count=query.vote_count
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
            </div>
            <Footer/>
        </div>
    )
}