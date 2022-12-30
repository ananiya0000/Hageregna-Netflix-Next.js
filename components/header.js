import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <nav className=' py-10 mb-10 flex bg-slate-900'>
        <div className=' flex-1'>
            <h1 className=' text-5xl px-10 text-[#4181FF]'>Hageregna</h1>
        </div>
        <form action="" className=' flex-1'>
            <input className=' text-2xl rounded-2xl h-20 w-full text-center' type="text" name="Search" id="search" placeholder='Search'/>
        </form>
        <div className=' flex-1 px-10 text-2xl flex justify-center'>
            <Link className=' m-3' href={''}>Movies</Link>
            <Link className=' m-3' href={' '}>Tv Series</Link>
        </div>
    </nav>
  )
}
