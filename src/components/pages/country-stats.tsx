import {
  DiamondIcon as GoldIcon,
  ScaleIcon,
  CoinsIcon,
  TrendingUpIcon,
} from "lucide-react";
import { StatsCard } from "../widgets";

export function CountryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Gold Reserves"
        value={8133}
        icon={<GoldIcon className="h-5 w-5 text-yellow-600" />}
      />

      <StatsCard
        title="Market Value"
        value={498.8}
        icon={<ScaleIcon className="h-5 w-5 text-yellow-600" />}
      />

      <StatsCard
        title="Trading Volume"
        value={1234}
        icon={<CoinsIcon className="h-5 w-5 text-yellow-600" />}
      />

      <StatsCard
        title="Price per Ounce"
        value={1815.24}
        icon={<TrendingUpIcon className="h-5 w-5 text-yellow-600" />}
      />
    </div>
  );
}
