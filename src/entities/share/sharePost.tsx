// 'use client'
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import { useTranslation } from 'react-i18next';
// import { ArrowRight, Facebook, Link, Mail, MessageCircleMore, Search, X } from 'lucide-react';
// import profile from "../../app/(router)/(protected)/profile/profil-removebg-preview.png"
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import GestureIcon from '@mui/icons-material/Gesture';
// import { useChats } from '@/app/store/pages/chats/chat';
// import { API } from '@/shared/utils/config';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';

// const SharePost = ({open,onClose,file}:{open:boolean, onClose:()=>void,file?:string}) => {
//    const {chats,createChat,datas,getChats,searchUsers,sendMessage}=useChats()
//    const [arrowLeft, setArrowLeft] = useState(false);
//    const [arrowRight, setArrowRight] = useState(false);
//    const [search,setSearch]=useState("")
//    const [select,setSelect]=useState<string|null>(null)
//    const [message,setMessage]=useState("")
//    const [idx,setIdx]=useState(null)
//    const scrollRef = useRef<HTMLDivElement>(null);
//    const {t}=useTranslation()

//    useEffect(()=>{
//       getChats()
//    },[getChats])
   
//    function checkScroll() {
//      const scroll = scrollRef.current;
//      if (scroll) {
//        setArrowLeft(scroll.scrollLeft > 0);
//        setArrowRight(scroll.scrollLeft + scroll.clientWidth < scroll.scrollWidth);
//      }
//    }

//    function handleScroll(direction: "left" | "right") {
//      const scroll = scrollRef.current;
//      if (scroll) {
//        scroll.scrollLeft += direction === "left" ? -120 : 120;
//        // Увеличь задержку или используй requestAnimationFrame
//        setTimeout(checkScroll, 300);
//      }
//    }

//    const router=useRouter()
  

//      useEffect(() => {
//         if (!open) return;

//       // Небольшая задержка, чтобы DOM успел отрисоваться
//        const timer = setTimeout(() => {
//           checkScroll();
//           const scroll = scrollRef.current;
//           if (!scroll) return;

//           scroll.addEventListener("scroll", checkScroll);
//           window.addEventListener("resize", checkScroll);
//         },100);

//       return () => {
//         clearTimeout(timer);
//         const scroll = scrollRef.current;
//         if (scroll) scroll.removeEventListener("scroll", checkScroll);
//         window.removeEventListener("resize", checkScroll);
//       };
//       }, [open]);

//       async function handleSelect(id:string){
//          if(id==select){
//             setSelect(null)
//          }else{
//             setSelect(id)
//             const chatid=await createChat(id)
//             setIdx(chatid)
//          }
//       }

//       function handleSearchUsers(e:ChangeEvent<HTMLInputElement>){
//         const {value}=e.target
//         setSearch(value)
//         searchUsers(value)
//       }

//       async function sendData() {
//         if(!idx) return
//         const formData=new FormData()
//         formData.append("ChatId",idx)
//         formData.append("MessageText",message||"")
//         if (file) {
//           const response = await fetch(file)
//           const blob = await response.blob()
//           formData.append("File", blob, "file.png") 
//          }
//         await sendMessage(formData)
//         router.push(`/chats/${idx}`)
//       }

//      return (
//         <Dialog open={open} onOpenChange={onClose}>
//              <DialogContent className="sm:max-w-md max-h-[65vh] h-[55vh] flex flex-col m-0 p-0 dark:text-white dark:bg-[#1d2024] [&>button]:hidden">
//                 <header className="pt-5 px-4 w-full flex flex-col">
//                    <div className="flex">
//                         <div className="w-20">
//                            <CloseIcon onClick={onClose} sx={{ cursor: "pointer", width: 30, height: 30 }}/>
//                         </div>
//                         <div className="flex-1">
//                             <h2 className="indent-0 text-xl font-bold md:indent-20">{t("share")}</h2>
//                          </div>
//                    </div>
//                   <div className="pt-5">
//                      <div className="relative flex w-full h-9 items-center rounded-lg gap-2 dark:bg-[#25292e] py-3 px-2">
//                          <Search className="w-5 h-5" />
//                          <input onChange={handleSearchUsers} type="text" placeholder="Поиск" className="outline-0 " />
//                      </div>
//                   </div>
//                 </header>

