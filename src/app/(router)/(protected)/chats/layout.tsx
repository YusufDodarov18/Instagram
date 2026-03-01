'use client'
import { useChats } from '@/app/store/chats/chat'
import { useProfile } from '@/app/store/profile/myProfile/profile'
import { API } from '@/shared/utils/config'
import { ChevronDown, Edit, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import defaultProfile from '../profile/profil-removebg-preview.png'
import MenuRecomendation from '@/entities/home/recommendation/menu'
import ModalChat from '@/entities/chats/modal/component'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { menu } from '@/app/provider/svg/svg'

function Layout({children}:{children:React.ReactNode}) {
    const {chats,deleteChat,getChats,loading, getChatById,createChat,chatById}=useChats()
    const [openModal,setOpenModal]=useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null)
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null)
    const [openMessageModal,setOpenMessageModal]=useState<boolean>(false)
    const {myProfile}=useProfile()
    const {t}=useTranslation()
    const params = useParams()
    const activeChatId = params?.['chat-by-id']
    
    useEffect(()=> {
        getChats()
    },[getChats])

    useEffect(() => {
        const handleClick = () => setMenuPosition(null)
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [])

    return (
        <>
            <div className="flex w-[100%] h-[100vh] bg-background">
                <div className='flex flex-1 min-w-0'>
                    <div
                        className={`w-full lg:w-[400px] lg:max-w-[400px] flex-shrink-0 border-r border-ig-separator ${
                            activeChatId  ? "hidden lg:flex" : "flex"} flex-col`}
                        >
                            <div className="flex flex-col h-full bg-background">
                                <div className='flex items-center justify-between px-5 py-[18px] border-b  border-ig-separator'>
                                    <div className='flex items-center gap-1 cursor-pointer' onClick={()=>setOpenModal(true)}>
                                        <h1 className="text-[20px] font-bold text-foreground">{myProfile?.userName}</h1>
                                        <ChevronDown className="h-4 w-4 text-foreground" />
                                    </div>
                                    <button onClick={()=>setOpenMessageModal(true)} className="p-1 cursor-pointer duration-150 ">
                                        <Edit className="h-6 w-6 text-foreground" />
                                    </button>
                                </div>

                                <div className='px-4 py-2'>
                                    <div className='relative'>
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            placeholder={t("search1")}
                                            className="w-full h-[40px] rounded-lg bg-input pl-10 pr-4 py-[7px] text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                        />
                                    </div>
                                </div>

                                <div className='flex px-4 py-1 gap-2'></div>

                                <div className='flex-1 overflow-y-auto mt-1'>
                                    {chats.map((chat)=>(
                                        <Link href={`/chats/${chat.chatId}`}>
                                            <div key={chat.chatId} className={`flex group  w-[100%] items-center gap-3 px-5 py-2 transition-colors cursor-pointer ${Number(activeChatId) === chat.chatId ? "bg-accent" : "hover:bg-accent/50"}`} key={chat.chatId}>
                                                <div className="relative shrink-0">
                                                     <img 
                                                         src={chat?.receiveUserImage?
                                                         `${API}/images/${chat.receiveUserImage}`:
                                                         defaultProfile.src
                                                         } 
                                                         alt={`${chat.chatId}`}
                                                         className='w-14 h-14 rounded-full object-cover'
                                                     />
                                                </div>
                                                <div className='flex-1 min-w-0 text-left'>
                                                     <div className='flex items-center justify-between'>
                                                         <span className='text-sm font-semibold '>{chat.receiveUserName}</span>
                                                     </div>
                                                     <div className='flex items-center gap-1'>
                                                         <span className={`text-sm truncate font-semibold`}>Салом c</span>  
                                                     </div>
                                                </div>
                                                <div className='hidden group-hover:block' onClick={(e)=>{
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                                                    setMenuPosition({x: rect.left,y: rect.bottom})
                                                     setSelectedChatId(chat.chatId)
                                                }}>{menu}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    <div className={`flex-1 min-w-0 ${activeChatId ? "flex" : "hidden lg:flex"} flex-col`}>
                         {children}
                    </div>
                </div>
            </div>
            {menuPosition &&(
                <div className='fixed z-[9999]' style={{ top: menuPosition.y,left: menuPosition.x}}>
                    <div className='flex justify-center px-10 py-6 flex-col font-bold items-center rounded-3xl gap-5 bg-[#f7f7f7] dark:bg-[#242323] w-[220px]'>
                         <div className='flex justify-between items-center  gap-1 cursor-pointer'>
                                <p>{t("Mark as unread")}</p>
                                <svg aria-label="Отметить переписку как непрочитанную" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="30" role="img" viewBox="0 0 24 24" width="30">
                                    <title>Отметить переписку как непрочитанную</title>
                                    <path d="M22 8.998a1 1 0 0 0-1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.655l8.448 5.622a.991.991 0 0 0 1.108 0l6.682-4.447a.998.998 0 0 0 .279-1.386.995.995 0 0 0-1.386-.278l-6.129 4.078L3 6.254V4.998a1 1 0 0 1 1-1h11a1 1 0 1 0 0-2H4c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h16c1.654 0 3-1.346 3-3v-9a1 1 0 0 0-1-1Z"></path>
                                    <path d="M21.071.998a2.929 2.929 0 1 0 0 5.858 2.929 2.929 0 0 0 0-5.858Z"></path>
                                </svg>
                         </div>
                         <div className='flex justify-between gap-1 items-center cursor-pointer'>
                                <p>Pin</p>
                                <svg aria-label="Pin" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20">
                                    <title>Pin</title>
                                    <path d="m22.707 7.583-6.29-6.29a1 1 0 0 0-1.414 0 5.183 5.183 0 0 0-1.543 3.593L8.172 8.79a5.161 5.161 0 0 0-4.768 1.42 1 1 0 0 0 0 1.414l3.779 3.778-5.89 5.89a1 1 0 1 0 1.414 1.414l5.89-5.89 3.778 3.779a1 1 0 0 0 1.414 0 5.174 5.174 0 0 0 1.42-4.769l3.905-5.287a5.183 5.183 0 0 0 3.593-1.543 1 1 0 0 0 0-1.414Zm-3.979.941a.974.974 0 0 0-.908.4l-4.512 6.111a1 1 0 0 0-.14.927 3.037 3.037 0 0 1-.194 2.403l-7.34-7.339a3.042 3.042 0 0 1 2.403-.196.994.994 0 0 0 .927-.138l6.111-4.512a.999.999 0 0 0 .4-.909 3.086 3.086 0 0 1 .342-1.75l4.662 4.662a3.072 3.072 0 0 1-1.75.341Z"></path>
                                </svg>
                         </div>
                         <div className='flex justify-between gap-1 items-center cursor-pointer'>
                                <p>{t("Stop")}</p>
                                <svg aria-label="Скрыть ветку" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20">
                                    <title>Скрыть ветку</title>
                                    <path d="M15.209 18.294a1 1 0 0 0-.707-.293H6.184a2.002 2.002 0 0 1-1.74-2.993l.47-.822a8.34 8.34 0 0 0 1.093-4.174c0-.159.005-.316.017-.471a1 1 0 1 0-1.994-.15 8.093 8.093 0 0 0-.023.63 6.341 6.341 0 0 1-.83 3.175l-.47.822a4.001 4.001 0 0 0 3.477 5.983h1.944a4 4 0 0 0 7.827-.382 1 1 0 0 0-.282-.86Zm-3.207 2.708a2 2 0 0 1-1.732-1.001h3.463a2.017 2.017 0 0 1-1.731 1.001Zm11.205.291-2.521-2.521a4.04 4.04 0 0 0 .976-1.629 3.957 3.957 0 0 0-.356-3.123l-.484-.853A6.358 6.358 0 0 1 20 9.997a7.953 7.953 0 0 0-4.745-7.302 3.972 3.972 0 0 0-6.51.002 8.011 8.011 0 0 0-2.438 1.697L2.707.793a1 1 0 0 0-1.414 1.414l20.5 20.5a1 1 0 0 0 1.414-1.414Zm-3.46-4.728a2.042 2.042 0 0 1-.468.8L7.72 5.805a6.004 6.004 0 0 1 2.068-1.377.998.998 0 0 0 .494-.426 1.976 1.976 0 0 1 3.439 0 1 1 0 0 0 .494.425 5.989 5.989 0 0 1 3.786 5.634 8.303 8.303 0 0 0 1.082 4.094l.483.852a1.975 1.975 0 0 1 .181 1.558Z"></path>
                                </svg>
                         </div>
                         <div className='flex justify-between gap-1  items-center text-red-500 cursor-pointer'  onClick={()=>deleteChat(selectedChatId)}>
                                <p>{t("delete")}</p>
                               <svg aria-label="Удалить ветку" className="x1lliihq x1n2onr6 xkmlbd1" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20">
                                    <title>Удалить ветку</title>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.876" x2="21.124" y1="4.727" y2="4.727"></line>
                                    <path d="M8.818 4.727v-1.59A1.136 1.136 0 0 1 9.954 2h4.092a1.136 1.136 0 0 1 1.136 1.136v1.591" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                    <path d="m4.377 4.727 1.987 15.88A1.59 1.59 0 0 0 7.942 22h8.116a1.59 1.59 0 0 0 1.578-1.393l1.987-15.88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                               </svg>
                         </div>
                    </div>
                </div>
            )}
            <MenuRecomendation
                open={openModal}
                onClose={() => setOpenModal(false)}
                userName={myProfile?.userName}
            />
            <ModalChat onClose={() => setOpenMessageModal(false)} open={ openMessageModal}  />
        </>
    )
}

export default Layout;