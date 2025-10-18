import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { IOwner } from "@/types/owner";
import { PATHS } from "@/routers/paths";
import { EditIcon } from "lucide-react";
import { EditButton } from "../authorized-buttons";
import { Badge } from "../ui/badge";

export const ownerColumns: ColumnDef<IOwner>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "mobile_number",
    header: "Mobile Number",
    cell: ({ row }) => row.getValue("mobile_number"),
  },
  {
    accessorKey: "motorcycles",
    header: "Motorcycles",
    cell: ({ row }) => {
      const motorcycles = row.getValue("motorcycles") as any[];
      return <Badge>{motorcycles?.length || 0}</Badge>;
    },
  },
  {
    accessorKey: "documentType",
    header: "Document Type",
    cell: ({ row }) => {
      const type = row.getValue("documentType") as string;
      const labels = {
        driver_id: "Driver ID",
        national_id: "National ID",
        passport: "Passport",
      };
      return type ? labels[type as keyof typeof labels] || type : "N/A";
    },
  },
  {
    accessorKey: "documentNumber",
    header: "Document Number",
    cell: ({ row }) => row.getValue("documentNumber") || "N/A",
  },
  {
    accessorKey: "documentUpload",
    header: "Document",
    cell: ({ row }) => {
      const url = row.getValue("documentUpload") as string;
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View
        </a>
      ) : (
        "N/A"
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const owner = row.original;

      return (
        <div className="gap-2 flex items-center">
          <EditButton
            size={"xs"}
            to={PATHS.Overview.owners.view(owner.id)}
            variant={"default"}
          >
            <span>View</span>
          </EditButton>
          <EditButton
            size={"xs"}
            to={PATHS.Overview.owners.edit(owner.id)}
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
