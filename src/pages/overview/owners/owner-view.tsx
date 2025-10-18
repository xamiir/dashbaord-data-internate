import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  User,
  FileText,
  Building,
  Bike,
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

export const OwnerView = observer(function OwnerView() {
  const { id } = useParams<{ id: string }>();

  const {
    ownersStore: { owners },
  } = useStores();

  const owner = owners.data?.find((owner) => owner.id == Number(id));

  if (!owner) {
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
          to={PATHS.Overview.owners.root}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Owners List
        </Link>
      </div>

      {/* Hero section with owner name and status */}
      <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-800 font-semibold text-xl">
                {owner.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {owner.name}
              </h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{owner.mobile_number}</span>
                </div>
                <div className="flex items-center">
                  <Bike className="h-4 w-4 mr-1" />
                  <span>{owner.motorcycles?.length || 0} Motorcycles</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge className="bg-green-100 text-green-800">Active Owner</Badge>
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6 bg-muted/60">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="motorcycles">Motorcycles</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Info Card */}
            <Card className="md:col-span-2 overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <User className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </h3>
                    <p className="mt-1 text-base font-medium">{owner.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Mobile Number
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {owner.mobile_number}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Owner ID
                    </h3>
                    <p className="mt-1 text-base font-medium">{owner.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Motorcycles
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {owner.motorcycles?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Image Card */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Camera className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Owner Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {owner.image_url ? (
                  <div className="relative w-full rounded-md overflow-hidden border">
                    <img
                      src={owner.image_url}
                      alt={owner.name}
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

        {/* Motorcycles Tab */}
        <TabsContent value="motorcycles">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <Bike className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Motorcycle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {owner.motorcycles && owner.motorcycles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {owner.motorcycles.map((motorcycle, index) => (
                    <Card key={motorcycle.id} className="border shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <Bike className="mr-2 h-4 w-4" />
                          Motorcycle {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Plate Number
                          </h4>
                          <p className="text-base font-medium">
                            {motorcycle.plate_number}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Chassis Number
                          </h4>
                          <p className="text-base font-medium">
                            {motorcycle.chassis_number}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Category
                          </h4>
                          <p className="text-base font-medium">
                            {motorcycle.motorcycle_category || "N/A"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Registration Date
                          </h4>
                          <p className="text-base font-medium">
                            {motorcycle.registration_date
                              ? new Date(
                                  motorcycle.registration_date
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                        {motorcycle.motorcycle_image_url && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                              Motorcycle Image
                            </h4>
                            <img
                              src={motorcycle.motorcycle_image_url}
                              alt={`Motorcycle ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <Bike className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No motorcycles registered
                    </p>
                  </div>
                </div>
              )}
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
                        {owner.documentType
                          ? documentTypeLabels[
                              owner.documentType as keyof typeof documentTypeLabels
                            ]
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Document Number
                      </h3>
                      <p className="mt-1 text-base font-medium">
                        {owner.documentNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Document Upload
                    </h3>
                    {owner.documentUpload ? (
                      <div className="relative w-full rounded-md overflow-hidden border">
                        {owner.documentUpload.includes("pdf") ? (
                          <a
                            href={owner.documentUpload}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-40 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors cursor-pointer group"
                          >
                            <div className="text-center">
                              <FileText className="h-12 w-12 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                              <p className="text-green-700 dark:text-green-400 font-medium">
                                PDF Document
                              </p>
                              <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                                Click to view
                              </p>
                            </div>
                          </a>
                        ) : (
                          <div className="h-40">
                            <img
                              src={owner.documentUpload}
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
      </Tabs>
    </div>
  );
});
