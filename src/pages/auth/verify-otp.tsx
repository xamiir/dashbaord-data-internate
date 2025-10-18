import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Assets from "@/assets";
import toast from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { PATHS } from "@/routers/paths";

export const VerifyOTP = observer(function VerifyOTP() {
  const {
    authStore: { verifyOTP, status },
  } = useStores();
  const navigate = useNavigate();

  const formSchema = z.object({
    otp: z
      .string({
        required_error: "Password is required",
      })
      .min(6),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      toast.error("Username not found");

      navigate("/auth/login");

      return;
    }
  }, [navigate]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const username = localStorage.getItem("username");

    if (!username) {
      toast.error("Username not found");
      return;
    }

    try {
      await verifyOTP(username, values.otp);
      navigate(PATHS.Overview.root);
    } catch (error) {
      const err = error as Error;
      toast.error(
        err.message || "Failed to submit the form. Please try again."
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <img
              src={Assets.logo}
              alt="logo"
              className="h-20 w-20 rounded-sm"
            />
          </div>
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Verify OTP to continue
              </CardTitle>
              <CardDescription>
                Enter the OTP sent to your Email{" "}
                {localStorage.getItem("username")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full gap-2 items-center place-content-center">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the 6-digit OTP sented</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="w-full">
                            <InputOTPSlot index={0} className="w-full h-14" />
                            <InputOTPSlot index={1} className="w-full h-14" />
                            <InputOTPSlot index={2} className="w-full h-14" />
                            <InputOTPSlot index={3} className="w-full h-14" />
                            <InputOTPSlot index={4} className="w-full h-14" />
                            <InputOTPSlot index={5} className="w-full h-14" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button
                loading={status === "pending"}
                type="submit"
                className="w-full"
              >
                Verify
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
});
