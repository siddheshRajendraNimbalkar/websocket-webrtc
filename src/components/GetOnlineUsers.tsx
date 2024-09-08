'use client'

import { useSocket } from '@/context/WebSocket'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const GetOnlineUsers = () => {
    const { onlineUser } = useSocket();
    const {user} = useUser();
    return (
        <div>
            {onlineUser ? (
                <div className='bg-zinc-600 rounded-sm m-4 w-1/3 max-h-90 overflow-auto hide-scrollbar flex flex-col justify-center items-center'>
                    {onlineUser.map((e) => (
                        user?.id == e.userId ? null : <div key={e.userId} className='flex justify-between items-center w-5/6 my-2 mx-2 hover:bg-zinc-900 p-1 rounded-md pr-2'>
                        <Image alt={e.userId}
                            height={50}
                            width={50}
                            src={e.profile.imageUrl}
                            className='rounded-full'
                        />
                        <div className='flex justify-start w-2/3 text-white overflow-hidden'>
                            {e.profile.firstName ? e.profile.firstName : "Anonymous"}
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                <div>There are no users online</div>
            )}
        </div>
    );
}

export default GetOnlineUsers;
