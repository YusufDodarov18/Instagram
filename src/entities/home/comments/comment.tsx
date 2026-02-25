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
