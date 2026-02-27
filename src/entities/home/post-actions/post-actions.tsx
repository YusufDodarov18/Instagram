// 'use client'
// import '../../../app/(router)/(protected)/(home)/page.css'
// import { comment, messageActive } from '@/app/provider/svg/svg'
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { usePosts } from '@/app/store/posts/posts';
// import { useTheme } from 'next-themes';
// import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import { Typography } from '@mui/material';
// import { useState } from 'react';
// import CommentModal from '../comments/comment';
// import { post } from '../../../app/(router)/types';


// function PostAction({postById}: {postById:post}){
//     const {likePosts,addFavoritePost,addComment}=usePosts()
//     const {resolvedTheme}=useTheme()
//     const [openModalComment,setOpenModalComment]=useState<boolean>(false)
//     return (
//         <>
//                 <div className='flex flex-col'>
//                       <div className='flex justify-between px-1 text-lg font-bold'>
//                         {/* *  <div className='flex gap-4 text-black font-bold dark:text-white'>
//                                             <div className='cursor-pointer flex gap-1 items-start'>
//                                                 {isLiked?
//                                                     <FavoriteIcon color='error' onClick={()=>likePosts(postId)}/>:
//                                                     <FavoriteBorderIcon onClick={()=>likePosts(postId)}/>
//                                                 }
//                                                 <Typography>{likeCount}</Typography>
//                                             </div>
//                                             <div className='cursor-pointer flex gap-1 items-start'>
//                                                 <Typography>{comment}</Typography>
//                                                 <Typography>{commentCount}</Typography>
//                                                 <Typography>{messageActive}</Typography>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <Typography onClick={()=>addFavoritePost(postId)}>
//                                                 {isPostFavorited?
//                                                     <BookmarkIcon fontSize="small" />
//                                                 :
//                                             <TurnedInNotIcon fontSize="small" />
//                                                 }
//                                             </Typography>
//                             </div> */}
//                           <div className='flex gap-2 items-center'>
//                                <div className='cursor-pointer'>
//                                    {
//                                        postById.postLike?
//                                            <FavoriteIcon color='error' onClick={()=>likePosts(postId)}/>:
//                                            <FavoriteBorderIcon onClick={()=>likePosts(postId)}/>
//                                    }
//                                </div>
//                                <div>{postById.postLikeCount}</div>
//                                <div className='cursor-pointer' onClick={()=>setOpenModalComment(true)}>{comment}</div>
//                                <div>{postById.commentCount}</div>
//                                <div className='cursor-pointer'>{messageActive}</div>
//                           </div>
//                           <div className='cursor-pointer' onClick={()=>addFavoritePost(postId)}>
//                                {
//                                    postById.postFavorite ?<BookmarkIcon />:<TurnedInNotIcon />
//                                }
//                           </div>
//                      </div>
//                      <div className='px-2 py-3'>
//                         <Typography>{postById.title}</Typography>
//                         <p className='mt-[3px] text-gray-400'>{postById?.content}</p>
//                      </div>
//                 </div>
            
//             <CommentModal 
//                 open={openModalComment} 
//                 handleClose={()=>setOpenModalComment(false)}
//                 likeCount={postById.postLikeCount}
//                 isLiked={postById.postLike}
//                 isPostFavorited={postById.postFavorite}
//                 commentCount={postById.postFavorite}
//                 datePublished={postById.postFavorite}
//                 userName={postById.userName}
//                 postId={postById.postId}
//                 comments={postById.comments}
//                 images={postById.postFavorite}
//                 userId={postById.userId}
//             />
//         </>
//     )
// }

// export default PostAction
