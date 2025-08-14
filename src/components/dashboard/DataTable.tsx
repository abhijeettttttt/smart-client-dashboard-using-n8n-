import { DashboardCard } from "./DashboardCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DataRow {
  client: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

interface DataTableProps {
  data: DataRow[];
  title: string;
}

export function DataTable({ data, title }: DataTableProps) {
  const getStatusVariant = (status: string) => {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case "completed":
      case "delivered": 
        return "bg-status-success/20 text-status-success border-status-success/50";
      case "pending": return "bg-status-warning/20 text-status-warning border-status-warning/50";
      case "cancelled":
      case "canceled": 
        return "bg-status-error/20 text-status-error border-status-error/50";
      default: return "bg-muted/20 text-muted-foreground border-muted/50";
    }
  };

  return (
    <DashboardCard title={title} variant="glass" className="col-span-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="text-left py-3 px-4 neon-cyan">Client</th>
              <th className="text-left py-3 px-4 neon-cyan">Headshots</th>
              <th className="text-left py-3 px-4 neon-cyan">Price</th>
              <th className="text-left py-3 px-4 neon-cyan">Status</th>
              <th className="text-left py-3 px-4 neon-cyan">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr 
                key={index} 
                className={cn(
                  "border-b border-glass-border/30 hover:bg-glass/20 transition-colors",
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="py-3 px-4 font-medium">{row.client}</td>
                <td className="py-3 px-4 neon-purple">{row.headshots}</td>
                <td className="py-3 px-4 neon-green">₹{row.price.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <Badge className={cn("border", getStatusVariant(row.status))}>
                    {row.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}