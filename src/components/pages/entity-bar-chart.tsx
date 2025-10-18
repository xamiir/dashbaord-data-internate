import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const EntityBarChart = observer(function EntityBarChart() {
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

  const data = [
    {
      name: "Users",
      count: users.data?.length || 0,
      fill: "#3b82f6",
    },
    {
      name: "Drivers",
      count: drivers.data?.length || 0,
      fill: "#10b981",
    },
    {
      name: "Motorcycles",
      count: motorcycles.data?.length || 0,
      fill: "#ef4444",
    },
    {
      name: "Owners",
      count: owners.data?.length || 0,
      fill: "#8b5cf6",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Entity Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
