import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { useAuth } from "@/lib/auth";
import { createAvatar } from '@dicebear/core';
import { glass } from '@dicebear/collection';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout } = useAuth();

  // Show loading state if user is not yet loaded
  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">...</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Loading...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // Extract user info from the OIDC user object
  const userName = user.profile.name || user.profile.email || 'User';
  const userEmail = user.profile.email || '';
  const userAvatar = user.profile.picture || '';
  
  // Generate Dicebear avatar if no profile picture
  const generateDicebearAvatar = (email: string) => {
    if (!email) return '';
    try {
      const avatar = createAvatar(glass, {
        seed: email,
      });
      return avatar.toString();
    } catch (error) {
      console.error('Error generating Dicebear avatar:', error);
      return '';
    }
  };

  // Convert SVG to data URL safely
  const svgToDataUrl = (svg: string) => {
    try {
      // Encode the SVG string to handle Unicode characters
      const encodedSvg = encodeURIComponent(svg);
      return `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
    } catch (error) {
      console.error('Error converting SVG to data URL:', error);
      return '';
    }
  };

  const dicebearAvatar = !userAvatar && userEmail ? generateDicebearAvatar(userEmail) : '';
  const dicebearDataUrl = dicebearAvatar ? svgToDataUrl(dicebearAvatar) : '';
  
  // Get initials for fallback avatar
  const initials = userName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : dicebearDataUrl ? (
                  <AvatarImage 
                    src={dicebearDataUrl} 
                    alt={userName} 
                  />
                ) : null}
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                <span className="truncate text-xs">{userEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {userAvatar ? (
                    <AvatarImage src={userAvatar} alt={userName} />
                  ) : dicebearDataUrl ? (
                    <AvatarImage 
                      src={dicebearDataUrl} 
                      alt={userName} 
                    />
                  ) : null}
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="truncate text-xs">{userEmail}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <AnimatedThemeToggler />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
