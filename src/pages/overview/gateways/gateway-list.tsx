import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { gatewayColumns } from "@/components/columns";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, Router } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";

export const GatewayList = observer(function GatewayList() {
  const {
    gatewaysStore: { getGateways, gateways },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getGateways();
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
            label: "Gateways",
            disabled: true,
            icon: <Router className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Gateways</CardTitle>
            <CardDescription>
              Monitor and manage your gateway devices
            </CardDescription>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={gateways?.gateways || []}
            columns={gatewayColumns}
            onPageChange={() => {}}
            currentPage={1}
            totalPages={1}
          />
        </div>
      </div>
    </>
  );
});
