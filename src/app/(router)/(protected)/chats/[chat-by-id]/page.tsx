'use client'
import { useChats } from '@/app/store/chats/chat'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page({params}:{params:{'chat-by-id':string}}) {
  const [messageText,setMessageText]=useState<string>("")
  const {chatById,deleteChat,getChatById,loading,sendMessage,deleteMessage,}=useChats()
const chatId = params['chat-by-id']
  useEffect(()=>{
    getChatById(chatId)
  },[chatId])
  const router=useRouter()
  console.log(chatById)
  return (
     <>
          <div className='flex h-[100%] flex-col bg-background'>
               <div className='flex items-center gap-3 border-b  border-ig-separator px-4 py-[10px]'>
                    <button
                        onClick={()=>router.back()}
                        className="mr-1 p-1 hover:opacity-60 transition-opacity lg:hidden"
                      >
                          <ArrowLeft className="h-6 w-6 text-foreground" />
                    </button>
                    <div className='relative shrink-0'>
                       {/* <img src={} alt={} /> */}
                    </div>
               </div>
          </div>
     </>
  )
}
