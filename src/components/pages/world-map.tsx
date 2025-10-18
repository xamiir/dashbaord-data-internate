import { Card } from "@/components/ui/card";
import WorldMap from "react-svg-worldmap";
import { TooltipProvider } from "@/components/ui/tooltip";

interface CountryData {
  country: string;
  value: number;
}

const data: CountryData[] = [
  { country: "us", value: 8133 },
  { country: "ch", value: 2814 },
  { country: "de", value: 3366 },
  { country: "cn", value: 1948 },
  { country: "ru", value: 2299 },
];

export function WorldGoldMap() {
  return (
    <Card className="p-0">
      <TooltipProvider>
        <div className="h-[400px] w-full">
          <WorldMap
            color="goldenrod"
            valueSuffix="tonnes"
            size="lg"
            data={data}
          />
        </div>
      </TooltipProvider>
    </Card>
  );
}
