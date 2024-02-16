import React from 'react'

const Banner = () => {
  return (
    <div className=' selection-container bg-gradient-to-r from-[#fffdf7] via-[#fff2b2] to-[#ffee99] ...'>
        <div className='py-24 flex flex-col-reverse md:flex-row justify-between items-center gap-8'>
            {/* text */}
            <div className='md:w-1/2 space-y-7 px-4'>
                <h2 className=' md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>Recharge with an electrifying boost at the 
                <span className=' text-0-yellowColor'> Battery</span> House</h2>
                <p className=' text-xl text-secondaryColor'>Revitalize your senses at the battery haven, where a symphony of charged beverages awaits to infuse your day 
                with sustained vigor and lasting vitality.</p>
                <button className=' bg-0-yellowColor text-white uppercase px-8 py-3 rounded-full'><a href="/menu">order now</a></button>
            </div>
            {/* Image */}
            <div className='md:w-1/2'>
                <img src="/Images/STAR-MF-65D31R.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Banner