import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Inbox, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTours: 0,
    activeTours: 0,
    totalInquiries: 0,
    newInquiries: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [toursRes, inquiriesRes] = await Promise.all([
      supabase.from("tours").select("id, is_active"),
      supabase.from("inquiries").select("id, status"),
    ]);

    const tours = toursRes.data || [];
    const inquiries = inquiriesRes.data || [];

    setStats({
      totalTours: tours.length,
      activeTours: tours.filter((t) => t.is_active).length,
      totalInquiries: inquiries.length,
      newInquiries: inquiries.filter((i) => i.status === "new").length,
    });
  };

  const statCards = [
    {
      title: "Total Tours",
      value: stats.totalTours,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Tours",
      value: stats.activeTours,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      icon: Inbox,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "New Inquiries",
      value: stats.newInquiries,
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Sova Tours Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • Manage tour packages from the Tours section
            </p>
            <p className="text-sm text-muted-foreground">
              • View and respond to inquiries from the Inquiries section
            </p>
            <p className="text-sm text-muted-foreground">
              • Add or manage admin users from the Team section
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
