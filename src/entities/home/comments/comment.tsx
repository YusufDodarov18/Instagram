// "use client"

// import React, { useState } from 'react'
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuTrigger,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuItem,
//     DropdownMenuGroup,
// } from "@/shared/ui/dropdown-menu"
// import { axiosRequest } from '@/shared/utils/axiosRequest'

// const emojiCategories = {
//     "Популярные": ["😂", "🤣", "😍", "😘", "🥰", "😊", "❤️", "🔥", "💯", "👏", "🎉", "😢", "😮", "🤩", "😎", "🙌"],
//     "Эмоции и люди": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😍", "😘", "😗", "😙", "😚", "🤗"],
//     "Животные и природа": ["🐶", "🐱", "🦁", "🐯", "🦊", "🐻", "🐼", "🐨", "🦄", "🐴", "🐸", "🐰", "🦓", "🦒", "🦔", "🦢", "🦩", "🐍", "🐢", "🐙"],
//     "Еда и напитки": ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🥕", "🌽", "🥒"],
//     "Активность": ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥊", "🥋", "🎽", "🏋️‍♂️", "🤼‍♀️", "🤸‍♂️", "⛹️‍♂️", "🤺", "⛷️"],
//     "Предметы": ["⌚", "📱", "💻", "🖥️", "🖨️", "🖱️", "💡", "🔦", "📡", "📞", "📟", "📠", "📺", "📻", "🎙️", "📷", "📹", "🎥", "📽️", "🎞️"]
// };

// const Comment = ({ setModal, postId, commentCount }) => {
//     const [commentCounter, setCommentCounter] = useState(commentCount);
//     const [commentValue, setCommentValue] = useState("");

//     const sendSmile = (emoji) => {
//         setCommentValue((prev) => prev + emoji);
//     };

//     const postComment = async (event) => {
//         event.preventDefault();
//         try {
//             await axiosRequest.post("/Post/add-comment", {
//                 comment: commentValue,
//                 postId: postId,
//             });
//             setCommentValue("");
//             setCommentCounter((prev) => prev + 1);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <p onClick={() => setModal(true)} className='text-gray-400 text-[16px] font-semibold'>
//                 View all comments ({commentCounter})
//             </p>
//             <form onSubmit={postComment}>
//                 <div className="w-[470px] h-[50px] flex justify-between p-[5px]">
//                     <input
//                         className='outline-none p-[10px_0px] w-[400px] h-[35px]'
//                         value={commentValue}
//                         onChange={(e) => setCommentValue(e.target.value)}
//                         placeholder='Add a comment...'
//                         type="text"
//                     />
//                     <button type='submit' className='flex items-center gap-[5px]'>
//                         <p className='text-blue-600 font-semibold'>{commentValue.length > 0 ? "Send" : ""}</p>
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <span className="cursor-pointer text-lg">😊</span>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent className="w-auto p-2 overflow-y-scroll ">
//                                 {Object.entries(emojiCategories).map(([category, emojis]) => (
//                                     <div key={category} className="mb-2 ">
//                                         <DropdownMenuLabel className="font-semibold text-gray-700">{category}</DropdownMenuLabel>
//                                         <div className="grid grid-cols-6 gap-2 p-2">
//                                             {emojis.map((emoji) => (
//                                                 <span
//                                                     key={emoji}
//                                                     className="text-2xl cursor-pointer w-[40px] h-[40px] flex items-center justify-center hover:bg-gray-200 rounded-lg"
//                                                     onClick={() => sendSmile(emoji)}
//                                                 >
//                                                     {emoji}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                         <DropdownMenuSeparator />
//                                     </div>
//                                 ))}
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Comment;
'use client'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {  Heart, Volume2, VolumeOff } from "lucide-react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from '@mui/material';
import React, {  useRef, useState } from 'react';
import { API } from "@/shared/utils/config";
import profile from '../../../app/(router)/(protected)/profile/profil-removebg-preview.png'
import { post } from "@/app/(router)/types";
import { useTheme } from "next-themes";
import { t } from "i18next";
import { formatDate } from "./script";
import { comment, menu, messageActive, stiker } from "@/app/provider/svg/svg";
import i18n from "@/i18n";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { usePosts } from "@/app/store/posts/posts";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EmojiPicker from "emoji-picker-react";
import getToken from "@/api/token";

