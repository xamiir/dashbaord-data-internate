import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, BikeIcon } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { Config } from "@/config";
import { observer } from "mobx-react-lite";
import { motorcycleColumns } from "@/components/columns/motorcycle-columns";

export const MotorcycleList = observer(function MotorcycleList() {
  const {
    motorcyclesStore: { getMotorcycles, motorcycles },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getMotorcycles({
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
            label: "Motorcycles",
            disabled: true,
            icon: <BikeIcon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Motorcycles</CardTitle>
            <CardDescription>
              Manage motorcycles in your application
            </CardDescription>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={motorcycles.data || []}
            columns={motorcycleColumns}
            onPageChange={() => {}}
            currentPage={1}
            totalPages={1}
          />
        </div>
      </div>
    </>
  );
});
