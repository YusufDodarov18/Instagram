"use client";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useTheme } from "next-themes";

export default function ProfileSkeleton() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
        <div className="flex justify-center items-center flex-col">
                <div className="w-full max-w-[650px] p-6 flex flex-col gap-5">
                    <div className="flex gap-3 md:gap-8 items-center md:items-start">
                         <Skeleton variant="circular" width={144} height={144} className="hidden sm:block" sx={{ bgcolor: isDark ? "#333" : undefined }}/>
                         <div className="flex-1">
                             <Stack spacing={1}>
                                    <Skeleton variant="text" width={220} height={32} sx={{ bgcolor: isDark ? "#333" : undefined }} />
                                    <Skeleton variant="text" width={180} height={24} sx={{ bgcolor: isDark ? "#333" : undefined }} />

                                     <div className="flex gap-6 mt-2">
                                            <Skeleton variant="text" width={60} sx={{ bgcolor: isDark ? "#333" : undefined }} />
                                            <Skeleton variant="text" width={80} sx={{ bgcolor: isDark ? "#333" : undefined }} />
                                            <Skeleton variant="text" width={90} sx={{ bgcolor: isDark ? "#333" : undefined }} />
                                     </div>

                                    <Skeleton variant="rectangular" width="100%" height={16} className="mt-2 hidden sm:block" sx={{ bgcolor: isDark ? "#333" : undefined }} />
                                    <Skeleton variant="rectangular" width="80%" height={16} className="hidden sm:block" sx={{ bgcolor: isDark ? "#333" : undefined }} />
                             </Stack>
                        </div>
                    </div>

                        <div className="block sm:hidden">
                            <Skeleton variant="rectangular" width="100%" height={16} sx={{ bgcolor: isDark ? "#333" : undefined }} />
                            <Skeleton variant="rectangular" width="80%" height={16} className="mt-2" sx={{ bgcolor: isDark ? "#333" : undefined }} />
                         </div>

                         <div className="flex gap-4 mt-2">
                                <Skeleton variant="rectangular" height={36} className="flex-1 rounded-md" sx={{ bgcolor: isDark ? "#333" : undefined }} />
                                <Skeleton variant="rectangular" height={36} className="flex-1 rounded-md" sx={{ bgcolor: isDark ? "#333" : undefined }} />
                          </div>
                </div>
         </div>
  );
};