import { LayoutDashboard, Package } from "lucide-react";
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

const bundleSchema = z.object({
  label: z.string().min(1, "Label is required"),
  description: z.string().optional(),
  quantity: z.coerce.number().optional(), // 👈 convert string to number
  amount: z.coerce.number().min(0, "Amount must be positive"), // 👈
  businessAmount: z.coerce.number().optional(), // 👈
  offerId: z.string().optional(),
  points: z.coerce.number().min(0, "Points must be positive"), // 👈
  internetCategory: z.string().min(1, "Internet category is required"),
});

type ZodBundle = z.infer<typeof bundleSchema>;

export const NewEditBundle = observer(function NewEditBundle() {
  const {
    bundlesStore: { createBundle, status, bundles, updateBundle, getBundles },
    categoriesStore: { getCategories, categories },
  } = useStores();

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const navigate = useNavigate();
  const id = get(params, "id", "");

  const currentBundle = bundles.data?.find(
    (bundle) => bundle.id === id || bundle._id === id
  );

  const form = useForm<ZodBundle>({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      label: currentBundle?.label || "",
      description: currentBundle?.description || "",
      quantity: currentBundle?.quantity || undefined,
      amount: currentBundle?.amount || 0,
      businessAmount: currentBundle?.businessAmount || 0,
      offerId: currentBundle?.offerId || "",
      points: currentBundle?.points || 0,
      internetCategory: currentBundle?.internetCategory || "",
    },
  });

  useEffect(() => {
    // Fetch categories for the dropdown
    getCategories({ page: 1, limit: 100 });
  }, [getCategories]);

  const handleSubmit = async (values: ZodBundle) => {
    try {
      if (isEdit) {
        await updateBundle(id, {
          label: values.label,
          description: values.description,
          quantity: values.quantity,
          amount: values.amount,
          businessAmount: values.businessAmount,
          offerId: values.offerId,
          points: values.points,
          internetCategory: values.internetCategory,
        });
        toast.success("Bundle updated successfully");
        navigate(PATHS.Overview.bundles.root);
        return;
      }

      await createBundle({
        label: values.label,
        description: values.description,
        quantity: values.quantity,
        amount: values.amount,
        businessAmount: values.businessAmount,
        offerId: values.offerId,
        points: values.points,
        internetCategory: values.internetCategory,
      });
      await getBundles({ page: 1, limit: 10 });
      toast.success("Bundle created successfully");
      navigate(PATHS.Overview.bundles.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save bundle");
    }
  };

  const categoryOptions =
    categories.data?.map((category: any) => ({
      value: category.id || category._id,
      label: category.name,
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
            label: "Bundles",
            href: PATHS.Overview.bundles.root,
            icon: <Package className="h-4 w-4" />,
          },
          {
            label: isEdit ? "Edit Bundle" : "New Bundle",
            disabled: true,
            icon: <Package className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {isEdit ? "Edit Bundle" : "New Bundle"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isEdit
                    ? "Edit bundle details below."
                    : "Add a new bundle below."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper
                    form={form as any}
                    name={"label"}
                    label="Label"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"internetCategory"}
                    label="Internet Category"
                    fieldType="select"
                    data={categoryOptions}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper
                    form={form as any}
                    name={"quantity"}
                    label="Quantity"
                    type="number"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"amount"}
                    label="Amount"
                    type="number"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper
                    form={form as any}
                    name={"businessAmount"}
                    label="Business Amount"
                    type="number"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"points"}
                    label="Points"
                    type="number"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper
                    form={form as any}
                    name={"offerId"}
                    label="Offer ID"
                  />
                </div>

                <div className="md:col-span-2">
                  <FormWrapper
                    form={form as any}
                    name={"description"}
                    label="Description"
                    cols={4}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>{isEdit ? "Update Bundle" : "Save Bundle"}</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});
