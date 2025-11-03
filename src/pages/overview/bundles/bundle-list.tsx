import { bundleColumns } from "@/components/columns/bundle-columns";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, Package, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { Config } from "@/config";
import { observer } from "mobx-react-lite";
import { CreateButton } from "@/components/authorized-buttons";

export const BundleList = observer(function BundleList() {
  const {
    bundlesStore: { getBundles, bundles },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getBundles({
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
            label: "Bundles",
            disabled: true,
            icon: <Package className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Bundles</CardTitle>
            <CardDescription>
              Manage bundles in your application
            </CardDescription>
          </div>
          <div>
            <CreateButton
              to={PATHS.Overview.bundles.new}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add New Bundle</span>
            </CreateButton>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={bundles.data || []}
            columns={bundleColumns}
            onPageChange={() => {}}
            currentPage={bundles.current_page}
            totalPages={bundles.total_pages}
          />
        </div>
      </div>
    </>
  );
});
