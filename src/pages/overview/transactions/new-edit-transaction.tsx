import { LayoutDashboard, Receipt } from "lucide-react";
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
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Label } from "@/components/ui/label";

const buyDataSchema = z.object({
  senderMobile: z.string().min(1, "Sender mobile is required"),
  receiverMobile: z.string().min(1, "Receiver mobile is required"),
  reference: z.string().min(1, "Reference is required"),
  selectBundle: z.object({
    _id: z.string().min(1, "Bundle ID is required"),
  }),
});

type ZodBuyData = z.infer<typeof buyDataSchema>;

export const NewEditTransaction = observer(function NewEditTransaction() {
  const {
    transactionStore: { buyData, status },
    bundlesStore: { getBundles, bundles },
  } = useStores();

  const navigate = useNavigate();

  const form = useForm<ZodBuyData>({
    resolver: zodResolver(buyDataSchema),
    defaultValues: {
      senderMobile: "",
      receiverMobile: "",
      reference: "",
      selectBundle: {
        _id: "",
      },
    },
  });

  useEffect(() => {
    // Fetch bundles for the dropdown
    getBundles({ page: 1, limit: 100 });
  }, [getBundles]);

  const handleSubmit = async (values: ZodBuyData) => {
    try {
      await buyData(values);
      toast.success("Transaction created successfully");
      navigate(PATHS.Overview.transactions.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create transaction");
    }
  };

  const selectedBundle = bundles.data?.find(
    (bundle) =>
      bundle.id === form.watch("selectBundle._id") ||
      bundle._id === form.watch("selectBundle._id")
  );

  const bundleOptions =
    bundles.data?.map((bundle: any) => ({
      value: bundle.id || bundle._id,
      label: bundle.label,
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
            label: "Transactions",
            href: PATHS.Overview.transactions.root,
            icon: <Receipt className="h-4 w-4" />,
          },
          {
            label: "New Transaction",
            disabled: true,
            icon: <Receipt className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  New Transaction
                </CardTitle>
                <CardDescription className="text-sm">
                  Create a new transaction below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper
                    form={form as any}
                    name={"senderMobile"}
                    label="Sender Mobile"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"receiverMobile"}
                    label="Receiver Mobile"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper
                    form={form as any}
                    name={"reference"}
                    label="Reference"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"selectBundle._id"}
                    label="Select Bundle"
                    fieldType="select"
                    data={bundleOptions}
                  />
                </div>

                {selectedBundle && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Bundle Details
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
                      <div>
                        <Label className="text-xs text-gray-600">Amount</Label>
                        <p className="text-sm font-medium">
                          {selectedBundle.amount}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Points</Label>
                        <p className="text-sm font-medium">
                          {selectedBundle.points}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">
                          Quantity
                        </Label>
                        <p className="text-sm font-medium">
                          {selectedBundle.quantity || "N/A"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">
                          Category
                        </Label>
                        <p className="text-sm font-medium">
                          {typeof selectedBundle.internetCategory ===
                            "object" && selectedBundle.internetCategory
                            ? (selectedBundle.internetCategory as any).name
                            : selectedBundle.internetCategory || "N/A"}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs text-gray-600">
                          Description
                        </Label>
                        <p className="text-sm font-medium">
                          {selectedBundle.description || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>Create Transaction</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});
