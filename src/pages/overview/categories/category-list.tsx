import { categoryColumns } from "@/components/columns/category-columns";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, Tag, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { Config } from "@/config";
import { observer } from "mobx-react-lite";
import { CreateButton } from "@/components/authorized-buttons";

export const CategoryList = observer(function CategoryList() {
  const {
    categoriesStore: { getCategories, categories },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getCategories({
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
            label: "Categories",
            disabled: true,
            icon: <Tag className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Manage categories in your application
            </CardDescription>
          </div>
          <div>
            <CreateButton
              to={PATHS.Overview.categories.new}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add New Category</span>
            </CreateButton>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={categories.data || []}
            columns={categoryColumns}
            onPageChange={() => {}}
            currentPage={categories.current_page}
            totalPages={categories.total_pages}
          />
        </div>
      </div>
    </>
  );
});
