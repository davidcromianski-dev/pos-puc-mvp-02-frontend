import { Button } from "./button";
import { cn } from "../../lib/utils";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function IconButton({ 
  icon, 
  className, 
  variant = "outline", 
  size = "icon",
  ...props 
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("", className)}
      {...props}
    >
      {icon}
    </Button>
  );
}
