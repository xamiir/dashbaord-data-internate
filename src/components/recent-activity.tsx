"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const getTypeBadge = (type: string) => {
  const variants = {
    user: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    database: "bg-green-500/10 text-green-500 border-green-500/20",
    deployment: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    security: "bg-red-500/10 text-red-500 border-red-500/20",
    analytics: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    failed: "bg-red-500/10 text-red-500 border-red-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  return variants[type as keyof typeof variants] || variants.user;
};

export const RecentActivity = observer(function RecentActivity() {
  const {
    transactionStore: { getTransactions, transactions },
  } = useStores();

  useEffect(() => {
    getTransactions({ page: 1, limit: 10 });
  }, [getTransactions]);

  const activities =
    transactions.data?.slice(0, 5).map((transaction: any) => ({
      user: transaction.senderMobile || "Unknown",
      email: transaction.receiverMobile || "",
      action: `Transaction ${transaction.reference} - ${transaction.status}`,
      time: transaction.createdAt
        ? new Date(transaction.createdAt).toLocaleString()
        : "Unknown",
      type:
        transaction.status === "success"
          ? "success"
          : transaction.status === "failed"
          ? "failed"
          : "pending",
      avatar: "",
    })) || [];

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
                  .map((n: string) => n[0])
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
});
