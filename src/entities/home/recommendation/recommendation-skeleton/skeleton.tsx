import { Skeleton } from "@mui/material"
import { useTheme } from "next-themes";
export default function RecommendationSkeleton(){
   const { resolvedTheme } = useTheme();
   const skeletonColor = resolvedTheme === "dark" ? "#374151" : "#e5e7eb";
   const skeletonHighlight = resolvedTheme === "dark" ? "#4b5563" : "#f3f4f6"; 
    
   return (
        <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                    <Skeleton variant="circular" width={40} height={38} sx={{ bgcolor: skeletonColor, animation: "pulse 1.5s infinite", "&::after": { bgcolor: skeletonHighlight } }} />
                    <div className="flex flex-col gap-1">
                        <Skeleton variant="text" width={100} height={16} sx={{ bgcolor: skeletonColor, "&::after": { bgcolor: skeletonHighlight } }}/>
                        <Skeleton variant="text" width={80} height={14}  sx={{ bgcolor: skeletonColor, "&::after": { bgcolor: skeletonHighlight } }}/>
                    </div>
              </div>
            <Skeleton variant="rectangular" width={60} height={24}         sx={{ bgcolor: skeletonColor, "&::after": { bgcolor: skeletonHighlight } }}/>
        </div>
    )
}