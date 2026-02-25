"use client";

import getToken from "@/api/token";
import { usePosts } from "@/app/store/posts/posts";
import PostSkeleton from "@/entities/home/post-actions/post-skeleton/post-skeleton";
import { useEffect, useState } from "react";
import profile from '../../../../app/provider/images/profil-removebg-preview.png'
import Link from "next/link";
import PostAction from "@/entities/home/post-actions/post-actions";
import { useTranslation } from "react-i18next";
import { Recommendation } from "@/entities/home/recommendation/recommendation";
import { API } from "@/shared/utils/config";
import { Button } from "@mui/material";
import { menu } from "@/app/provider/svg/svg";
import InstaSlider from "@/entities/home/images/imageSlider";
import Menu from "@/entities/home/menu/menu";
import { useProfile } from "@/app/store/profile/myProfile/profile";
import { useTheme } from "next-themes";


function page() {
  const {addComment,addFavoritePost,addFollowingRelationship,subscribtions,getSubscribtions,formatShortTime,deleteFollowingRelationship, getPosts,likePosts, loading, posts}=usePosts()
  const [openModal,setOpenModal]=useState<boolean>(false)
  const {t,i18n}=useTranslation()
  const {resolvedTheme}=useTheme()
  const myId=getToken()?.sid

  useEffect(()=>{
    if(!myId) return
    getSubscribtions(myId)
  },[getSubscribtions,myId])

  useEffect(()=>{
    getPosts()
  },[getPosts])

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
                             return <div className="w-[100%] sm:w-[450px] ">
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
                                        <PostAction
                                          commentCount={el.commentCount}
                                          datePublished={el.datePublished}
                                          userName={el.userName}
                                          postId={el.postId}
                                          comments={el.comments}
                                          title={el.title}
                                          content={el.content}
                                          likeCount={el.postLikeCount}
                                          isLiked={el.postLike}
                                          isPostFavorited={el.postFavorite}
                                        />
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
        </>
    )
}

export default page;
