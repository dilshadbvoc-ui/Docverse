"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutAdmin } from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { getInitials } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads & CRM", icon: Users },
  { href: "/dashboard/universities", label: "Universities", icon: Building2 },
  { href: "/dashboard/services", label: "Services", icon: Briefcase },
  { href: "/dashboard/mentors", label: "Mentors", icon: GraduationCap },
  { href: "/dashboard/content", label: "Content & SEO", icon: BookOpen },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
];

export function AdminSidebar({ user }: { user: { name: string; email: string; role: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} bg-navy-950 text-white flex flex-col transition-all duration-300 shrink-0`}>
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold font-heading">DocVerse</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-white hover:bg-white/10">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === item.href
                ? "bg-white/10 text-white"
                : "text-navy-300 hover:text-white hover:bg-white/5"
            }`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-brand-blue text-white text-xs">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-navy-300 truncate">{user.role}</div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className={`w-full text-navy-300 hover:text-white hover:bg-white/10 ${collapsed ? "px-2" : "justify-start gap-3 px-3"}`}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
