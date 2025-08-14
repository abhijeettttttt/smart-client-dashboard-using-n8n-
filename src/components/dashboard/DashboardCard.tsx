import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "neon" | "glass";
  glow?: boolean;
}

export function DashboardCard({ 
  title, 
  children, 
  className, 
  variant = "glass",
  glow = false 
}: DashboardCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      variant === "glass" && "glass glass-hover",
      variant === "neon" && "neon-border",
      glow && "animate-glow-pulse",
      className
    )}>
      <div className="scan-line absolute inset-0 pointer-events-none" />
      <div className="relative z-10 p-6">
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          variant === "neon" && "neon-cyan"
        )}>
          {title}
        </h3>
        {children}
      </div>
    </Card>
  );
}