//                 <main className="flex-1 max-h-[40vh] overflow-y-auto flex gap-3 flex-wrap px-5">
//                      {
//                         search.trim()?
//                          datas.length>0?(
//                            datas.map(user=>(
//                             <div key={user.id} className="w-20 h-25 flex justify-center items-center flex-wrap relative flex-col rounded-lg hover:dark:bg-[#343435] cursor-pointer" onClick={()=>handleSelect(user.id)}>
//                              <img src={user.avatar?`${API}/images/${user.avatar}`:profile.src} className="w-11 h-11 rounded-full"/>
//                               <h2 className="mt-1">{user.userName}</h2>
//                                 {select==user.id&&(
//                                   <svg aria-label="Значок галочки с заливкой" className="bg-[#0b9df7] absolute right-2 scale-200 rounded-full" fill="currentColor" height="8" role="img" viewBox="0 0 24 24" width="8">
//                                     <title>Значок галочки с заливкой</title>
//                                     <polyline fill="none" points="21.648 5.352 9.002 17.998 2.358 11.358" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
//                                   </svg>
//                                 )}
//                           </div>
//                            ))
//                         ):(
//                           ""
//                         ):
//                         chats?.map((user)=>(
//                           <div key={user.chatId} className="w-20 h-25 flex justify-center items-center relative flex-col rounded-lg hover:dark:bg-[#343435] cursor-pointer" onClick={()=>handleSelect(user.chatId)}>
//                              <img src={user.receiveUserImage?`${API}/images/${user.receiveUserImage}`:profile.src} className="w-11 h-11 rounded-full"/>
//                             <h2 className="mt-1">{user.receiveUserName}</h2>
//                               {select==user.chatId&&(
//                                 <svg aria-label="Значок галочки с заливкой" className="bg-[#0b9df7] absolute right-2 scale-200 rounded-full" fill="currentColor" height="8" role="img" viewBox="0 0 24 24" width="8">
//                                   <title>Значок галочки с заливкой</title>
//                                   <polyline fill="none" points="21.648 5.352 9.002 17.998 2.358 11.358" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
//                                 </svg>
//                               )}
//                         </div>
//                      ))
//                      }
//                 </main>

//                 <footer className="border-t p-4 h-23 pb-23 relative">
//                    {select?(
//                      <div className="w-full">
//                         <input 
//                               type="text" 
//                               className={"w-full outline-0 pb-5"} 
//                               placeholder={t('writemessage')} 
//                               value={message}
//                               onChange={(e)=>setMessage(e.target.value)}
//                         />
//                          <Button className="w-full bg-[#2a4dff] hover:bg-[#3c59eb] text-white cursor-pointer" onClick={sendData}>{t("send")}</Button>
//                      </div>
//                    ):(
//                      <>
//                          {arrowLeft && (
//                            <button className="dark:bg-[#fff] hidden md:block dark:text-black absolute left-1 top-8 rounded-full cursor-pointer" onClick={() => handleScroll("left")}>
//                               <KeyboardArrowLeftIcon />
//                             </button>
//                        )}
//                        {arrowRight && (
//                            <button className="dark:bg-[#fff] dark:text-black hidden md:block absolute right-1 top-8 rounded-full cursor-pointer" onClick={() => handleScroll("right")}>
//                                 <KeyboardArrowRightIcon />
//                            </button>
//                        )}
//                        <div className="flex gap-3.5 justify-around text-sm pb-4 overflow-x-auto scroll-smooth" style={{ scrollbarWidth: "none" }} ref={scrollRef}>
//                            <div className="flex flex-col justify-center gap-1">
//                               <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                                 <Link className="w-5 h-5" />
//                               </button>
//                               <p className="indent-0">{t("copy")}</p>
//                            </div>
//                            <div className="flex flex-col justify-center gap-1">
//                               <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                                 <Facebook className="w-5 h-5" />
//                               </button>
//                               <p className="indent-0">Facebook</p>
//                            </div>
//                          <div className="flex flex-col justify-center gap-1">
//                            <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                              <MessageCircleMore className="w-5 h-5"  />
//                            </button>
//                            <p className="indent-0">Messenger</p>
//                          </div>
//                          <div className="flex flex-col justify-center gap-1">
//                            <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                              <WhatsAppIcon/>
//                            </button>
//                            <p className="indent-0">WhatsApp</p>
//                          </div>
//                          <div className="flex flex-col justify-center gap-1">
//                            <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                              <Mail className="w-5 h-5"  />
//                            </button>
//                            <p className="indent-3">Email</p>
//                          </div>
//                          <div className="flex flex-col justify-center gap-1">
//                              <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                                <GestureIcon/>
//                               </button>
//                              <p className="indent-1">Threads</p>
//                          </div>
//                           <div className="flex flex-col justify-center gap-1">
//                              <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                                 <X className="w-5 h-5" />
//                              </button>
//                             <p className="indent-5">X</p>
//                           </div>
//                           <div className="flex flex-col justify-center gap-1">
//                             <button className="w-13 h-13 rounded-full flex justify-center items-center bg-[#25292e] text-white cursor-pointer">
//                               <ArrowRight className="w-5 h-5" />
//                             </button>
//                             <p className="indent-4">{t("everyone")}</p>
//                           </div>
//                        </div>
//                      </>
//                    )}
//                 </footer>
//              </DialogContent>
//         </Dialog>
//      );
// }

