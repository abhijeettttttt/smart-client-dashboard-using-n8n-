import { TrendingUp, Users, DollarSign, BarChart3, Camera, Mail } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { DataTable } from "@/components/dashboard/DataTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { useGoogleSheetsData } from "@/hooks/useGoogleSheetsData";
import { useMemo } from "react";

const Index = () => {
  const { data, loading, error } = useGoogleSheetsData(
    "https://docs.google.com/spreadsheets/d/16Yd7KcLnshsHxb-jfdhOnb-KCDhqycenVGG7xP0TwPc/export?format=csv"
  );

  const analytics = useMemo(() => {
    if (!data.length) return {
      totalRevenue: 0,
      totalClients: 0,
      totalHeadshots: 0,
      averagePrice: 0,
      completedProjects: 0,
      revenueData: []
    };

    const totalRevenue = data.reduce((sum, item) => sum + item.price, 0);
    const totalClients = data.length;
    const totalHeadshots = data.reduce((sum, item) => sum + item.headshots, 0);
    const averagePrice = totalRevenue / totalClients || 0;
    const completedProjects = data.filter(item => 
      item.status.toLowerCase() === 'completed' || 
      item.status.toLowerCase() === 'delivered'
    ).length;
    
    // Generate monthly revenue data for chart
    const revenueData = [
      { month: 'Jan', revenue: totalRevenue * 0.7 },
      { month: 'Feb', revenue: totalRevenue * 0.8 },
      { month: 'Mar', revenue: totalRevenue * 0.9 },
      { month: 'Apr', revenue: totalRevenue },
      { month: 'May', revenue: totalRevenue * 1.1 },
      { month: 'Jun', revenue: totalRevenue * 1.2 },
    ];

    return {
      totalRevenue,
      totalClients,
      totalHeadshots,
      averagePrice,
      completedProjects,
      revenueData
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="neon-cyan text-2xl animate-glow-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-5xl font-bold neon-cyan mb-4">
          Abhijeet's Business Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Real-time Business Intelligence Dashboard
        </p>
        {error && (
          <div className="mt-4 text-status-warning">
            Using demo data - {error}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={`₹${analytics.totalRevenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          icon={<DollarSign />}
        />
        <KPICard
          title="Active Clients"
          value={analytics.totalClients}
          change={8.2}
          trend="up"
          icon={<Users />}
        />
        <KPICard
          title="Total Headshots"
          value={analytics.totalHeadshots}
          change={15.3}
          trend="up"
          icon={<Camera />}
        />
        <KPICard
          title="Average Price"
          value={`₹${Math.round(analytics.averagePrice).toLocaleString()}`}
          change={-2.1}
          trend="down"
          icon={<BarChart3 />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={analytics.revenueData} />
        
        <DashboardCard title="Project Status" variant="glass" className="animate-fade-in">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Completed/Delivered</span>
              <span className="neon-green">{analytics.completedProjects}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending/In Progress</span>
              <span className="neon-purple">
                {data.filter(item => 
                  item.status.toLowerCase() === 'pending' || 
                  item.status.toLowerCase() === 'in progress'
                ).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cancelled</span>
              <span className="neon-pink">
                {data.filter(item => 
                  item.status.toLowerCase() === 'cancelled' || 
                  item.status.toLowerCase() === 'canceled'
                ).length}
              </span>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Data Table */}
      <DataTable data={data} title="Client Database" />
    </div>
  );
};

export default Index;
