import { userColumns } from "@/components/columns/user-columns";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, User2Icon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { Config } from "@/config";
import { observer } from "mobx-react-lite";
import { CreateButton } from "@/components/authorized-buttons";

export const UserList = observer(function UserList() {
  const {
    usersStore: { getUsers, users },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getUsers({ page: Config.DEFAULT_PAGE, limit: Config.DEFAULT_PAGE_LIMIT });
    }
  }, [isMounted]);

  return (
    <>
      <Breadcrumb
        links={[
          {
            label: "Dashboard",
            href: PATHS.Overview.app,
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
          {
            label: "Users",
            disabled: true,
            icon: <User2Icon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage users in your application</CardDescription>
          </div>
          <div>
            <CreateButton
              to={PATHS.Overview.users.new}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add New User</span>
            </CreateButton>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={users.data || []}
            columns={userColumns}
            onPageChange={() => {}}
            currentPage={users.current_page}
            totalPages={users.total_pages}
          />
        </div>
      </div>
    </>
  );
});