// export default SharePost;
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { X, Search, Link, Mail, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/app/store/pages/home/users/users";
import profile from "../../app/(router)/(protected)/profile/profil-removebg-preview.png"
import { API } from "@/shared/utils/config";
import { useChats } from "@/app/store/pages/chats/chat";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.26 5.887-3.26-6.559 6.763z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.243 1.33-3.023.88-.744 2.084-1.168 3.59-1.264 1.104-.07 2.134.024 3.07.28-.078-1.063-.396-1.878-.957-2.432-.63-.623-1.558-.942-2.76-.95h-.033c-.894.006-1.66.27-2.28.786l-1.42-1.487C9.58 4.398 10.748 3.98 12.12 3.967h.05c1.665.014 2.97.51 3.882 1.476.858.91 1.34 2.168 1.441 3.748.523.142 1.012.323 1.463.547 1.118.555 2.01 1.388 2.578 2.408.74 1.328.86 3.085.358 4.828-.66 2.297-2.276 3.876-4.534 4.432-1.077.266-2.308.393-3.643.393-.08 0-.16 0-.24-.002h-.098zM10.57 13.597c-.784.05-1.392.268-1.808.648-.352.321-.507.717-.475 1.212.036.563.315 1.003.83 1.311.578.346 1.31.494 2.065.455 1.1-.06 1.937-.448 2.489-1.155.388-.497.66-1.155.804-1.957-.73-.242-1.543-.392-2.426-.44-.498-.03-.995-.062-1.48-.074z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SharePlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  link?:string
}

const links: SharePlatform[] = [
  { id: "link", name: "Копировать ссылку", icon: <Link className="h-6 w-6" /> },
  { id: "facebook", name: "Facebook", icon: <FacebookIcon />,link:"https://www.facebook.com/share_channel/#" },
  { id: "messenger", name: "Messenger", icon: <MessengerIcon />,link:"https://www.facebook.com/share_as_message/?link=https%3A%2F%2Fwww.instagram.com%2Freel%2FDV0MIuHk9vV%2F%3Figsh%3DM2ViY2RjMDFkMA%3D%3D&app_id=1217981644879628" },
  { id: "whatsapp", name: "WhatsApp", icon: <WhatsAppIcon />,link:"https://api.whatsapp.com/send/?text=%D0%9F%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%D1%82%D0%B5+%D1%8D%D1%82%D1%83+%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8E+%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F+%40thetrillionairelife+%D0%B2+Instagram%3A+https%3A%2F%2Fwww.instagram.com%2Freel%2FDV0MIuHk9vV%2F%3Figsh%3DYzAyMDM1MGJkZA%3D%3D&type=custom_url&app_absent=0" },
  { id: "email", name: "Email", icon: <Mail className="h-6 w-6" />,link:"mailto:?subject=%D0%9F%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%D1%82%D0%B5%20%D1%8D%D1%82%D1%83%20%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20%40thetrillionairelife%20%D0%B2%20Instagram&body=%D0%9F%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%D1%82%D0%B5%20%D1%8D%D1%82%D1%83%20%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20%40thetrillionairelife%20%D0%B2%20Instagram%3A%20https%3A%2F%2Fwww.instagram.com%2Freel%2FDV0MIuHk9vV%2F%3Figsh%3DZGUzMzM3NWJiOQ%3D%3D" },
  { id: "threads", name: "Threads", icon: <ThreadsIcon />,link:"https://www.threads.com/login?next=https%3A%2F%2Fwww.threads.com%2Fintent%2Fpost%3Ftext%3D%25D0%259F%25D0%25BE%25D1%2581%25D0%25BC%25D0%25BE%25D1%2582%25D1%2580%25D0%25B8%25D1%2582%25D0%25B5%2B%25D1%258D%25D1%2582%25D1%2583%2B%25D0%25BF%25D1%2583%25D0%25B1%25D0%25BB%25D0%25B8%25D0%25BA%25D0%25B0%25D1%2586%25D0%25B8%25D1%258E%2B%25D0%25BF%25D0%25BE%25D0%25BB%25D1%258C%25D0%25B7%25D0%25BE%25D0%25B2%25D0%25B0%25D1%2582%25D0%25B5%25D0%25BB%25D1%258F%2B%2540thetrillionairelife%2B%25D0%25B2%2BInstagram%253A%2Bhttps%253A%252F%252Fwww.instagram.com%252Freel%252FDV0MIuHk9vV%252F%26__coig_login%3D1" },
  { id: "x", name: "X", icon: <XIcon /> , link:"https://x.com/intent/post?text=%D0%9F%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%D1%82%D0%B5%20%D1%8D%D1%82%D1%83%20%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20%40thetrillionairelife%20%D0%B2%20Instagram&url=https%3A%2F%2Fwww.instagram.com%2Freel%2FDV0MIuHk9vV%2F%3Figsh%3DY2Q0NmNiMjc3NQ%3D%3D"},
];