const CommentModal = ({open,handleClose,post}:{open:boolean,handleClose:()=>void,post:post|null}) => {
    const isMobile=useMediaQuery("(min-width:648px)")
    const {addComment,deleteComment,addFavoritePost,posts,addFollowingRelationship,subscribtions,getSubscribtions,deleteFollowingRelationship,likePosts}=usePosts()
    const {resolvedTheme}=useTheme()
    const [textComment,setTextComment]=useState<string>("")
    const [showEmojies,setShowEmojies]=useState<boolean>(false)
    const [isMuted,setIsMuted]=useState<boolean>(true)
    const [menuComment,setMenuComment]=useState<boolean>(false)
    const [idx,setIdx]=useState<null|string>(null)
    const viderRef=useRef<HTMLVideoElement |null>(null)
    const myId=getToken()?.sid

    if (!post) return null;
    const currentPost = posts.find(p => p.postId === post?.postId);
    if (!currentPost) return null;

// console.log(post)

const sendComment= async ()=>{
    if(textComment.trim()=="") return
    let comment={
        commentText:textComment,
        postId:currentPost.postId
    }
    try {
        await addComment(comment)
        setTextComment("")
    } catch (err) {
      console.log("Ошибка:", err);
    }
}

const toggleVolume=()=>{
    if(viderRef.current){
        viderRef.current.muted=!isMuted
        setIsMuted(!isMuted)
    }
}

    const isVideo=(url:string)=>url.match(/\.(mp4|webm|ogg)$/i)
     return (
        <>
                 <Dialog
                      open={open && isMobile}
                      onClose={handleClose}
                      PaperProps={{
                        sx: {
                          width: "100%",
                          height: "100%",
                          maxWidth: "1000px",
                          m: 0,
                          p: 0,
                        },
                      }}
                    >
                               <DialogContent
                                      sx={{
                                        p: 0,
                                        display: "flex",
                                        position: "relative",
                                        overflow: "hidden",
                                        bgcolor:resolvedTheme=="dark"?"#212328":'',
                                        color:resolvedTheme=="dark"?'white':''
                                      }}
                                 >
                                  
                                        <div className="relative w-[55%] h-[100%]">
                                             {currentPost?.images?.[0]&&(
                                                    isVideo(currentPost.images[0])?(
                                                        <video
                                                            ref={viderRef} 
                                                            src={`${API}/images/${currentPost.images[0]}`}
                                                            autoPlay
                                                            loop
                                                            muted={isMuted}
                                                            className="w-full h-full object-cover"
                                                         />
                                                    ):(
                                                         <img 
                                                            src={`${API}/images/${currentPost?.images?.[0]}`}
                                                            alt="postImage"
                                                            className="w-[100%] h-[100%] object-center "
                                                        />
                                                    )
                                             )}

                                            <div className="absolute bottom-4 right-4 w-[30px] h-[30px] rounded-full bg-[#212328] flex items-center justify-center">
                                                {isMuted?
                                                    <VolumeOff onClick={toggleVolume} className="text-white  w-[17px] h-[17px] cursor-pointer" />:
                                                    <Volume2 onClick={toggleVolume} className="text-white  w-[17px] h-[17px] cursor-pointer"/>
                                                }
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col overflow-hidden">
                                             <header className="shrink-0 z-10 flex justify-between items-center border-b-1 px-5 py-3">
                                                   <div className="flex gap-2 items-center">
                                                         <Link href={`/profile/${currentPost?.userId}`} className="flex gap-2 items-center">
                                                                <img
                                                                  src={
                                                                    currentPost?.userImage?`${API}/images/${currentPost.userImage}`:profile.src
                                                                  }
                                                                  alt="profile"
                                                                  className="w-[38px] h-[38px] rounded-[50%] object-cover"
                                                                />
                                                                <h5 className="font-bold">{currentPost?.userName}</h5>
                                                        </Link>
                                                        <p>•</p>
                                                        <button className="text-[#3143E3] cursor-pointer duration-200">{t("follow")}</button>
                                                    </div>
                                                    <div className="cursor-pointer">
                                                       <svg aria-label="Дополнительно" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                         <title>Дополнительно</title>
                                                         <circle cx="12" cy="12" r="1.5"></circle>
                                                         <circle cx="6" cy="12" r="1.5"></circle>
                                                         <circle cx="18" cy="12" r="1.5"></circle>
                                                       </svg>
                                                    </div>
                                                </header>  

                                            <main className="flex-1 overflow-y-auto pt-7">
                                                <div className="flex flex-col gap-6 px-5 overflow-x-hidden pb-2">
                                                    {currentPost?.comments?.length>0?(
                                                        currentPost?.comments.map((comment)=>{
                                                            const isMyComment=String(comment.userId) === String(myId)
                                                            // console.log(comment)
                                                            return <div className="flex justify-between items-start pr-2">
                                                                         <div className="flex-1">
                                                                               <div className="flex gap-2">
                                                                                   <Link href={`/profile/${comment?.userId}`} className="flex-shrink-0">
                                                                                       <img
                                                                                         src={comment?.userImage?
                                                                                           `${API}/images/${comment.userImage}`:profile.src
                                                                                         }
                                                                                         alt="profile"
                                                                                         className="w-[37px] h-[37px] rounded-[50%] object-cover"
                                                                                       />
                                                                                    </Link>
                                                                                   <div className="flex-1 min-w-0">
                                                                                     <div className={`text-gray-800 dark:text-white ${isMyComment?'flex gap-2':""}`}>
                                                                                       <Link href={`/profile/${comment.userId}`}><span className="font-bold text-black dark:text-white mr-2">{comment.userName}</span></Link>
                                                                                       <span className="break-words">
                                                                                          {comment?.comment}
                                                                                          </span>
                                                                                          {isMyComment&&(
                                                                                              <span onClick={()=>{setMenuComment(true),setIdx(comment.postCommentId.toString())}}>{menu}</span>
                                                                                          )}
                                                                                     </div>
                                                                                     <div className="flex mt-1 text-gray-600 gap-3">
                                                                                       <p>{formatDate(comment.dateCommented,t)}</p>
                                                                                       <p className="cursor-pointer hover:text-gray-800">
                                                                                         "{t("like")}": {post.postLikeCount}
                                                                                       </p>
                                                                                       <p className="cursor-pointer hover:text-gray-800">
                                                                                         {t("answer")}
                                                                                       </p>
                                                                                     </div>
                                                                                   </div>
                                                                               </div>
                                                                             </div>
                                                                             <div className="flex-shrink-0 ml-2">
                                                                               <Heart className="cursor-pointer w-[18px] hover:opacity-70" />
                                                                             </div>
                                                                      </div>
                                                        })):(
                                                          <div className="flex flex-col justify-center items-center text-center text-gray-500">
                                                                <h3 className="text-2xl text-black dark:text-white font-semibold">{t("No comments yet.")}</h3>
                                                                <p className="text-sm mt-1">{t("Start the conversation.")}</p>
                                                          </div>
                                                    )}
                                                </div>
                                             </main>

                                                  <footer className="shrink-0 border-t-1 pt-1.5 flex flex-col gap-2">
                                                         <div className="flex justify-between px-5">
                                                                <div className="flex gap-2">
                                                                   <div>
                                                                        <div className='cursor-pointer' style={{ transform: 'scale(1.2)',marginTop:"-2px"}}>
                                                                           {currentPost?.postLike?
                                                                              <FavoriteIcon color='error' onClick={()=>likePosts(currentPost?.postId)}/>:
                                                                              <FavoriteBorderIcon onClick={()=>likePosts(currentPost?.postId)}/>
                                                                           }
                                                                        </div>
                                                                    </div>
                                                                    <div className='cursor-pointer'>{comment}</div>
                                                                    <div className='cursor-pointer'>{messageActive}</div>
                                                                </div>
                                                                <div className='cursor-pointer' onClick={()=>addFavoritePost(currentPost?.postId)}>
                                                                    {currentPost?.postFavorite ?<BookmarkIcon />:<TurnedInNotIcon />}
                                                                </div>
                                                         </div>    
                                                         <div className="px-5">
                                                               <Typography variant="body1">{currentPost?.postLikeCount} <span className="font-bold">{t("likes")}</span></Typography>
                                                               <p className="text-gray-500 text-sm">
                                                                   {currentPost?.datePublished
                                                                     ? new Intl.DateTimeFormat(i18n.language, { day: "numeric", month: "long" }).format(new Date(post.datePublished)): ""}
                                                               </p>
                                                         </div>
                                                         <div className="border-t-2 flex justify-between py-3 px-4">
                                                                <div className="flex gap-3">
                                                                   <p className='cursor-pointer' onClick={()=>setShowEmojies(true)}>{stiker}</p>
                                                                    <input
                                                                       type="text"
                                                                       className="outline-0"
                                                                       placeholder={t("Add a comment...")}
                                                                       value={textComment}
                                                                       onChange={e=>setTextComment(e.target.value)}
                                                                       onKeyDown={e=>{
                                                                          if(e.key=="Enter"&&textComment.trim()!==""){
                                                                            sendComment()
                                                                          }
                                                                       }}
                                                                   />
                                                                </div>
                                                                <button 
                                                                       className="cursor-pointer disabled:cursor-default disabled:text-gray-300" 
                                                                       disabled={textComment.length===0}
                                                                       onClick={sendComment}
                                                                   >
                                                                       {t("Post")}
                                                                </button>
                                                                 {showEmojies && (
                                                                    <div className="absolute bottom-10 right-2 z-50">
                                                                         <EmojiPicker onEmojiClick={(emojiData)=>{
                                                                            setTextComment((prev)=>prev+emojiData.emoji)
                                                                            setShowEmojies(false)
                                                                         }}/>
                                                                    </div>
                                                                )}
                                                         </div>
                                                  </footer>
                                        </div>
                                </DialogContent>
                    </Dialog>

                              <Dialog open={menuComment} onClose={()=>setMenuComment(false)}
                                        PaperProps={{
                                            sx:{m:0,p:0,width:"500px",
                                              maxWidth:"460px",
                                              bgcolor:resolvedTheme=="dark"?"#1f1e1e":"white",borderRadius:2,
                                            }
                                        }}            
                                          >
                                            <DialogContent sx={{}}>
                                                   
                                                    <div className="flex flex-col justify-center text-center gap-2">
                                                          <p className="text-red-500 font-bold cursor-pointer border-b-1 pb-2" onClick={async()=>
                                                          {
                                                              if(!idx) return
                                                              try {
                                                                await deleteComment(idx)
                                                                setIdx(null)
                                                                setMenuComment(false)
                                                              }catch (err){
                                                                console.error("Ошибка на удаление коментарии:",err)
                                                              }
                                                          }
                                                          }>{t("delete")}</p>
                                                          <p className="cursor-pointer pt-2 text-black dark:text-white" onClick={()=>{setIdx(null),setMenuComment(false)}}>{t("cancel")}</p>
                                                    </div>

                                            </DialogContent>
                              </Dialog>                      
        </>
    );
}

export default CommentModal;

