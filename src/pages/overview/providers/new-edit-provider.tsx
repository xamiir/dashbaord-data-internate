import { LayoutDashboard, Shield } from "lucide-react";
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

const providerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
});

type ZodProvider = z.infer<typeof providerSchema>;

export const NewEditProvider = observer(function NewEditProvider() {
  const {
    providersStore: {
      createProvider,
      status,
      providers,
      updateProvider,
      getProviders,
    },
  } = useStores();

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const navigate = useNavigate();
  const id = get(params, "id", "");

  const currentProvider = providers.data?.find(
    (provider) => provider._id === id
  );

  const form = useForm<ZodProvider>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: currentProvider?.name || "",
      image: currentProvider?.image || "",
    },
  });

  const handleSubmit = async (values: ZodProvider) => {
    try {
      if (isEdit) {
        await updateProvider(id, {
          name: values.name,
          image: values.image,
        });
        toast.success("Provider updated successfully");
        navigate(PATHS.Overview.providers.root);
        return;
      }

      await createProvider({
        name: values.name,
        image: values.image,
      });
      await getProviders({ page: 1, limit: 10 });
      toast.success("Provider created successfully");
      navigate(PATHS.Overview.providers.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save provider");
    }
  };

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
            href: PATHS.Overview.providers.root,
            icon: <Shield className="h-4 w-4" />,
          },
          {
            label: isEdit ? "Edit Provider" : "New Provider",
            disabled: true,
            icon: <Shield className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {isEdit ? "Edit Provider" : "New Provider"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isEdit
                    ? "Edit provider details below."
                    : "Add a new provider below."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper form={form as any} name={"name"} label="Name" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Provider Image
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
                  <span>{isEdit ? "Update Provider" : "Save Provider"}</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});
