"use client";

import { useAuthContext } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { IconButton } from "./ui/icon-button";
import { LogOut, User, Cat } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  showUserButton?: boolean;
  showDashboardButton?: boolean;
  className?: string;
}

export function Header({ 
  showUserButton = true, 
  showDashboardButton = true, 
  className = "" 
}: HeaderProps) {
  const { logout } = useAuthContext();

  return (
    <div className={`flex justify-between items-center mb-8 ${className}`}>
      <div className="flex items-center gap-4">
        {showDashboardButton && (
          <Link href="/dashboard">
            <IconButton 
              icon={<Cat className="h-4 w-4" />} 
              variant="ghost" 
              className="p-4 bg-gray-300 rounded-full cursor-pointer" 
            />
          </Link>
        )}
        {showUserButton && (
          <Link href="/user">
            <IconButton 
              icon={<User className="h-4 w-4" />} 
              variant="ghost" 
              className="p-4 bg-gray-300 rounded-full cursor-pointer" 
            />
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={logout} variant="outline" className="flex items-center gap-2 cursor-pointer">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
