import GetOnlineUsers from "@/components/GetOnlineUsers";
import { Nave } from "@/components/Nave";
import Notification from "@/components/Notification";
import SendNotification from "@/components/SendNotification";

export default function Home() {
  return (
    <>
      <div className="h-full w-full relative">
        <Nave />
        <GetOnlineUsers />
        <SendNotification />
       
          <Notification />
       
      </div>
    </>
  );
}
