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
import { useEffect, useState } from "react";
import { get } from "lodash";
import { z } from "zod";
import { PlusIcon, TrashIcon } from "lucide-react";
import FileUpload from "@/components/widgets/file-upload";

const ownerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile_number: z.string().min(1, "Mobile number is required"),
  motorcycles: z
    .array(
      z.object({
        plate_number: z.string().min(1, "Plate number is required"),
        chassis_number: z.string().min(1, "Chassis number is required"),
        motorcycle_category: z.string().optional(),
        registration_date: z.string().optional(),
        motorcycle_image_url: z.string().optional(),
      })
    )
    .min(1, "At least one motorcycle is required"),
  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
  documentUpload: z.string().optional(),
});

type ZodOwner = z.infer<typeof ownerSchema>;

export const NewEditOwner = observer(function NewEditOwner() {
  const {
    ownersStore: { createOwner, status, owners, updateOwner, getOwners },
  } = useStores();

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const params = useParams();
  const navigate = useNavigate();
  const id = get(params, "id", "");

  const currentOwner = owners.data?.find((owner) => owner.id == Number(id));

  const [motorcycles, setMotorcycles] = useState(
    currentOwner?.motorcycles?.map((m) => ({
      plate_number: m.plate_number,
      chassis_number: m.chassis_number,
      motorcycle_category: m.motorcycle_category || "",
      registration_date: m.registration_date || "",
      motorcycle_image_url: m.motorcycle_image_url || "",
    })) || [
      {
        plate_number: "",
        chassis_number: "",
        motorcycle_category: "",
        registration_date: "",
        motorcycle_image_url: "",
      },
    ]
  );

  const form = useForm<ZodOwner>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      name: currentOwner?.name || "",
      mobile_number: currentOwner?.mobile_number || "",
      motorcycles: currentOwner?.motorcycles?.map((m) => ({
        plate_number: m.plate_number,
        chassis_number: m.chassis_number,
        motorcycle_category: m.motorcycle_category || "",
        registration_date: m.registration_date || "",
        motorcycle_image_url: m.motorcycle_image_url || "",
      })) || [
        {
          plate_number: "",
          chassis_number: "",
          motorcycle_category: "",
          registration_date: "",
          motorcycle_image_url: "",
        },
      ],
      documentType: currentOwner?.documentType || "",
      documentNumber: currentOwner?.documentNumber || "",
      documentUpload: currentOwner?.documentUpload || "",
    },
  });

  const addMotorcycle = () => {
    setMotorcycles([
      ...motorcycles,
      {
        plate_number: "",
        chassis_number: "",
        motorcycle_category: "",
        registration_date: "",
        motorcycle_image_url: "",
      },
    ]);
  };

  const removeMotorcycle = (index: number) => {
    if (motorcycles.length > 1) {
      setMotorcycles(motorcycles.filter((_, i) => i !== index));
    }
  };

  const updateMotorcycle = (index: number, field: string, value: string) => {
    const updated = motorcycles.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    setMotorcycles(updated);
  };

  useEffect(() => {
    form.setValue("motorcycles", motorcycles);
  }, [motorcycles, form]);

  const handleSubmit = async (values: ZodOwner) => {
    try {
      if (isEdit) {
        await updateOwner(Number(id), {
          name: values.name,
          mobile_number: values.mobile_number,
          motorcycles: values.motorcycles,
          documentType: values.documentType,
          documentNumber: values.documentNumber,
          documentUpload: values.documentUpload,
        });
        toast.success("Owner updated successfully");
        navigate(PATHS.Overview.owners.root);
        return;
      }

      await createOwner({
        name: values.name,
        mobile_number: values.mobile_number,
        motorcycles: values.motorcycles,
        documentType: values.documentType,
        documentNumber: values.documentNumber,
        documentUpload: values.documentUpload,
      });
      await getOwners({ page: 1, limit: 10 });
      toast.success("Owner created successfully");
      navigate(PATHS.Overview.owners.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save owner");
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
            label: "Owners",
            href: PATHS.Overview.owners.root,
            icon: <User2Icon className="h-4 w-4" />,
          },
          {
            label: isEdit ? "Edit Owner" : "New Owner",
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
                  {isEdit ? "Edit Owner" : "New Owner"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isEdit
                    ? "Edit owner and motorcycle details below."
                    : "Add a new owner with motorcycle details below."}
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

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

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Motorcycles</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addMotorcycle}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Motorcycle
                    </Button>
                  </div>

                  {motorcycles.map((motorcycle, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Motorcycle {index + 1}</h4>
                        {motorcycles.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeMotorcycle(index)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">
                            Plate Number
                          </label>
                          <input
                            type="text"
                            value={motorcycle.plate_number}
                            onChange={(e) =>
                              updateMotorcycle(
                                index,
                                "plate_number",
                                e.target.value
                              )
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter plate number"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">
                            Chassis Number
                          </label>
                          <input
                            type="text"
                            value={motorcycle.chassis_number}
                            onChange={(e) =>
                              updateMotorcycle(
                                index,
                                "chassis_number",
                                e.target.value
                              )
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter chassis number"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">
                            Category
                          </label>
                          <input
                            type="text"
                            value={motorcycle.motorcycle_category}
                            onChange={(e) =>
                              updateMotorcycle(
                                index,
                                "motorcycle_category",
                                e.target.value
                              )
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter motorcycle category"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">
                            Registration Date
                          </label>
                          <input
                            type="date"
                            value={motorcycle.registration_date}
                            onChange={(e) =>
                              updateMotorcycle(
                                index,
                                "registration_date",
                                e.target.value
                              )
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm font-medium mb-2 block">
                            Motorcycle Image
                          </label>
                          <FileUpload
                            form={form as any}
                            name={`motorcycles.${index}.motorcycle_image_url`}
                            multiple={false}
                            maxFiles={1}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>{isEdit ? "Update Owner" : "Save Owner"}</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});
