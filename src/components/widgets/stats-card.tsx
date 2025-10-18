import { Card, CardContent, CardTitle } from "../ui/card";

export function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </CardTitle>

            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {value.toLocaleString()}
            </h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center shadow-md">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
