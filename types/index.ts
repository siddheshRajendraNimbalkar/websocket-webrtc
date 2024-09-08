import { User } from "@clerk/nextjs/server";

export type SocketUser = {
    userId: string,
    socketId: string,
    profile: User
}

export type isCallType = {
    UserId:string,
    senderName:string,
    imageUrl:string
}