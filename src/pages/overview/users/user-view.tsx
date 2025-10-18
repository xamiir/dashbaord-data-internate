import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  User,
  FileText,
  Building,
  Mail,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "@/routers/paths";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const UserView = observer(function UserView() {
  const { id } = useParams<{ id: string }>();

  const {
    usersStore: { users },
  } = useStores();

  const user = users.data?.find((user) => user.id == Number(id));

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <Link
          to={PATHS.Overview.users.root}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users List
        </Link>
      </div>

      {/* Hero section with user name and status */}
      <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-800 font-semibold text-xl">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {user.name}
              </h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
            <Badge className="bg-green-100 text-green-800">
              {user.status || "Active"}
            </Badge>
            {user.is_email_verified && (
              <Badge className="bg-blue-100 text-blue-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Email Verified
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6 bg-muted/60">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Info Card */}
            <Card className="md:col-span-2 overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <User className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </h3>
                    <p className="mt-1 text-base font-medium">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email Address
                    </h3>
                    <p className="mt-1 text-base font-medium">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone Number
                    </h3>
                    <p className="mt-1 text-base font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {user.status || "Active"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      User ID
                    </h3>
                    <p className="mt-1 text-base font-medium">{user.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Created At
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Updated At
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {new Date(user.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Avatar Card */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <User className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  User Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <div className="text-center">
                    <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-800 font-semibold text-2xl">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {user.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <Shield className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Security Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email Verification
                    </h3>
                    <div className="mt-1 flex items-center">
                      {user.is_email_verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          Not Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      2FA Status
                    </h3>
                    <div className="mt-1 flex items-center">
                      {user.is_2fa_enabled ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Enabled
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">
                          Disabled
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Security Recommendations
                  </h3>
                  <div className="space-y-3">
                    {!user.is_email_verified && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        </div>
                        <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                          Email verification is recommended for account security
                        </p>
                      </div>
                    )}
                    {!user.is_2fa_enabled && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        </div>
                        <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                          Two-factor authentication is recommended for enhanced
                          security
                        </p>
                      </div>
                    )}
                    {user.is_email_verified && user.is_2fa_enabled && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        </div>
                        <p className="ml-3 text-sm text-green-600 dark:text-green-400">
                          Account security is properly configured
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <FileText className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Account Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Account Created
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {new Date(user.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Last Updated
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {new Date(user.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Account Created
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Last Updated
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.updated_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});
