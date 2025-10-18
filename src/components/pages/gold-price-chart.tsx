import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { goldText } from "@/lib/colors";

const data = [
  { date: "Jan", price: 1825 },
  { date: "Feb", price: 1860 },
  { date: "Mar", price: 1890 },
  { date: "Apr", price: 1915 },
  { date: "May", price: 1975 },
  { date: "Jun", price: 2015 },
];

export function GoldPriceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={goldText}>Gold Price Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ca8a04"
              strokeWidth={2}
              dot={{ fill: "#ca8a04" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
