import { UserButton } from '@clerk/nextjs'
import { SquarePlay } from 'lucide-react'
import React from 'react'

export const Nave = () => {
  return (
    <div className="flex justify-between items-center h-12 text-black bg-white px-3 border-b-4 border-zinc-400">
        <div className="font-bold flex gap-2 text-xl p-0 border-b-2 border-black cursor-pointer" >
          <div>VidMeet</div> <div className=""><SquarePlay /></div> </div>
        <div className=""><UserButton appearance={{
                elements:{
                    avatarBox:"h-[32px] w-[32px]"
                }
            }}
            afterSignOutUrl="/sign-in"/></div>
    </div>
  )
}

