import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  User,
  FileText,
  Building,
  Users,
  Camera,
  IdCard,
  FileCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "@/routers/paths";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DriverView = observer(function DriverView() {
  const { id } = useParams<{ id: string }>();

  const {
    driversStore: { drivers },
  } = useStores();

  const driver = drivers.data?.find((driver) => driver.id == Number(id));

  if (!driver) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Document type labels
  const documentTypeLabels = {
    driver_id: "Driver ID",
    national_id: "National ID",
    passport: "Passport",
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <Link
          to={PATHS.Overview.drivers.root}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Drivers List
        </Link>
      </div>

      {/* Hero section with driver name and status */}
      <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-800 font-semibold text-xl">
                {driver.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {driver.name}
              </h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{driver.mobile_number}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{driver.current_location || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge className="bg-green-100 text-green-800">Active Driver</Badge>
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6 bg-muted/60">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="family">Family Information</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="location">Location & Status</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Info Card */}
            <Card className="md:col-span-2 overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <User className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </h3>
                    <p className="mt-1 text-base font-medium">{driver.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Mobile Number
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {driver.mobile_number}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Current Location
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {driver.current_location || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Origin Location
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {driver.origin_location || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Fingerprint Data
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {driver.fingerprint_data || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Driver ID
                    </h3>
                    <p className="mt-1 text-base font-medium">{driver.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Image Card */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Camera className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Driver Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {driver.image_url ? (
                  <div className="relative w-full rounded-md overflow-hidden border">
                    <img
                      src={driver.image_url}
                      alt={driver.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No photo available
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Family Information Tab */}
        <TabsContent value="family">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <Users className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Family Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father's Information */}
                <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">
                    Father's Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Father Name
                      </span>
                      <span className="font-semibold">
                        {driver.father_name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Father Contact
                      </span>
                      <span className="font-semibold">
                        {driver.father_contact || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mother's Information */}
                <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">
                    Mother's Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Mother Name
                      </span>
                      <span className="font-semibold">
                        {driver.mother_name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Mother Contact
                      </span>
                      <span className="font-semibold">
                        {driver.mother_contact || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Details */}
              <div className="mt-6">
                <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-700 mb-4">
                    Home & Settlement Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Settling Home Details
                      </span>
                      <p className="mt-2 font-semibold">
                        {driver.settling_home_details || "No details available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <FileText className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Document Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Document Type
                      </h3>
                      <p className="mt-1 text-base font-medium">
                        {driver.documentType
                          ? documentTypeLabels[
                              driver.documentType as keyof typeof documentTypeLabels
                            ]
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Document Number
                      </h3>
                      <p className="mt-1 text-base font-medium">
                        {driver.documentNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Document Upload
                    </h3>
                    {driver.documentUpload ? (
                      <div className="relative w-full rounded-md overflow-hidden border">
                        {driver.documentUpload.includes("pdf") ? (
                          <a
                            href={driver.documentUpload}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-40 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors cursor-pointer group"
                          >
                            <div className="text-center">
                              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                              <p className="text-blue-700 dark:text-blue-400 font-medium">
                                PDF Document
                              </p>
                              <p className="text-sm text-blue-600 dark:text-blue-500 mt-1">
                                Click to view
                              </p>
                            </div>
                          </a>
                        ) : (
                          <div className="h-40">
                            <img
                              src={driver.documentUpload}
                              alt="Document"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <div className="text-center">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 dark:text-gray-400">
                            No document uploaded
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Location & Status Tab */}
        <TabsContent value="location">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <MapPin className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Location & Status Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Current Location
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {driver.current_location || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Origin Location
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {driver.origin_location || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </h3>
                    <Badge className="mt-1 bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-64">
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-blue-900/20">
                    <div className="text-center">
                      <MapPin className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Location Map
                        <br />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {driver.current_location || "Location not specified"}
                        </span>
                      </p>
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
