import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { IMotorcycle } from "@/types/owner";
import { PATHS } from "@/routers/paths";
import { EditIcon } from "lucide-react";
import { EditButton } from "../authorized-buttons";

export const motorcycleColumns: ColumnDef<IMotorcycle>[] = [
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
    accessorKey: "plate_number",
    header: "Plate Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("plate_number")}</div>
    ),
  },
  {
    accessorKey: "chassis_number",
    header: "Chassis Number",
    cell: ({ row }) => row.getValue("chassis_number"),
  },
  {
    accessorKey: "motorcycle_image_url",
    header: "Image",
    cell: ({ row }) => {
      const url = row.getValue("motorcycle_image_url") as string;
      return url ? (
        <img src={url} alt="Motorcycle" className="w-16 h-16 object-cover" />
      ) : (
        "N/A"
      );
    },
  },
  {
    accessorKey: "motorcycle_category",
    header: "Category",
    cell: ({ row }) => row.getValue("motorcycle_category") || "N/A",
  },
  {
    accessorKey: "registration_date",
    header: "Registration Date",
    cell: ({ row }) => {
      const date = row.getValue("registration_date") as string;
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },
  },
  {
    accessorKey: "owner_id",
    header: "Owner ID",
    cell: ({ row }) => row.getValue("owner_id") || "N/A",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const motorcycle = row.original;

      return (
        <div className="gap-2 flex items-center">
          <EditButton
            size={"xs"}
            to={PATHS.Overview.motorcycles.view(motorcycle.id)}
            variant={"default"}
          >
            <span>View</span>
          </EditButton>
          <EditButton
            size={"xs"}
            to={PATHS.Overview.motorcycles.edit(motorcycle.id)}
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
