import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import Assets from "@/assets";
import { PATHS } from "@/routers/paths";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export const Login = observer(function LoginPage() {
  const {
    authStore: { login, status },
  } = useStores();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await login(values.email, values.password);
      if (res) {
        toast.success("Logged in successfully");
        navigate(PATHS.Overview.root);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(
        err.message || "Failed to submit the form. Please try again."
      );
    }
  }

  return (
    <div className="flex flex-col min-h-[50vh] h-[90vh] w-full items-center justify-center px-4">
      <div className="flex justify-center mb-4">
        <img src={Assets.logo} alt="logo" className="h-20 w-20 rounded-sm" />
      </div>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  loading={status === "pending"}
                  className="w-full"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
});
