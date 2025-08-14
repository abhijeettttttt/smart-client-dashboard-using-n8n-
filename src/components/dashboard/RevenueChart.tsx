import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DashboardCard } from './DashboardCard';

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <DashboardCard title="Revenue Trends" variant="glass" className="col-span-2">
      <div className="h-64 chart-glow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsla(180, 100%, 50%, 0.2)" 
            />
            <XAxis 
              dataKey="month" 
              stroke="hsl(180, 100%, 70%)"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(180, 100%, 70%)"
              fontSize={12}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(180, 100%, 50%)"
              strokeWidth={3}
              dot={{ 
                fill: "hsl(180, 100%, 50%)", 
                strokeWidth: 2, 
                r: 6,
                filter: "drop-shadow(0 0 8px hsl(180, 100%, 50%))"
              }}
              activeDot={{ 
                r: 8, 
                fill: "hsl(320, 100%, 70%)",
                filter: "drop-shadow(0 0 12px hsl(320, 100%, 70%))"
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}