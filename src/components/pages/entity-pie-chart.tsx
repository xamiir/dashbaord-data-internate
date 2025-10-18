import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const COLORS = ["#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

export const EntityPieChart = observer(function EntityPieChart() {
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
      value: users.data?.length || 0,
    },
    {
      name: "Drivers",
      value: drivers.data?.length || 0,
    },
    {
      name: "Motorcycles",
      value: motorcycles.data?.length || 0,
    },
    {
      name: "Owners",
      value: owners.data?.length || 0,
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Entity Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
