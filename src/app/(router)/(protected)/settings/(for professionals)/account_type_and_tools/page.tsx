"use client"
import {

  MessageCircle,
  AtSign,
  MessageSquare,
  Heart,
  Smartphone,
  Archive,
  Globe,
  Accessibility,
  Users,
  Briefcase,
  Wrench,
  HelpCircle,
  Shield,
  Info,
  ChevronRight,
  Star,
  Ban,
  Eye,
  Bell,
  User,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsNavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface SettingsNavGroup {
  title: string;
  items: SettingsNavItem[];
}

const settingsGroups: SettingsNavGroup[] = [
  {
    title: "Чӣ тавр Instagram-ро истифода мебаред",
    items: [
      { label: "Таҳрири профил", path: "/settings/edit-profile", icon: User },
      { label: "Огоҳиномаҳо", path: "/settings/notifications", icon: Bell },
    ],
  },
  {
    title: "Кӣ контенти шуморо мебинад",
    items: [
      { label: "Махфияти аккаунт", path: "/settings/privacy", icon: Lock },
      { label: "Дӯстони наздик", path: "/settings/close-friends", icon: Star },
      { label: "Блок шудагон", path: "/settings/blocked", icon: Ban },
      { label: "Пинҳон кардани ҳикоя", path: "/settings/hide-story", icon: Eye },
    ],
  },
  {
    title: "Дигарон чӣ тавр бо шумо муошират мекунанд",
    items: [
      { label: "Паёмҳо", path: "/settings/messages", icon: MessageCircle },
      { label: "Тегҳо ва зикрҳо", path: "/settings/tags", icon: AtSign },
      { label: "Шарҳҳо", path: "/settings/comments", icon: MessageSquare },
      { label: "Лайкҳо", path: "/settings/likes", icon: Heart },
    ],
  },
  {
    title: "Барнома ва медиаи шумо",
    items: [
      { label: "Иҷозатҳои дастгоҳ", path: "/settings/device-permissions", icon: Smartphone },
      { label: "Бойгонӣ ва зеркашӣ", path: "/settings/archiving", icon: Archive },
      { label: "Забон", path: "/settings/language", icon: Globe },
      { label: "Дастрасӣ", path: "/settings/accessibility", icon: Accessibility },
    ],
  },
  {
    title: "Барои касбиён",
    items: [
      { label: "Навъи аккаунт ва воситаҳо", path: "/settings/account-type", icon: Briefcase },
      { label: "Воситаҳои эҷодкор", path: "/settings/creator-tools", icon: Wrench },
    ],
  },
  {
    title: "Маълумоти бештар ва дастгирӣ",
    items: [
      { label: "Кумак", path: "/settings/help", icon: HelpCircle },
      { label: "Маркази махфият", path: "/settings/privacy-center", icon: Shield },
      { label: "Дар бораи", path: "/settings/about", icon: Info },
    ],
  },
];

interface SettingsSidebarProps {
  onNavigate?: () => void;
}

export default function SettingsSidebar({ onNavigate }: SettingsSidebarProps) {
  const pathname = usePathname()
  return (
    <nav className="h-full overflow-y-auto pb-8">
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-xl font-semibold text-foreground">Танзимот</h1>
      </div>

      {settingsGroups.map((group) => (
        <div key={group.title} className="mb-2">
          <div className="px-6 py-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {group.title}
            </span>
          </div>
          {group.items.map((item) => (
            <Link
  key={item.path}
  href={item.path}
  onClick={onNavigate}
  className={`flex items-center justify-between px-6 py-3 text-sm transition-colors ${
    pathname === item.path
      ? "bg-accent font-medium text-foreground"
      : "text-foreground hover:bg-ig-hover"
  }`}
>
  <div className="flex items-center gap-3">
    <item.icon className="h-5 w-5 text-muted-foreground" />
    <span>{item.label}</span>
  </div>
  <ChevronRight className="h-4 w-4 text-muted-foreground" />
</Link>
          ))}
        </div>
      ))}


      {/* Meta Accounts Center link */}
      <div className="mx-6 mt-4 p-4 rounded-lg bg-secondary">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Маркази аккаунтҳои Meta</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Танзимоти профили худро, амният, огоҳиномаҳо ва ғайраро идора кунед.
        </p>
      </div>
    </nav>
  );
}

export { settingsGroups };