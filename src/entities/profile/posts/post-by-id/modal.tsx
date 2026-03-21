// import { useProfileById } from "@/app/store/pages/profile/profile-by-id/profile-by-id";
// import { API } from "@/shared/utils/config";
// import { Avatar, Box, Modal, Typography } from "@mui/material";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import React, { useEffect } from "react";
// import profile from "../../../../../app/(router)/(protected)/profile/profil-removebg-preview.png";

// const ModalPostById = ({
//   onClose,
//   postId,
// }: {
//   open: boolean;
//   onClose: () => void;
//   postId: number | null;
// }) => {
//   const { posts } = useProfileById();
//   const { info, getInfoById } = useProfileById();
//   const post = posts.find((post) => post.postId === postId);
//   if (!post) return;
//   const file = post?.images?.[0];
//   const src = file ? `${API}/images/${file}` : "";
//   const isVideo = file?.endsWith(".mp4");
//     const { theme } = useTheme();
    
// //   useEffect(() => {
// //       if (post.userId) {
// //         getInfoById(post?.userId);
// //     }
// //   }, [post]);
    
//   return (
//     <Modal
//       sx={{ color: theme === "dark" ? "#fff" : "#121212" }}
//       open={!!postId}
//       onClose={onClose}
//       aria-labelledby="post-modal"
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           maxWidth: 1200,
//           width: "90vw",
//           height: "90vh",
//           borderRadius: 2,
//           boxShadow: 2,
//           display: "flex",
//           overflow: "hidden",
//           bgcolor: theme === "dark" ? "#212328" : "white",
//         }}
//       >
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             backgroundColor: "#000",
//           }}
//         >
//           {isVideo ? (
//             <video
//               src={src}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <img src={src} alt="image" className="w-full h-full object-cover" />
//           )}
//         </Box>
//         <Box
//           sx={{
//             width: 400,
//             display: "flex",
//             flexDirection: "column",
//             bgcolor: theme === "dark" ? "#121212" : "#fff",
//           }}
//         >
//           <Box
//             sx={{
//               p: 2,
//               borderBottom:
//                 "1px solid " + (theme === "dark" ? "#2c2a2a" : "#dbdada"),
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               bgcolor: theme === "dark" ? "#121212" : "#fff",
//               color: theme === "dark" ? "white" : "#121212",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Link href={`/profile/${post.userId}`}>
//                 <Avatar
//                   src={
//                     post.userImage
//                       ? `${API}/images/${post.userImage}`
//                       : profile.src
//                   }
//                   sx={{ width: 32, height: 32 }}
//                 />
//               </Link>
//               <Box>
//                 <Link href={`/profile/${post.userId}`}>
//                   <Typography variant="body2" fontWeight="bold">
//                     {post?.userName}
//                   </Typography>
//                 </Link>
//                 <Typography variant="caption">
//                   {info?.firstName + " " + info?.lastName}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ModalPostById;
