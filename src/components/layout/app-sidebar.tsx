'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { 
    LayoutDashboard, 
    History, 
    User, 
    LogOut,
    Bot,
    Users
} from "lucide-react";
import { 
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setUserType(user);
    }, [pathname]);

    const menuItems = [
        { href: '/dashboard', label: 'Workspace', icon: LayoutDashboard },
        ...(userType === 'authenticated' ? [{ href: '/history', label: 'Quiz History', icon: History }] : []),
    ];

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/auth/login');
    }

    const isGuest = userType === 'guest';

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Bot className="w-8 h-8 text-sidebar-primary" />
                    <h1 className="text-xl font-bold font-headline text-sidebar-primary-foreground">
                        QuizCraft AI
                    </h1>
                    <SidebarTrigger className="ml-auto" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton 
                                asChild
                                isActive={pathname === item.href}
                                tooltip={{children: item.label}}
                            >
                                <Link href={item.href}>
                                    <item.icon/>
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="flex flex-col gap-3">
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            asChild
                            isActive={pathname === '/profile'}
                            tooltip={{children: isGuest ? "Guest Profile" : "Profile"}}
                        >
                            <Link href="/profile" className="w-full">
                                { isGuest ? (
                                    <Users className="w-6 h-6" />
                                ) : (
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" data-ai-hint="person portrait" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                )}
                                <span>{ isGuest ? "Guest" : "Profile" }</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={handleLogout}>
                    <LogOut /> <span>{isGuest ? 'Exit' : 'Logout'}</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
