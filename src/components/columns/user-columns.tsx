import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { IUser } from "@/types/user";
import { PATHS } from "@/routers/paths";
import { EditIcon } from "lucide-react";
import { EditButton } from "../authorized-buttons";
import { Badge } from "../ui/badge";

export const userColumns: ColumnDef<IUser>[] = [
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
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.getValue("phone"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge className="capitalize">{status || "active"}</Badge>;
    },
  },
  {
    accessorKey: "is_email_verified",
    header: "Email Verified",
    cell: ({ row }) => {
      const isVerified = row.getValue("is_email_verified");
      return (
        <Badge className={isVerified ? "bg-green-500" : "bg-red-500"}>
          {isVerified ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="gap-2 flex items-center">
          <EditButton
            size={"xs"}
            to={PATHS.Overview.users.view(user.id.toString())}
            variant={"default"}
          >
            <span>View</span>
          </EditButton>
          <EditButton
            size={"xs"}
            to={PATHS.Overview.users.edit(user.id.toString())}
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
