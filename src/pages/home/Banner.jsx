import React from 'react'

import bannerImg from "../../assets/banner.jpg"

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>

            <div className='md:w-1/2 w-[485px]  '>
                <img src={bannerImg} alt="" />
            </div>
            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-3xl font-medium mb-7'>New Releases This Week</h1>
                <p className='mb-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quidem cumque nesciunt nulla laborum animi optio excepturi
                    cum impedit, culpa quaerat dolore veniam tempora nihil necessi
                    tatibus! Dignissimos, libero itaque. Suscipit, nesciunt.</p>
                <button className='btn-primary'>Subscribe</button>
            </div>

        </div>
    )
}

export default Banner
