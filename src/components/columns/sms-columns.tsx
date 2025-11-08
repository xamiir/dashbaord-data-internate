import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { SMS } from "@/types/sms";
import { PATHS } from "@/routers/paths";
import { EditButton } from "../authorized-buttons";

export const smsColumns: ColumnDef<SMS>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("from")}</div>
    ),
  },
  {
    accessorKey: "body",
    header: "Message",
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.getValue("body")}>
        {row.getValue("body")}
      </div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as number;
      return timestamp ? (
        new Date(timestamp).toLocaleString()
      ) : (
        <span className="text-gray-400">-</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return date ? (
        new Date(date).toLocaleDateString()
      ) : (
        <span className="text-gray-400">-</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sms = row.original;

      return (
        <div className="gap-2 flex items-center">
          <EditButton
            size={"xs"}
            to={PATHS.Overview.sms.view(sms._id)}
            variant={"default"}
          >
            <span>View</span>
          </EditButton>
        </div>
      );
    },
  },
];
