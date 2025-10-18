"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  Bike,
  User,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const DashboardCards = observer(function DashboardCards() {
  const {
    usersStore: { getUsers, users },
    driversStore: { getDrivers, drivers },
    motorcyclesStore: { getMotorcycles, motorcycles },
    ownersStore: { getOwners, owners },
  } = useStores();

  useEffect(() => {
    getUsers({ page: 1, limit: 1000 });
    getDrivers({ page: 1, limit: 1000 });
    getMotorcycles({ page: 1, limit: 1000 });
    getOwners({ page: 1, limit: 1000 });
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: users.data?.length || 0,
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Total Drivers",
      value: drivers.data?.length || 0,
      change: "+8.2%",
      trend: "up",
      icon: UserCheck,
      description: "Active drivers",
    },
    {
      title: "Total Motorcycles",
      value: motorcycles.data?.length || 0,
      change: "+15.3%",
      trend: "up",
      icon: Bike,
      description: "Registered motorcycles",
    },
    {
      title: "Total Owners",
      value: owners.data?.length || 0,
      change: "+5.1%",
      trend: "up",
      icon: User,
      description: "Vehicle owners",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={stat.trend === "up" ? "default" : "destructive"}
                className={`text-xs ${
                  stat.trend === "up"
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-red-500/10 text-red-500 border-red-500/20"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
