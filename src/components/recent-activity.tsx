"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    user: "John Doe",
    email: "john@example.com",
    action: "Created new user account",
    time: "2 minutes ago",
    type: "user",
    avatar: "/user-john.jpg",
  },
  {
    user: "Sarah Wilson",
    email: "sarah@example.com",
    action: "Updated database schema",
    time: "5 minutes ago",
    type: "database",
    avatar: "/placeholder-546p9.png",
  },
  {
    user: "Mike Johnson",
    email: "mike@example.com",
    action: "Deployed new API version",
    time: "12 minutes ago",
    type: "deployment",
    avatar: "/user-mike.jpg",
  },
  {
    user: "Emma Davis",
    email: "emma@example.com",
    action: "Modified user permissions",
    time: "1 hour ago",
    type: "security",
    avatar: "/user-emma.jpg",
  },
  {
    user: "Alex Chen",
    email: "alex@example.com",
    action: "Generated analytics report",
    time: "2 hours ago",
    type: "analytics",
    avatar: "/user-alex.jpg",
  },
];

const getTypeBadge = (type: string) => {
  const variants = {
    user: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    database: "bg-green-500/10 text-green-500 border-green-500/20",
    deployment: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    security: "bg-red-500/10 text-red-500 border-red-500/20",
    analytics: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  return variants[type as keyof typeof variants] || variants.user;
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions performed in your system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}
                  </p>
                  <Badge
                    variant="outline"
                    className={getTypeBadge(activity.type)}
                  >
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
