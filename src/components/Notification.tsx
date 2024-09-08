'use client'
import { useCallGoing } from '@/context/WebSocket';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const Notification = () => {
  const callContext = useCallGoing();
  const { user } = useUser();

  if (!callContext || !Array.isArray(callContext.isCall) || callContext.isCall.length === 0) {
    return <div>NO Notification</div>;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {callContext.isCall.map((e, index) => {
        if (e.UserId === user?.id) {
          return null;
        }
        return (
          <div
            key={index}
            className="relative backdrop-blur-md bg-white/30 rounded-md h-full w-full"
          >
            <div>
              {
                e.imageUrl !== undefined ? <div>
                  <Image
                    src={e.imageUrl}
                    alt={e.UserId}
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                </div> : <div className='bg-black rounded-full flex justify-center items-center w-[60px] h-[60px]'>
                  <div className='text-white'>{e.senderName[0]}</div>
                </div>
              }
            </div>
            <div>{e.senderName}</div>
            <div>{e.UserId}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
