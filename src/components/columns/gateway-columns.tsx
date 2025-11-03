import { ColumnDef } from "@tanstack/react-table";
import { Gateway } from "@/types/gateway";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

export const gatewayColumns: ColumnDef<Gateway>[] = [
  {
    accessorKey: "gatewayId",
    header: "Gateway ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("gatewayId")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="outline"
          className={
            status === "online"
              ? "bg-green-500/10 text-green-500 border-green-500/20"
              : "bg-red-500/10 text-red-500 border-red-500/20"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "device",
    header: "Device",
    cell: ({ row }) => {
      const device = row.getValue("device") as any;
      return (
        <div>
          <div className="font-medium">
            {device?.manufacturer} {device?.model}
          </div>
          <div className="text-sm text-muted-foreground">
            Android {device?.android}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sims",
    header: "SIMs",
    cell: ({ row }) => {
      const sims = row.getValue("sims") as any[];
      return (
        <div className="space-y-1">
          {sims?.map((sim, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium">{sim.carrierName}</div>
              <div className="text-muted-foreground">
                Slot {sim.slotIndex}, Sub {sim.subscriptionId}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "lastSeen",
    header: "Last Seen",
    cell: ({ row }) => {
      const lastSeen = row.getValue("lastSeen") as string | number;
      try {
        const date =
          typeof lastSeen === "number"
            ? new Date(lastSeen)
            : new Date(lastSeen);
        return <div className="text-sm">{format(date, "PPp")}</div>;
      } catch {
        return <div className="text-sm text-muted-foreground">-</div>;
      }
    },
  },
];
