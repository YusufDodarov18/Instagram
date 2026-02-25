"use client";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ProfileSkeleton() {
  return (
        <div className="flex justify-center items-center flex-col">
                <div className="w-full max-w-[650px] p-6 flex flex-col gap-5">
                    <div className="flex gap-3 md:gap-8 items-center md:items-start">
                         <Skeleton variant="circular" width={144} height={144} className="hidden sm:block"/>
                         <Skeleton variant="circular" width={56} height={56} className="block sm:hidden"/>
                         <div className="flex-1">
                             <Stack spacing={1}>
                                    <Skeleton variant="text" width={220} height={32} />
                                    <Skeleton variant="text" width={180} height={24} />

                                     <div className="flex gap-6 mt-2">
                                            <Skeleton variant="text" width={60} />
                                            <Skeleton variant="text" width={80} />
                                            <Skeleton variant="text" width={90} />
                                     </div>

                                    <Skeleton variant="rectangular" width="100%" height={16} className="mt-2 hidden sm:block"/>
                                    <Skeleton variant="rectangular" width="80%" height={16} className="hidden sm:block"/>
                             </Stack>
                        </div>
                    </div>

                        <div className="block sm:hidden">
                            <Skeleton variant="rectangular" width="100%" height={16} />
                            <Skeleton variant="rectangular" width="80%" height={16} className="mt-2"/>
                         </div>

                         <div className="flex gap-4 mt-2">
                                <Skeleton variant="rectangular" height={36} className="flex-1 rounded-md"/>
                                <Skeleton variant="rectangular" height={36} className="flex-1 rounded-md"/>
                          </div>
                </div>
         </div>
         
  );
};

