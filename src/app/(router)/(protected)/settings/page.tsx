// "use client"
// import {
//   MessageCircle,
//   AtSign,
//   MessageSquare,
//   Heart,
//   Smartphone,
//   Archive,
//   Globe,
//   Accessibility,
//   Users,
//   Briefcase,
//   Wrench,
//   HelpCircle,
//   Shield,
//   Info,
//   ChevronRight,
//   ChevronLeft,
//   Star,
//   Ban,
//   Eye,
//   Bell,
//   User,
//   Lock,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface SettingsNavItem {
//   label: string;
//   path: string;
//   icon: React.ElementType;
// }

// interface SettingsNavGroup {
//   title: string;
//   items: SettingsNavItem[];
// }

// const settingsGroups: SettingsNavGroup[] = [
//   {
//     title: "Как вы используете Instagram",
//     items: [
//       { label: "Редактировать профиль", path: "/settings/edit-profile", icon: User },
//       { label: "Уведомления", path: "/settings/notifications", icon: Bell },
//     ],
//   },
//   {
//     title: "Кто может видеть ваш контент",
//     items: [
//       { label: "Конфиденциальность аккаунта", path: "/settings/privacy", icon: Lock },
//       { label: "Близкие друзья", path: "/settings/close-friends", icon: Star },
//       { label: "Заблокированные", path: "/settings/blocked", icon: Ban },
//       { label: "Скрыть историю", path: "/settings/hide-story", icon: Eye },
//     ],
//   },
//   {
//     title: "Как другие могут взаимодействовать с вами",
//     items: [
//       { label: "Сообщения", path: "/settings/messages", icon: MessageCircle },
//       { label: "Теги и упоминания", path: "/settings/tags", icon: AtSign },
//       { label: "Комментарии", path: "/settings/comments", icon: MessageSquare },
//       { label: "Лайки", path: "/settings/likes", icon: Heart },
//     ],
//   },
//   {
//     title: "Ваше приложение и медиа",
//     items: [
//       { label: "Разрешения устройства", path: "/settings/device-permissions", icon: Smartphone },
//       { label: "Архив и загрузки", path: "/settings/archiving", icon: Archive },
//       { label: "Язык", path: "/settings/language", icon: Globe },
//       { label: "Доступность", path: "/settings/accessibility", icon: Accessibility },
//     ],
//   },
//   {
//     title: "Для профессионалов",
//     items: [
//       { label: "Тип аккаунта и инструменты", path: "/settings/account-type", icon: Briefcase },
//       { label: "Инструменты создателя", path: "/settings/creator-tools", icon: Wrench },
//     ],
//   },
//   {
//     title: "Дополнительная информация и поддержка",
//     items: [
//       { label: "Помощь", path: "/settings/help", icon: HelpCircle },
//       { label: "Центр конфиденциальности", path: "/settings/privacy-center", icon: Shield },
//       { label: "О приложении", path: "/settings/about", icon: Info },
//     ],
//   },
// ];

// interface SettingsSidebarProps {
//   onNavigate?: () => void;
// }

// export default function SettingsSidebar({ onNavigate }: SettingsSidebarProps) {
//   const pathname = usePathname()
//   return (
//     <nav className="h-full overflow-y-auto pb-8">
//       <div className="px-6 pt-6 pb-4">
//         <h1 className="text-xl font-semibold text-foreground">Танзимот</h1>
//       </div>

//       {settingsGroups.map((group) => (
//         <div key={group.title} className="mb-2">
//           <div className="px-6 py-2">
//             <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
//               {group.title}
//             </span>
//           </div>
//           {group.items.map((item) => (
//             <Link
//   key={item.path}
//   href={item.path}
//   onClick={onNavigate}
//   className={`flex items-center justify-between px-6 py-3 text-sm transition-colors ${
//     pathname === item.path
//       ? "bg-accent font-medium text-foreground"
//       : "text-foreground hover:bg-ig-hover"
//   }`}
// >
//   <div className="flex items-center gap-3">
//     <item.icon className="h-5 w-5 text-muted-foreground" />
//     <span>{item.label}</span>
//   </div>
//   <ChevronRight className="h-4 w-4 text-muted-foreground" />
// </Link>
//           ))}
//         </div>
//       ))}

//       {/* Meta Accounts Center link */}
//      // <div className="mx-6 mt-4 p-4 rounded-lg bg-secondary">
//        <div className="flex items-center gap-2 mb-2">
//          <Users className="h-5 w-5 text-muted-foreground" />
//          <span className="text-sm font-medium">Центр аккаунтов Meta</span>
//        </div>
//        <p className="text-xs text-muted-foreground leading-relaxed">
//          Управляйте настройками своего профиля, безопасностью, уведомлениями и многим другим.
//        </p>
//      </div>
//     </nav>
//   );
// }
// export { settingsGroups };

"use client"


import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/shared/hooks/use-mobile'




export default function Page(){
    const router=useRouter()
    const isMobile=useIsMobile()
    const [hydrated,setHydrated]=useState(false)

    useEffect(()=> {
        setHydrated(true)
    },[])

    useEffect(()=>{
        if(hydrated&&!isMobile){
            router.replace("/settings/accounts/edit")
        }
    },[hydrated,router,isMobile])

    if(!hydrated) return null

    return null
}






