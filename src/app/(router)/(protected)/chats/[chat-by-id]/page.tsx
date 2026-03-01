'use client'
import { useChats } from '@/app/store/chats/chat'
import { API } from '@/shared/utils/config'
import { ArrowLeft, Heart, Image, Info, Mic, Phone, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import profile from '../../profile/profil-removebg-preview.png'
import { useTranslation } from 'react-i18next'
import getToken from '@/api/token'
import { menu, stiker } from '@/app/provider/svg/svg'
import EmojiPicker from 'emoji-picker-react'
import { formatDate } from '../../../../../entities/home/comments/script';

export default function page({params}:{params:{'chat-by-id':string}}) {
  const {chatById,deleteChat,getChatById,loading,sendMessage,deleteMessage,getChats,chats}=useChats()
  const chatId = params['chat-by-id']
  const myId=getToken()?.sid
  const [file,setFile]=useState<File|null>(null)
  const [messageText,setMessageText]=useState<string>("")
  const [showEmojiPicker,setShowEmojiPicker]=useState<boolean>(false)
  useEffect(()=>{
    getChatById(chatId)
    getChats()
  },[chatId])
  const router=useRouter()
  const userChat=chats.find(c=>c.chatId.toString()===chatId)
  const {t}=useTranslation()
  const fileInputRef=useRef<HTMLInputElement|null>(null)
  
  function handleFileChange(e:any){
    const selectedFile=e.target?.files?.[0]
    if(selectedFile){
      setFile(selectedFile)
    }
  }

  const handleSendMessage=async()=>{
    if (!messageText.trim()&&!file)return
    const formData=new FormData()
    formData.append("ChatId",chatId)
    formData.append("MessageText",messageText)
    if(file) formData.append("File",file)
    try {
      await sendMessage(formData)
      setMessageText("")
      fileInputRef.current.value=null
      setFile(null)
      setShowEmojiPicker(false)
      await getChatById(Number(chatId))
    } catch (error) {
      console.error(error)
    }
  }

  function isFileName(text?:string){
    if(!text) return
    return /\.(png|jpg|jpeg|gif|mp4|webm|mov)$/i.test(text)
  }

  let isMe= userChat?.sendUserId==myId
  let isMyId=isMe?userChat?.receiveUserId:userChat?.sendUserId
  let isMyName=isMe?userChat?.receiveUserName:userChat?.sendUserName
  let isMyImage=isMe?userChat?.receiveUserImage:userChat?.sendUserImage

  function formatMessageTime(dates:string) {
    const date = new Date(dates);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = date.getDay(); // 0-6
    const week = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    };
    return `${week[day]} ${hours}:${minutes}`;
  }

if(!userChat) return
  return (
     <>
          <div className='flex h-[100%] flex-col bg-background mt-15 md:mt-0'>
               <div className='flex items-center gap-3 border-b border-ig-separator px-4 py-[10px]'>
                    <button
                        onClick={()=>router.back()}
                        className="mr-1 p-1 hover:opacity-60 transition-opacity lg:hidden"
                      >
                          <ArrowLeft className="h-6 w-6 text-foreground" />
                    </button>
                    <div className='relative shrink-0'>
                        <img 
                          src={
                            isMyImage?
                             `${API}/images/${isMyImage}`
                             :profile.src
                            } 
                          alt={isMyId} 
                          className="w-11 h-11 rounded-full cursor-pointer object-cover"
                          onClick={()=>router.push("/profile/"+isMyId)}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                          <h3 className="text-base cursor-pointer font-semibold text-foreground leading-tight" onClick={()=>router.push("/profile/"+isMyId)}>{isMyName}</h3>
                          <p className="text-gray-500">{isMyName}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <button className='cursor-pointer'>
                           <Phone className="h-6 w-6 text-foreground" />
                        </button>
                        <button className='cursor-pointer'>
                           <Video className="h-6 w-6 text-foreground" />
                        </button>
                        <button className='cursor-pointer'>
                           <Info className="h-6 w-6 text-foreground" />
                        </button>
                    </div>
               </div>

               <div className="flex-1 overflow-y-auto px-4 py-4">
                      <div className="flex flex-col items-center mb-8 mt-4">
                            <img  
                              src={
                                isMyImage?`${API}/images/${isMyImage}`:profile.src
                              } 
                              alt={"profile"}
                              className="h-24 w-24 cursor-pointer rounded-full object-cover mb-3"
                           />
                          <p className="text-lg font-bold text-foreground">{isMyName}</p>
                          <p className="text-sm text-muted-foreground">
                              {isMyName} · Instagram
                          </p>
                          <button className="mt-3 rounded-lg cursor-pointer bg-input px-4 py-[6px] text-sm font-semibold text-foreground hover:bg-secondary transition-colors" onClick={()=>router.push("/profile/"+userChat.receiveUserId)}>{t("View profile")}</button>
                      </div>

                      <div className="space-y-[2px]">
                           {chatById
                                .sort((a:any,b:any)=>
                                  new Date(a.sendMassageDate).getTime()-
                                  new Date(b.sendMassageDate).getTime()
                                )
                                .map(chat=>{
                                    let isMe=chat.userId==myId
                                     return (
                                         <div className={`flex gap-1 ${isMe?"justify-end":"justify-start"} mb-2`} key={chat.messageId}>
                                              {!isMe&&(
                                                 <img 
                                                    src={chat.userImage? `${API}/images/${chat.userImage}`:profile.src}
                                                    alt={chat.userId}
                                                    className="w-7 h-7 rounded-full object-cover shrink-0 mb-[2px]" 
                                                 />
                                              )}

                                              <div className="flex flex-col items-center">
                                                   {chat.messageText&&!isFileName(chat.messageText)&&(
                                                      <div className='flex gap-0.5'>
                                                           <div className={`px-4 py-2 text-sm rounded-2xl ${isMe ? "bg-blue-500 text-white dark:bg-[#4A5DF9] rounded-br-none" : "bg-gray-100 text-gray-900 dark:bg-[#25292E] dark:text-white rounded-bl-none"}`}>
                                                              {chat.messageText}
                                                           </div>
                                                           <span>{menu}</span>
                                                      </div>
                                                   )}

                                                   {chat.file &&(
                                                      <div className="mt-2">
                                                          {chat.file.endsWith(".mp4")?(
                                                            <video src={`${API}/images/${chat.file}`} className='max-w-[250px] rounded-xl' controls />
                                                          ):(
                                                              <img src={`${API}/images/${chat.file}`} alt="file" className="max-w-[250px] rounded-xl" />
                                                          )}
                                                      </div>
                                                   )}

                                                   <span className="text-xs text-gray-400 mt-1 text-center">
                                                        {formatMessageTime(chat.sendMassageDate)}
                                                   </span>
                                              </div>
                                         </div>
                                     )
                                })
                            }
                      </div>
               </div>

               <div className="px-4 py-3 border-t border-ig-separator">
                       <div className="flex items-center gap-3 rounded-full px-4 py-[6px] border border-ig-separator">
                            <button onClick={()=>setShowEmojiPicker(true)} className="shrink-0 cursor-pointer">{stiker}</button>
                            <input 
                                type="text" 
                                placeholder={t("writemessage")}
                                value={messageText}
                                onChange={(e)=>setMessageText(e.target.value)}
                                onKeyDown={(e)=>{
                                  if(e.key=="Enter"&&(messageText.trim() || file)){
                                    handleSendMessage()
                                  }
                                }}
                                onFocus={()=>setShowEmojiPicker(false)}
                                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                            />
                            <input
								                type='file'
								                accept='image/*'
								                ref={fileInputRef}
								                style={{ display: 'none' }}
								                onChange={handleFileChange}
								            />
                            {showEmojiPicker && (
										            <div className='absolute bottom-[50px] z-50'>
											              <EmojiPicker
											              	onEmojiClick={emojiData =>
											              		setMessageText(prev => prev + emojiData.emoji)
											              	}
											              />
										            </div>
									          )}
                            {messageText.trim()?(
                                <button onClick={handleSendMessage} className="text-[#6789f8] cursor-pointer font-semibold text-sm transition-colors">
                                    {t("send")}
                                </button>
                            ):(
                                <div className="flex items-center gap-3">
                                        <button className="cursor-pointer">
                                            <Mic className="h-6 w-6 text-foreground" />
                                        </button>
                                        <button className="cursor-pointer">
                                            <Image onClick={()=>fileInputRef.current?.click()} className="h-6 w-6 text-foreground" />
                                        </button>
                                        <button className="cursor-pointer" onClick={async()=>{
                                               const newFormData=new FormData()
                                               newFormData.append("ChatId",chatId)
                                               newFormData.append("MessageText",'❤️')
                                                await sendMessage(newFormData)
                                        }}>
                                             <Heart className="h-6 w-6 text-foreground" />
                                        </button>
                                </div>
                            )}
                       </div> 
               </div>
          </div>
     </>
  )
}
