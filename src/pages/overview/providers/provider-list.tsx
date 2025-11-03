import { providerColumns } from "@/components/columns/provider-columns";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, Shield, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { Config } from "@/config";
import { observer } from "mobx-react-lite";
import { CreateButton } from "@/components/authorized-buttons";

export const ProviderList = observer(function ProviderList() {
  const {
    providersStore: { getProviders, providers },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getProviders({
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
            label: "Providers",
            disabled: true,
            icon: <Shield className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Providers</CardTitle>
            <CardDescription>
              Manage providers in your application
            </CardDescription>
          </div>
          <div>
            <CreateButton
              to={PATHS.Overview.providers.new}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add New Provider</span>
            </CreateButton>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={providers.data || []}
            columns={providerColumns}
            onPageChange={() => {}}
            currentPage={providers.current_page}
            totalPages={providers.total_pages}
          />
        </div>
      </div>
    </>
  );
});
