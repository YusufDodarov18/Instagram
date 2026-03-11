import { Skeleton } from "@mui/material"
import { useTheme } from "next-themes"

const PostSkeleton = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const bg = isDark ? "#2c2c2c" : "#e0e0e0"
  const highlight = isDark ? "#3c3c3c" : "#f5f5f5"
    return (
        <div className="w-[100%] sm:w-[450px]">
            <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2 items-center">
                  <Skeleton variant="circular" width={40} height={40} sx={{bgcolor:bg, backgroundImage:highlight}} />
                  <div>
                    <Skeleton variant="text" width={100} height={20} sx={{bgcolor:bg, backgroundImage:highlight}} />
                    <Skeleton variant="text" width={70} height={15} sx={{bgcolor:bg, backgroundImage:highlight}} />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Skeleton variant="rounded" width={70} height={30} sx={{bgcolor:bg, backgroundImage:highlight}} />
                  <Skeleton variant="circular" width={20} height={20} sx={{bgcolor:bg, backgroundImage:highlight}} />
                </div>
            </div>
            <Skeleton variant="rectangular" width="100%" height={450} sx={{borderRadius:"8px", mt:1, bgcolor:bg, backgroundImage:highlight}} />
              <div className="flex justify-between mt-3">
                  <div className="flex gap-3">
                    <Skeleton variant="circular" width={24} height={24} sx={{bgcolor:bg, backgroundImage:highlight}} />
                    <Skeleton variant="circular" width={24} height={24} sx={{bgcolor:bg, backgroundImage:highlight}} />
                    <Skeleton variant="circular" width={24} height={24} sx={{bgcolor:bg, backgroundImage:highlight}} />
                  </div>
             <Skeleton variant="circular" width={24} height={24} sx={{bgcolor:bg, backgroundImage:highlight}} />
              </div>
        </div>
    )
}

export default PostSkeleton