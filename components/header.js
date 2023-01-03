import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [searchword,setSearchword]=useState("all")
  const handlechange=(event)=>{
    setSearchword(event.target.value)
  }
  return (
    <nav className=' py-10 mb-10 flex bg-slate-900'>
        <div className=' flex-1'>
            <h1 className=' text-5xl px-10 text-[#4181FF]'>Hageregna</h1>
        </div>
        <form action="" className=' flex-1'>
            <input className=' text-2xl rounded-2xl h-20 w-full text-center' onChange={handlechange} type="text" name="Search" id="search" placeholder='Search'/>
            <Link href={`/search/${searchword}`}> <input type="submit" value=""/></Link>
        </form>
        <div className=' flex-1 px-10 text-2xl flex justify-center'>
            <Link className=' m-3' href={'/movies'}>Movies</Link>
            <Link className=' m-3' href={'/tvseries'}>Tv Series</Link>
        </div>
    </nav>
  )
}
