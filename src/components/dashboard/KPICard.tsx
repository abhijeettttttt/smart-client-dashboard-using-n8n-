import { ReactNode } from "react";
import { DashboardCard } from "./DashboardCard";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  icon, 
  trend = "neutral",
  className 
}: KPICardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-status-success";
      case "down": return "text-status-error";
      default: return "text-muted-foreground";
    }
  };

  return (
    <DashboardCard 
      title={title} 
      variant="glass" 
      glow 
      className={cn("animate-fade-in", className)}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold neon-cyan mb-2">
            {value}
          </div>
          {change !== undefined && (
            <div className={cn("text-sm flex items-center", getTrendColor())}>
              {trend === "up" && "↗"}
              {trend === "down" && "↘"}
              {trend === "neutral" && "→"}
              <span className="ml-1">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className="text-4xl text-neon-purple animate-float">
          {icon}
        </div>
      </div>
    </DashboardCard>
  );
}