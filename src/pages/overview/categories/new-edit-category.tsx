import { LayoutDashboard, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Breadcrumb, FormWrapper } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useStores } from "@/models/helpers";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { get } from "lodash";
import { z } from "zod";
import FileUpload from "@/components/widgets/file-upload";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  internetProvider: z.string().min(1, "Internet provider is required"),
});

type ZodCategory = z.infer<typeof categorySchema>;

export const NewEditCategory = observer(function NewEditCategory() {
  const {
    categoriesStore: {
      createCategory,
      status,
      categories,
      updateCategory,
      getCategories,
    },
    providersStore: { getProviders, providers },
  } = useStores();

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const navigate = useNavigate();
  const id = get(params, "id", "");

  const currentCategory = categories.data?.find(
    (category: any) => category.id === id || category._id === id
  );

  const form = useForm<ZodCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: currentCategory?.name || "",
      image: currentCategory?.image || "",
      internetProvider: currentCategory?.internetProvider || "",
    },
  });

  useEffect(() => {
    // Fetch providers for the dropdown
    getProviders({ page: 1, limit: 100 });
  }, [getProviders]);

  // Update form values when currentCategory changes
  useEffect(() => {
    if (currentCategory) {
      form.reset({
        name: currentCategory.name || "",
        image: currentCategory.image || "",
        internetProvider: currentCategory.internetProvider || "",
      });
    }
  }, [currentCategory, form]);

  const handleSubmit = async (values: ZodCategory) => {
    try {
      if (isEdit) {
        await updateCategory(id, {
          name: values.name,
          image: values.image,
          internetProvider: values.internetProvider,
        });
        toast.success("Category updated successfully");
        navigate(PATHS.Overview.categories.root);
        return;
      }

      await createCategory({
        name: values.name,
        image: values.image,
        internetProvider: values.internetProvider,
      });
      await getCategories({ page: 1, limit: 10 });
      toast.success("Category created successfully");
      navigate(PATHS.Overview.categories.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save category");
    }
  };

  const providerOptions =
    providers.data?.map((provider) => ({
      value: provider._id,
      label: provider.name,
    })) || [];

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
            label: isEdit ? "Edit Category" : "New Category",
            disabled: true,
            icon: <Tag className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {isEdit ? "Edit Category" : "New Category"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isEdit
                    ? "Edit category details below."
                    : "Add a new category below."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper form={form as any} name={"name"} label="Name" />
                  <FormWrapper
                    form={form as any}
                    name={"internetProvider"}
                    label="Internet Provider"
                    fieldType="select"
                    data={providerOptions}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Category Image
                  </label>
                  <FileUpload
                    form={form as any}
                    name="image"
                    multiple={false}
                    maxFiles={1}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>{isEdit ? "Update Category" : "Save Category"}</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});
