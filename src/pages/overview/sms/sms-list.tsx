import { smsColumns } from "@/components/columns/sms-columns";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { Config } from "@/config";
import { observer } from "mobx-react-lite";

export const SmsList = observer(function SmsList() {
  const {
    smsStore: { getSms, sms },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getSms({
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
            label: "SMS",
            disabled: true,
            icon: <MessageSquare className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>SMS Messages</CardTitle>
            <CardDescription>
              View and manage SMS messages in your application
            </CardDescription>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={sms.data || []}
            columns={smsColumns}
            onPageChange={() => {}}
            currentPage={sms.current_page}
            totalPages={sms.total_pages}
          />
        </div>
      </div>
    </>
  );
});
