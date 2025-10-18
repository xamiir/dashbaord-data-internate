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
import { ownerColumns } from "@/components/columns/owner-columns";

export const OwnerList = observer(function OwnerList() {
  const {
    ownersStore: { getOwners, owners },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getOwners({
        page: Config.DEFAULT_PAGE,
        limit: Config.DEFAULT_PAGE_LIMIT,
      });
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
            label: "Owners",
            disabled: true,
            icon: <User2Icon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Owners</CardTitle>
            <CardDescription>Manage owners in your application</CardDescription>
          </div>
          <div>
            <CreateButton
              to={PATHS.Overview.owners.new}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add New Owner</span>
            </CreateButton>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={owners.data || []}
            columns={ownerColumns}
            onPageChange={() => {}}
            currentPage={1}
            totalPages={1}
          />
        </div>
      </div>
    </>
  );
});
