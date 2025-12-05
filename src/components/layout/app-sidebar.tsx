'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    History, 
    User, 
    LogOut,
    BrainCircuit
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

const menuItems = [
    { href: '/dashboard', label: 'Workspace', icon: LayoutDashboard },
    { href: '/history', label: 'Quiz History', icon: History },
];

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Simulate logout and redirect to login page
        router.push('/auth/login');
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <BrainCircuit className="w-8 h-8 text-sidebar-primary" />
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
                            tooltip={{children: "Profile"}}
                        >
                            <Link href="/profile" className="w-full">
                                <Avatar className="w-6 h-6">
                                    <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" data-ai-hint="person portrait" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span>Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={handleLogout}>
                    <LogOut /> <span>Logout</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
