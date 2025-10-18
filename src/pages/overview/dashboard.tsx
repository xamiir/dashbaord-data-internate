import { DashboardCards } from "@/components/dashboard-cards";
import { DashboardAreaChart } from "@/components/charts/area-chart";
import { RecentActivity } from "@/components/recent-activity";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Database, Users, Activity, Zap } from "lucide-react";

const systemHealth = [
  { name: "Database", status: "healthy", uptime: "99.9%", icon: Database },
  { name: "API Gateway", status: "healthy", uptime: "99.8%", icon: Activity },
  { name: "Authentication", status: "healthy", uptime: "100%", icon: Users },
  { name: "Functions", status: "degraded", uptime: "97.2%", icon: Zap },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your system.
          </p>
        </div>
        <Button>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          View Reports
        </Button>
      </div>

      <DashboardCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>
              Your system performance over the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardAreaChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Current status of all system components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((system) => (
                <div
                  key={system.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary">
                      <system.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{system.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Uptime: {system.uptime}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      system.status === "healthy"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }
                  >
                    {system.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <RecentActivity />
    </div>
  );
}
