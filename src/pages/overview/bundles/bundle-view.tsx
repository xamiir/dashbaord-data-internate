import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, Package, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const BundleView = observer(function BundleView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bundlesStore } = useStores();
  const [bundle, setBundle] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Find bundle from existing data or fetch individual bundle
      const existingBundle = bundlesStore.bundles.data?.find(
        (b: any) => b._id === id || b.id === id
      );
      if (existingBundle) {
        setBundle(existingBundle);
      } else {
        // If not found in current data, try to fetch bundles first
        bundlesStore.getBundles({ page: 1, limit: 100 }).then(() => {
          const foundBundle = bundlesStore.bundles.data?.find(
            (b: any) => b._id === id || b.id === id
          );
          if (foundBundle) {
            setBundle(foundBundle);
          }
        });
      }
    }
  }, [id, bundlesStore]);

  if (!bundle) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            Bundle not found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The bundle you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => navigate(PATHS.Overview.bundles.root)}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Bundles
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            href: PATHS.Overview.bundles.root,
            icon: <Package className="h-4 w-4" />,
          },
          {
            label: bundle.label,
            disabled: true,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Bundle Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{bundle.label}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(PATHS.Overview.bundles.root)}
            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bundles
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Bundle Information */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Package className="h-5 w-5" />
                Bundle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Label
                  </label>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {bundle.label}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Quantity
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {bundle.quantity || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Amount
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    ${bundle.amount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Business Amount
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    ${bundle.businessAmount || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Points
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {bundle.points}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Offer ID
                  </label>
                  <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    {bundle.offerId || "N/A"}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </label>
                <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                  {bundle.description || "No description available"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Category Information */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Category Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Internet category details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bundle.internetCategory ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Category Name
                      </label>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {bundle.internetCategory.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Category ID
                      </label>
                      <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
                        {bundle.internetCategory._id}
                      </p>
                    </div>
                  </div>

                  {bundle.internetCategory.internetProvider && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Internet Provider
                      </label>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {bundle.internetCategory.internetProvider.name}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No category information available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  MongoDB ID
                </label>
                <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
                  {bundle._id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Version
                </label>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {bundle.__v}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </label>
                <div className="mt-1">
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
});
