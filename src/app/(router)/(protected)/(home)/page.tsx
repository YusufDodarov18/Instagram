"use client";


import './page.css'
import getToken from "@/api/token";
import { usePosts } from "@/app/store/posts/posts";
import PostSkeleton from "@/entities/home/post-actions/post-skeleton/post-skeleton";
import { useEffect, useState } from "react";
import profile from '../profile/profil-removebg-preview.png'
import Link from "next/link";
// import PostAction from "@/entities/home/post-actions/post-actions";
import { useTranslation } from "react-i18next";
import { Recommendation } from "@/entities/home/recommendation/recommendation";
import { API } from "@/shared/utils/config";
import { Button, Typography } from "@mui/material";
import InstaSlider from "@/entities/home/slider/imageSlider";
import Menu from "@/entities/home/menu/menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from 'next-themes';
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CommentModal from "@/entities/home/comments/comment";
import { post } from "../../types";
import { comment, menu, messageActive } from '@/app/provider/icons/svg';



function page() {
  const {addComment,addFavoritePost,addFollowingRelationship,subscribtions,getSubscribtions,formatShortTime,deleteFollowingRelationship, getPosts,likePosts, loading, posts}=usePosts()
  const [openModal,setOpenModal]=useState<boolean>(false)
  const [openModalComment,setOpenModalComment]=useState<boolean>(false)
  const [expandedPostId,setExpandedPostId]=useState<number|null>(null)
  const [idx,setIdx]=useState<null|post>(null)
  const {t,i18n}=useTranslation()
  const {resolvedTheme}=useTheme()
  const myId=getToken()?.sid
  let CHARACTER_LIMIT=50

  useEffect(()=>{
    if(!myId) return
    getSubscribtions(myId)
  },[myId])

  useEffect(()=>{
    getPosts()
  },[])

 const truncateText=(text:string,postId:number)=>{
    if(expandedPostId===postId)return text
    if(text.length<=CHARACTER_LIMIT)return text
    return text.slice(0,CHARACTER_LIMIT)+"..."
}
 const handleFollow=async(userId:string)=>await addFollowingRelationship(userId)
  return (
        <>
             <section className="flex justify-between py-0 md:justify-center pb-20 md:py-10">
                  
                  <section className="flex flex-col gap-10 px-5">
                      <header className="flex">
                        {/* stories */}
                      </header>

                      <main className="flex justify-center flex-col gap-4 pr-0 md:pr-6">
                          {posts.length===0||loading?(
                            Array.from({length:5}).map((_,i)=>(
                              <PostSkeleton key={i}/>
                            ))
                          )
                          :posts.map((el)=>{
                              const isFollowing=subscribtions?.includes(el?.userId)
                             return <div className="w-[100%] sm:w-[450px]">
                                  <header className="flex justify-between gap-1">
                                      <div>
                                        <div className="flex gap-2 items-center">
                                           <Link href={`/profile/${el.userId}`}>
                                              <img 
                                               src={el.userImage?
                                               `${API}/images/${el.userImage}`:profile.src} 
                                               alt="profile"
                                               className="w-[40px] h-[40px] rounded-[50%] object-cover"
                                              />
                                           </Link>
                                          <Link href={`/profile/${el.userId}`}><h5 className="font-bold">{el.userName}</h5></Link>
                                          <div className="flex gap-1 items-center">
                                              <p className="text-[20px] text-gray-500 cursor-pointer font-bold">•</p>
                                              <p className="tracking-wider text-[14px] text-[#737373] font-medium">{formatShortTime(el.datePublished)}</p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex gap-2 items-center">
                                         {!isFollowing&&(
                                            <Button onClick={()=>handleFollow(el.userId)} sx={{color:resolvedTheme=="dark"?"#85A1FF":"#3143E3"}}>{t("follow")}</Button>
                                         )}
                                         <p className="cursor-pointer" onClick={()=>setOpenModal(true)}>{menu}</p>
                                      </div>
                                  </header>

                                 <main className="w-full mt-2 relative">
                                    <div className="relative w-full overflow-hidden">
                                      <InstaSlider images={el?.images} />
                                    </div>
                                  </main>

                                  <main className="pt-2">
                                        <div className='flex flex-col'>
                                              <div className='flex justify-between px-1 text-lg font-bold'>
                                                {/* *  <div className='flex gap-4 text-black font-bold dark:text-white'>
                                                                    <div className='cursor-pointer flex gap-1 items-start'>
                                                                        {isLiked?
                                                                            <FavoriteIcon color='error' onClick={()=>likePosts(postId)}/>:
                                                                            <FavoriteBorderIcon onClick={()=>likePosts(postId)}/>
                                                                        }
                                                                        <Typography>{likeCount}</Typography>
                                                                    </div>
                                                                    <div className='cursor-pointer flex gap-1 items-start'>
                                                                        <Typography>{comment}</Typography>
                                                                        <Typography>{commentCount}</Typography>
                                                                        <Typography>{messageActive}</Typography>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <Typography onClick={()=>addFavoritePost(postId)}>
                                                                        {isPostFavorited?
                                                                            <BookmarkIcon fontSize="small" />
                                                                        :
                                                                    <TurnedInNotIcon fontSize="small" />
                                                                        }
                                                                    </Typography>
                                                    </div> */}
                                                  <div className='flex gap-2 items-center'>
                                                       <div className='cursor-pointer'>
                                                           {
                                                               el.postLike?
                                                                   <FavoriteIcon color='error' onClick={()=>likePosts(el.postId)}/>:
                                                                   <FavoriteBorderIcon onClick={()=>likePosts(el.postId)}/>
                                                           }
                                                       </div>
                                                       <div>{el.postLikeCount}</div>
                                                       <div className='cursor-pointer' onClick={()=>{setOpenModalComment(true),setIdx(el)}}>{comment}</div>
                                                       <div>{el.commentCount}</div>
                                                       <div className='cursor-pointer'>{messageActive}</div>
                                                  </div>
                                                  <div className='cursor-pointer' onClick={()=>addFavoritePost(el.postId)}>
                                                       {
                                                           el.postFavorite ?<BookmarkIcon />:<TurnedInNotIcon />
                                                       }
                                                  </div>
                                             </div>
                                             <div className='px-2 py-3'>
                                                <Typography>{el?.title}</Typography>
                                                <p className='mt-[3px] text-gray-400 break-words whitespace-pre-wrap'>{truncateText(el?.content||"",el.postId)}</p>
                                                    {el?.content?.length>CHARACTER_LIMIT&&(
                                                      <button
                                                        onClick={()=>
                                                          setExpandedPostId(
                                                            expandedPostId===el.postId?null:el.postId
                                                          )
                                                        } 
                                                        className="text-[#737373] text-sm font-medium ml-1 cursor-pointer hover:underline"
                                                      >
                                                        {expandedPostId===el.postId ? t("less") : t("layout.more")}
                                                      </button>
                                                    )}
                                             </div>
                                        </div>
                                  </main>
                              </div>
                        })}
                      </main>
                  </section>

                  <aside className="pr-5 hidden md:block">
                    <Recommendation/>
                  </aside>
             </section>
             
            <Menu open={ openModal} onClose={()=>setOpenModal(false)} />
            <CommentModal open={openModalComment} handleClose={()=>setOpenModalComment(false)} post={idx}/>
        </>
    )
}

export default page;
