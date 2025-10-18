import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  Bike,
  FileText,
  Building,
  Camera,
  IdCard,
  FileCheck,
  User,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "@/routers/paths";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MotorcycleView = observer(function MotorcycleView() {
  const { id } = useParams<{ id: string }>();

  const {
    motorcyclesStore: { motorcycles },
  } = useStores();

  const motorcycle = motorcycles.data?.find(
    (motorcycle) => motorcycle.id == Number(id)
  );

  if (!motorcycle) {
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
          to={PATHS.Overview.motorcycles.root}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Motorcycles List
        </Link>
      </div>

      {/* Hero section with motorcycle details */}
      <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
              <Bike className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {motorcycle.plate_number}
              </h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <IdCard className="h-4 w-4 mr-1" />
                  <span>Chassis: {motorcycle.chassis_number}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Owner ID: {motorcycle.owner_id || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge className="bg-green-100 text-green-800">
              Active Motorcycle
            </Badge>
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6 bg-muted/60">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Info Card */}
            <Card className="md:col-span-2 overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Bike className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Motorcycle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Plate Number
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {motorcycle.plate_number}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Chassis Number
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {motorcycle.chassis_number}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Owner ID
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {motorcycle.owner_id || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {motorcycle.motorcycle_category || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Motorcycle ID
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {motorcycle.id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Motorcycle Image Card */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Camera className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Motorcycle Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {motorcycle.motorcycle_image_url ? (
                  <div className="relative w-full rounded-md overflow-hidden border">
                    <img
                      src={motorcycle.motorcycle_image_url}
                      alt={motorcycle.plate_number}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <div className="text-center">
                      <Bike className="h-12 w-12 text-gray-400 mx-auto mb-2" />
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

        {/* Registration Tab */}
        <TabsContent value="registration">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <FileCheck className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Registration Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Registration Date
                    </h3>
                    <p className="mt-1 text-base font-medium">
                      {motorcycle.registration_date
                        ? new Date(
                            motorcycle.registration_date
                          ).toLocaleDateString()
                        : "Not registered"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Registration Status
                    </h3>
                    <div className="mt-1">
                      {motorcycle.registration_date ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Registered
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Not Registered
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Registration Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Plate Number
                      </span>
                      <span className="font-semibold">
                        {motorcycle.plate_number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Chassis Number
                      </span>
                      <span className="font-semibold">
                        {motorcycle.chassis_number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Category
                      </span>
                      <span className="font-semibold">
                        {motorcycle.motorcycle_category || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Owner ID
                      </span>
                      <span className="font-semibold">
                        {motorcycle.owner_id || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images">
          <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Camera className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Motorcycle Images
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Motorcycle Image
                    </h3>
                    {motorcycle.motorcycle_image_url ? (
                      <div className="relative w-full rounded-md overflow-hidden border">
                        <img
                          src={motorcycle.motorcycle_image_url}
                          alt={motorcycle.plate_number}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                          <p className="text-sm font-medium">
                            {motorcycle.plate_number}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-md border-2 border-dashed">
                        <div className="text-center">
                          <Bike className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">
                            No motorcycle image available
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Image Details
                      </h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Status
                          </span>
                          <span className="font-semibold">
                            {motorcycle.motorcycle_image_url
                              ? "Available"
                              : "Not Available"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Plate Number
                          </span>
                          <span className="font-semibold">
                            {motorcycle.plate_number}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Category
                          </span>
                          <span className="font-semibold">
                            {motorcycle.motorcycle_category || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                        Image Guidelines
                      </h4>
                      <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                        <li>• Clear front view of motorcycle</li>
                        <li>• Include license plate</li>
                        <li>• Good lighting and focus</li>
                        <li>• JPG or PNG format preferred</li>
                      </ul>
                    </div>
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