export default function ShareModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const {getUsers,users,loading} = useUser()
  const {chats,createChat,chatById,datas,deleteChat,getChatById,getChats,searchUsers,sendMessage}=useChats()
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string|null>(null);
  const [scroll, setScroll] = useState(0);
  const {t}=useTranslation()
  const isSearching = search.length > 0;

useEffect(() => {
  if (!isSearching) return;
  searchUsers(search.toLowerCase());
}, [search]);


  const handleCancel = () => {
    setSearch("");
  };

  const arrowLeft = scroll > 0;
  const arrowRight = scroll < links.length - 6;

  useEffect(()=>{
    getUsers()
  },[getUsers])

  const router=useRouter()


  function handleSelectUser(userId:string){
    if(selectedUsers==userId){
      setSelectedUsers(null)
    }else{
      setSelectedUsers(userId)
      console.log("userId: ", userId, "selected!" )
    }
  }
  return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="gap-0 overflow-hidden rounded-xl border-0 p-0 shadow-2xl sm:max-w-[548px] [&>button]:hidden">
          {/* Header */}
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ position: "relative", borderBottom: "1px solid hsl(var(--border))", px: 2, py: 1.5 }}>
            <DialogClose asChild>
              <IconButton size="small" sx={{ position: "absolute", left: 16, color: "hsl(var(--foreground))" }}>
                <X className="h-[18px] w-[18px]" strokeWidth={2.5} onClick={onClose} />
              </IconButton>
            </DialogClose>
            <DialogTitle className="text-base font-semibold text-foreground">
              {t("share")}
            </DialogTitle>
          </Stack>

          {/* Search */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 1 }}>
            <Box sx={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" style={{ zIndex: 1 }} />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search1")}
                className="h-9 rounded-lg border-0 bg-secondary pl-9 pr-8 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {isSearching && (
                <IconButton
                  size="small"
                  onClick={() => setSearch("")}
                  sx={{
                    position: "absolute",
                    right: 4,
                    width: 16,
                    height: 16,
                    bgcolor: "hsl(var(--muted-foreground) / 0.4)",
                    "&:hover": { bgcolor: "hsl(var(--muted-foreground) / 0.6)" },
                  }}
                >
                  <X className="h-2.5 w-2.5 text-secondary" strokeWidth={3} />
                </IconButton>
              )}
            </Box>
            {isSearching && (
              <Typography className="shrink-0 text-sm text-muted-foreground cursor-pointer" variant="body2" size="sm" onClick={handleCancel}>
                {t("cancel")}
              </Typography>
            )}
          </Stack>

          {/* Content */}
          <ScrollArea className="h-[340px]">
            {!isSearching ? (
              /* Grid view - recent users */
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px 0",
                  px: 4,
                  py: 1.5,
                }}
              >
                {users.map((user) => (
                  <Box key={user.id}>
                      <Button
                        variant="ghost"
                        onClick={()=>handleSelectUser(user.id)}
                        className="flex h-auto flex-col items-center gap-1.5 p-1 cursor-pointer hover:bg-transparent"
                      >
                        <Box sx={{ position: "relative" }}>
                          <Avatar className="h-16 w-16 border border-border/50">
                              <AvatarImage src={user.avatar?`${API}/images/${user.avatar}`:profile.src} />
                          </Avatar>
                          {selectedUsers==user.id && (
                            <Badge className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-0 bg-primary p-0">
                              <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                            </Badge>
                          )}
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            maxWidth: 80,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "hsl(var(--foreground))",
                            fontSize: "0.75rem",
                          }}
                        >
                          {user.userName.split(" ")[0]}
                          {/* {user.verified && (
                            <svg viewBox="0 0 40 40" className="ml-0.5 inline-block h-3 w-3" fill="none">
                              <circle cx="20" cy="20" r="20" fill="#0095F6" />
                              <path d="M17.2 27.5l-6.7-6.7 2.4-2.4 4.3 4.3 9.1-9.1 2.4 2.4z" fill="white" />
                            </svg>
                          )} */}
                        </Typography>
                      </Button>
                      <Typography variant="caption">{user?.username}</Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              /* List view - search results */
              <Box sx={{ py: 0.5 }}>
                {datas?.length > 0 && (
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 600, color: "hsl(var(--foreground))" }}>
                    {t("More Users")}
                  </Typography>
                )}
                {datas.map((user) => (
                  <Button
                    key={user.id}
                    onClick={()=>handleSelectUser(user.id)}
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-between rounded-none px-4 py-2"
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={
                          user.avatar?
                          `${API}/images/${user.avatar}`
                          :profile.src
                        }/>
                      </Avatar>
                      <Stack alignItems="flex-start" spacing={0}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "hsl(var(--foreground))" }}>
                          {user.fullName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "hsl(var(--muted-foreground))" }}>
                          {user.userName}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: selectedUsers===user.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                        bgcolor: selectedUsers==user.id ? "hsl(var(--primary))" : "transparent",
                        transition: "all 0.15s ease",
                        cursor:"pointer"
                      }}
                    >
                      {selectedUsers===user.id&& (
                        <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                      )}
                    </Box>
                  </Button>
                ))}
                {datas.length === 0 && (
                  <Typography variant="body2" sx={{ px: 2, py: 4, textAlign: "center", color: "hsl(var(--muted-foreground))" }}>
                    {t("Nothing found")}
                  </Typography>
                )}
              </Box>
            )}
          </ScrollArea>

          <Separator />

          {/* Share platforms */}
          <Box sx={{ position: "relative", px: 1, py: 1.5 }}>
            {!selectedUsers?(
              <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ overflow: "hidden" }}>
              {arrowLeft && (
                <IconButton
                  size="small"
                  onClick={() => setScroll((p) => Math.max(0, p - 1))}
                  sx={{
                    position: "absolute",
                    left: 4,
                    zIndex: 10,
                    bgcolor: "hsl(var(--background))",
                    boxShadow: 2,
                    "&:hover": { bgcolor: "hsl(var(--secondary))" },
                  }}
                >
                  <ChevronLeft className="h-4 w-4 text-foreground" />
                </IconButton>
              )}
              {links.slice(scroll, scroll + 7).map(
                (platform) => (
                  <Box key={platform.id}>
                      <Button
                        variant="ghost"
                        onClick={()=>router.push(platform.link?platform.link:"/")}
                        className="flex h-auto flex-col items-center gap-2 p-1 hover:bg-transparent cursor-pointer"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            border: "1px solid hsl(var(--border))",
                            color: "hsl(var(--foreground))",
                            transition: "background-color 0.15s ease",
                            "&:hover": { bgcolor: "hsl(var(--secondary))" },
                            "&:active": { transform: "scale(0.95)" },
                          }}
                        >
                          {platform.icon}
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: "11px", color: "hsl(var(--foreground))" }}>
                          {platform.name}
                        </Typography>
                      </Button>
                  </Box>
                )
              )}
              {arrowRight && (
                <IconButton
                  size="small"
                  onClick={() =>
                    setScroll((p) =>
                      Math.min(links.length - 6, p + 1)
                    )
                  }
                  sx={{
                    position: "absolute",
                    right: 4,
                    zIndex: 10,
                    bgcolor: "hsl(var(--background))",
                    boxShadow: 2,
                    "&:hover": { bgcolor: "hsl(var(--secondary))" },
                  }}
                >
                  <ChevronRight className="h-4 w-4 text-foreground" />
                </IconButton>
              )}
            </Stack>
            ):(
              <Box>
                <Input />
                <Button className="w-full">{t("chat")}</Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
  );
}
