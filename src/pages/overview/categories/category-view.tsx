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
import { LayoutDashboard, Tag, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";

export const CategoryView = observer(function CategoryView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categoriesStore } = useStores();
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Find category from existing data or fetch individual category
      const existingCategory = categoriesStore.categories.data?.find(
        (c: any) => c.id === id || c._id === id
      );
      if (existingCategory) {
        setCategory(existingCategory);
      } else {
        // If not found in current data, try to fetch categories first
        categoriesStore.getCategories({ page: 1, limit: 100 }).then(() => {
          const foundCategory = categoriesStore.categories.data?.find(
            (c: any) => c.id === id || c._id === id
          );
          if (foundCategory) {
            setCategory(foundCategory);
          }
        });
      }
    }
  }, [id, categoriesStore]);

  if (!category) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Tag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            Category not found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The category you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => navigate(PATHS.Overview.categories.root)}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
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
            label: "Categories",
            href: PATHS.Overview.categories.root,
            icon: <Tag className="h-4 w-4" />,
          },
          {
            label: category.name,
            disabled: true,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Category Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{category.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(PATHS.Overview.categories.root)}
            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Category Information */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Tag className="h-5 w-5" />
                Category Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Name
                  </label>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {category.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    ID
                  </label>
                  <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    {category.id || category._id}
                  </p>
                </div>
              </div>

              {category.image && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Image
                  </label>
                  <div className="mt-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Internet Provider Information */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Internet Provider Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Associated internet provider details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {category.internetProvider ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Provider Name
                      </label>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {typeof category.internetProvider === "object"
                          ? category.internetProvider.name
                          : category.internetProvider}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Provider ID
                      </label>
                      <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
                        {typeof category.internetProvider === "object"
                          ? category.internetProvider._id ||
                            category.internetProvider.id
                          : category.internetProvider}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No provider information available
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
                  {category._id || category.id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Version
                </label>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {category.__v || "N/A"}
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
