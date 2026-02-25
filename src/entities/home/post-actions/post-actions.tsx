'use client'
import '../../../app/(router)/(protected)/(home)/page.css'
import { comments } from '@/app/(router)/types'
import { comment, messageActive } from '@/app/provider/svg/svg'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { usePosts } from '@/app/store/posts/posts';
import { useTheme } from 'next-themes';
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Typography } from '@mui/material';


function PostAction({userName,commentCount,isPostFavorited,comments,title,content,datePublished,postId,isLiked,likeCount}:{userName:string,content?:string,commentCount:number,postId:number,comments:comments,datePublished:string,isLiked:boolean,likeCount:number,isPostFavorited:boolean,title?:string}){
    const {likePosts,addFavoritePost,addComment}=usePosts()
    const {resolvedTheme}=useTheme()
    return (
        <div className='flex flex-col'>
              <div className='flex justify-between px-1 text-lg font-bold'>
                  <div className='flex gap-2 items-center'>
                       <div className='cursor-pointer'>
                           {
                               isLiked?
                                   <FavoriteIcon color='error' onClick={()=>likePosts(postId)}/>:
                                   <FavoriteBorderIcon onClick={()=>likePosts(postId)}/>
                           }
                       </div>
                       <div>{likeCount}</div>
                       <div className='cursor-pointer'>{comment}</div>
                       <div>{commentCount}</div>
                       <div className='cursor-pointer'>{messageActive}</div>
                  </div>
                  <div className='cursor-pointer' onClick={()=>addFavoritePost(postId)}>
                       {
                           isPostFavorited ?<BookmarkIcon />:<TurnedInNotIcon />
                       }
                  </div>
             </div>
             <div className='px-2 py-3'>
                <Typography>{title}</Typography>
                <p className='mt-[3px] text-gray-400'>{content}</p>
             </div>
        </div>
    )
}

export default PostAction
/**
 *  <div className='flex gap-4 text-black font-bold dark:text-white'>
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
                </div>
 */