import { LayoutDashboard, BikeIcon } from "lucide-react";
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
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { get } from "lodash";
import { z } from "zod";

const motorcycleSchema = z.object({
  plate_number: z.string().min(1, "Plate number is required"),
  chassis_number: z.string().min(1, "Chassis number is required"),
});

type ZodMotorcycle = z.infer<typeof motorcycleSchema>;

export const EditMotorcycle = observer(function EditMotorcycle() {
  const {
    motorcyclesStore: { updateMotorcycle, status, motorcycles },
  } = useStores();

  const params = useParams();
  const navigate = useNavigate();
  const id = get(params, "id", "");

  const currentMotorcycle = motorcycles.data?.find((m) => m.id == Number(id));

  const form = useForm<ZodMotorcycle>({
    resolver: zodResolver(motorcycleSchema),
    defaultValues: {
      plate_number: currentMotorcycle?.plate_number || "",
      chassis_number: currentMotorcycle?.chassis_number || "",
    },
  });

  const handleSubmit = async (values: ZodMotorcycle) => {
    try {
      await updateMotorcycle(Number(id), {
        plate_number: values.plate_number,
        chassis_number: values.chassis_number,
      });
      toast.success("Motorcycle updated successfully");
      navigate(PATHS.Overview.motorcycles.root);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update motorcycle");
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
            label: "Motorcycles",
            href: PATHS.Overview.motorcycles.root,
            icon: <BikeIcon className="h-4 w-4" />,
          },
          {
            label: "Edit Motorcycle",
            disabled: true,
            icon: <BikeIcon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Edit Motorcycle
                </CardTitle>
                <CardDescription className="text-sm">
                  Edit motorcycle details below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormWrapper
                    form={form}
                    name={"plate_number"}
                    label="Plate Number"
                  />
                  <FormWrapper
                    form={form}
                    name={"chassis_number"}
                    label="Chassis Number"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="flex items-center space-x-2"
                >
                  <span>Update Motorcycle</span>
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
});
