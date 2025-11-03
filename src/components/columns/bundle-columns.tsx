import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Bundle } from "@/types/bundle";
import { PATHS } from "@/routers/paths";
import { EditIcon } from "lucide-react";
import { EditButton } from "../authorized-buttons";
import { Badge } from "../ui/badge";

export const bundleColumns: ColumnDef<Bundle>[] = [
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
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("label")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) =>
      row.getValue("description") || (
        <span className="text-gray-400">No description</span>
      ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) =>
      row.getValue("quantity") || <span className="text-gray-400">-</span>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium">${row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "businessAmount",
    header: "Business Amount",
    cell: ({ row }) =>
      row.getValue("businessAmount") ? (
        <div className="font-medium">${row.getValue("businessAmount")}</div>
      ) : (
        <span className="text-gray-400">-</span>
      ),
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("points")}</div>
    ),
  },
  {
    accessorKey: "internetCategory",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("internetCategory") as any;
      return <div className="capitalize">{category?.name || category}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const bundle = row.original;

      return (
        <div className="gap-2 flex items-center">
          <EditButton
            size={"xs"}
            to={PATHS.Overview.bundles.view((bundle as any)._id || bundle.id)}
            variant={"default"}
          >
            <span>View</span>
          </EditButton>
          <EditButton
            size={"xs"}
            to={PATHS.Overview.bundles.edit((bundle as any)._id || bundle.id)}
            variant={"outline"}
          >
            <EditIcon className="mr-2 h-3 w-3" />
            <span>Edit</span>
          </EditButton>
        </div>
      );
    },
  },
];
