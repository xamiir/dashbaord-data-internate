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
import { driverColumns } from "@/components/columns/driver-columns";

export const DriverList = observer(function DriverList() {
  const {
    driversStore: { getDrivers, drivers },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getDrivers({
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
            label: "Drivers",
            disabled: true,
            icon: <User2Icon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Drivers</CardTitle>
            <CardDescription>
              Manage drivers in your application
            </CardDescription>
          </div>
          <div>
            <CreateButton
              to={PATHS.Overview.drivers.new}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add New Driver</span>
            </CreateButton>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={drivers.data || []}
            columns={driverColumns}
            onPageChange={() => {}}
            currentPage={1}
            totalPages={1}
          />
        </div>
      </div>
    </>
  );
});
