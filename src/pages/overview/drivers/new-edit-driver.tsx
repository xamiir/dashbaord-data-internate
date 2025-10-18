import { LayoutDashboard, User2Icon } from "lucide-react";
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
import { get } from "lodash";
import { z } from "zod";
import FileUpload from "@/components/widgets/file-upload";

const driverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile_number: z.string().min(1, "Mobile number is required"),
  current_location: z.string().optional(),
  origin_location: z.string().optional(),
  father_name: z.string().optional(),
  father_contact: z.string().optional(),
  mother_name: z.string().optional(),
  mother_contact: z.string().optional(),
  settling_home_details: z.string().optional(),
  fingerprint_data: z.string().optional(),
  image_url: z.string().optional(),
  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
  documentUpload: z.string().optional(),
});

type ZodDriver = z.infer<typeof driverSchema>;

export const NewEditDriver = observer(function NewEditDriver() {
  const {
    driversStore: { createDriver, status, drivers, updateDriver, getDrivers },
  } = useStores();

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const navigate = useNavigate();
  const id = get(params, "id", "");

  const currentDriver = drivers.data?.find((driver) => driver.id == Number(id));

  const form = useForm<ZodDriver>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: currentDriver?.name || "",
      mobile_number: currentDriver?.mobile_number || "",
      current_location: currentDriver?.current_location || "",
      origin_location: currentDriver?.origin_location || "",
      father_name: currentDriver?.father_name || "",
      father_contact: currentDriver?.father_contact || "",
      mother_name: currentDriver?.mother_name || "",
      mother_contact: currentDriver?.mother_contact || "",
      settling_home_details: currentDriver?.settling_home_details || "",
      fingerprint_data: currentDriver?.fingerprint_data || "",
      image_url: currentDriver?.image_url || "",
      documentType: currentDriver?.documentType || "",
      documentNumber: currentDriver?.documentNumber || "",
      documentUpload: currentDriver?.documentUpload || "",
    },
  });

  const handleSubmit = async (values: ZodDriver) => {
    try {
      if (isEdit) {
        await updateDriver(Number(id), {
          name: values.name,
          mobile_number: values.mobile_number,
          current_location: values.current_location,
          origin_location: values.origin_location,
          father_name: values.father_name,
          father_contact: values.father_contact,
          mother_name: values.mother_name,
          mother_contact: values.mother_contact,
          settling_home_details: values.settling_home_details,
          fingerprint_data: values.fingerprint_data,
          image_url: values.image_url,
          documentType: values.documentType,
          documentNumber: values.documentNumber,
          documentUpload: values.documentUpload,
        });
        toast.success("Driver updated successfully");
        navigate(PATHS.Overview.drivers.root);
        return;
      }

      await createDriver({
        name: values.name,
        mobile_number: values.mobile_number,
        current_location: values.current_location,
        origin_location: values.origin_location,
        father_name: values.father_name,
        father_contact: values.father_contact,
        mother_name: values.mother_name,
        mother_contact: values.mother_contact,
        settling_home_details: values.settling_home_details,
        fingerprint_data: values.fingerprint_data,
        image_url: values.image_url,
        documentType: values.documentType,
        documentNumber: values.documentNumber,
        documentUpload: values.documentUpload,
      });
      await getDrivers({ page: 1, limit: 10 });
      toast.success("Driver created successfully");
      navigate(PATHS.Overview.drivers.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save driver");
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
            label: "Drivers",
            href: PATHS.Overview.drivers.root,
            icon: <User2Icon className="h-4 w-4" />,
          },
          {
            label: isEdit ? "Edit Driver" : "New Driver",
            disabled: true,
            icon: <User2Icon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {isEdit ? "Edit Driver" : "New Driver"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isEdit
                    ? "Edit driver details below."
                    : "Add a new driver by filling in the details below."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper form={form as any} name={"name"} label="Name" />
                  <FormWrapper
                    form={form as any}
                    name={"mobile_number"}
                    label="Mobile Number"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"current_location"}
                    label="Current Location"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"origin_location"}
                    label="Origin Location"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"father_name"}
                    label="Father Name"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"father_contact"}
                    label="Father Contact"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"mother_name"}
                    label="Mother Name"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"mother_contact"}
                    label="Mother Contact"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"settling_home_details"}
                    label="Settling Home Details"
                  />
                  <FormWrapper
                    form={form as any}
                    name={"fingerprint_data"}
                    label="Fingerprint Data"
                  />
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">
                      Driver Image
                    </label>
                    <FileUpload
                      form={form as any}
                      name="image_url"
                      multiple={false}
                      maxFiles={1}
                    />
                  </div>

                  <FormWrapper
                    form={form as any}
                    name={"documentType"}
                    label="Document Type"
                    fieldType="select"
                    data={[
                      { value: "driver_id", label: "Driver ID" },
                      { value: "national_id", label: "National ID" },
                      { value: "passport", label: "Passport" },
                    ]}
                  />

                  <FormWrapper
                    form={form as any}
                    name={"documentNumber"}
                    label="Document Number"
                  />

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">
                      Document Upload
                    </label>
                    <FileUpload
                      form={form as any}
                      name="documentUpload"
                      multiple={false}
                      maxFiles={1}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>{isEdit ? "Update Driver" : "Save Driver"}</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});
