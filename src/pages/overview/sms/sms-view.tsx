import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Breadcrumb } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, MessageSquare, ArrowLeft } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";

export const SmsView = observer(function SmsView() {
  const { id } = useParams<{ id: string }>();
  const { smsStore } = useStores();
  const [sms, setSms] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Find SMS from existing data or fetch individual SMS
      const existingSms = smsStore.sms.data?.find(
        (s: any) => s._id === id || s.id === id
      );
      if (existingSms) {
        setSms(existingSms);
      } else {
        // If not found in current data, try to fetch SMS first
        smsStore.getSms({ page: 1, limit: 100 }).then(() => {
          const foundSms = smsStore.sms.data?.find(
            (s: any) => s._id === id || s.id === id
          );
          if (foundSms) {
            setSms(foundSms);
          }
        });
      }
    }
  }, [id, smsStore]);

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
            href: PATHS.Overview.sms.root,
            icon: <MessageSquare className="h-4 w-4" />,
          },
          {
            label: `SMS ${id}`,
            disabled: true,
            icon: <MessageSquare className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to={PATHS.Overview.sms.root}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to SMS List
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>SMS Message Details</CardTitle>
            <CardDescription>
              View detailed information about this SMS message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">ID</label>
                <p className="text-sm text-gray-900">{sms?._id || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  From
                </label>
                <p className="text-sm text-gray-900">{sms?.from || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Timestamp
                </label>
                <p className="text-sm text-gray-900">
                  {sms?.timestamp
                    ? new Date(sms.timestamp).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Created At
                </label>
                <p className="text-sm text-gray-900">
                  {sms?.createdAt
                    ? new Date(sms.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Message Body
              </label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                  {sms?.body || "No message content"}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
});
