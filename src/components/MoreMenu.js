import React from 'react'
import Penedit from '../public/svgs/Penedit'
import BinDel from '../public/svgs/BinDel'



export default function MoreMenu() {
    return (
        <div class="border border-gray-300  py-1 flex flex-col w-[94px] ">
            <div className='flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer'>
                <p class ="pl-1 "><Penedit /> </p> <p>Edit </p>
            </div>
            <div className='flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer'>
               <p class ="pl-1"><BinDel /></p> <p class='pb-[1.25px]'>Delete </p>
            </div>
        </div>
    )
}
