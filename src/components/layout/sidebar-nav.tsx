"use client";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileCode,
  Home,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/vendors", icon: Users, label: "Vendors" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <FileCode className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">VendorVision</h2>
        </div>
      </SidebarHeader>

      <div className="flex-1 overflow-y-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "https://trent-maindash.vercel.app/"}
              tooltip="Home"
            >
              <Link href="https://trent-maindash.vercel.app/">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </>
  );
}
