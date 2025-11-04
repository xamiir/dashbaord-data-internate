import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Transaction } from "@/types/transaction";
import { PATHS } from "@/routers/paths";
import { EditButton } from "../authorized-buttons";
import { Badge } from "../ui/badge";

export const transactionColumns: ColumnDef<Transaction>[] = [
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
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) =>
      row.getValue("reference") || <span className="text-gray-400">-</span>,
  },
  {
    accessorKey: "senderMobile",
    header: "Sender Mobile",
    cell: ({ row }) =>
      row.getValue("senderMobile") || <span className="text-gray-400">-</span>,
  },
  {
    accessorKey: "receiverMobile",
    header: "Receiver Mobile",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("receiverMobile")}</div>
    ),
  },
  {
    accessorKey: "network",
    header: "Network",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("network")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium">${row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "bundleLabel",
    header: "Bundle",
    cell: ({ row }) =>
      row.getValue("bundleLabel") || <span className="text-gray-400">-</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        success: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
      };
      return (
        <Badge
          className={`capitalize ${
            statusColors[status as keyof typeof statusColors] ||
            "bg-gray-100 text-gray-800"
          }`}
        >
          {status || "pending"}
        </Badge>
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
      const transaction = row.original;

      return (
        <div className="gap-2 flex items-center">
          <EditButton
            size={"xs"}
            to={PATHS.Overview.transactions.view(
              (transaction as any)._id || transaction.id
            )}
            variant={"default"}
          >
            <span>View</span>
          </EditButton>
        </div>
      );
    },
  },
];
