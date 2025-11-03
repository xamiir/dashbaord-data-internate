import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, Receipt, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const TransactionView = observer(function TransactionView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { transactionStore } = useStores();
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Find transaction from existing data or fetch individual transaction
      const existingTransaction = transactionStore.transactions.data?.find(
        (t: any) => t._id === id || t.id === id
      );
      if (existingTransaction) {
        setTransaction(existingTransaction);
      } else {
        // If not found in current data, try to fetch transactions first
        transactionStore.getTransactions({ page: 1, limit: 100 }).then(() => {
          const foundTransaction = transactionStore.transactions.data?.find(
            (t: any) => t._id === id || t.id === id
          );
          if (foundTransaction) {
            setTransaction(foundTransaction);
          }
        });
      }
    }
  }, [id, transactionStore]);

  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Receipt className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Transaction not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The transaction you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate(PATHS.Overview.transactions.root)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Transactions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
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
            label: "Transactions",
            href: PATHS.Overview.transactions.root,
            icon: <Receipt className="h-4 w-4" />,
          },
          {
            label: `Transaction ${transaction.txId}`,
            disabled: true,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Transaction Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Transaction ID: {transaction.txId}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(PATHS.Overview.transactions.root)}
            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transactions
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Transaction Information */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Receipt className="h-5 w-5" />
                Transaction Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </label>
                  <p className="text-sm font-mono">{transaction.txId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      className={`capitalize ${
                        statusColors[
                          transaction.status as keyof typeof statusColors
                        ] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {transaction.status || "pending"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Amount
                  </label>
                  <p className="text-lg font-semibold">${transaction.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Network
                  </label>
                  <p className="text-sm">{transaction.network}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Category
                  </label>
                  <p className="text-sm">{transaction.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bundle
                  </label>
                  <p className="text-sm">{transaction.bundleLabel}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Sender Mobile
                  </label>
                  <p className="text-sm font-mono">
                    {transaction.senderMobile}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Receiver Mobile
                  </label>
                  <p className="text-sm font-mono">
                    {transaction.receiverMobile}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Gateway ID
                  </label>
                  <p className="text-sm font-mono">{transaction.gatewayId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    SIM Slot
                  </label>
                  <p className="text-sm">{transaction.simSlot}</p>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  USSD Code
                </label>
                <p className="text-sm font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded text-gray-900 dark:text-gray-100">
                  {transaction.ussd}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Created At
                  </label>
                  <p className="text-sm">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Updated At
                  </label>
                  <p className="text-sm">
                    {new Date(transaction.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gateway Response */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Gateway Response
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Detailed response from the payment gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transaction.gatewayResponse ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Type
                      </label>
                      <p className="text-sm capitalize">
                        {transaction.gatewayResponse.type}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Transaction ID
                      </label>
                      <p className="text-sm font-mono">
                        {transaction.gatewayResponse.txId}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      USSD Code
                    </label>
                    <p className="text-sm font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded text-gray-900 dark:text-gray-100">
                      {transaction.gatewayResponse.ussd}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Response
                    </label>
                    <p className="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded border-l-4 border-red-500 text-gray-900 dark:text-gray-100">
                      {transaction.gatewayResponse.response}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Timestamp
                    </label>
                    <p className="text-sm">
                      {new Date(
                        transaction.gatewayResponse.timestamp
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No gateway response available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Subscription ID
                </label>
                <p className="text-sm">{transaction.subscriptionId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Notified
                </label>
                <Badge variant={transaction.notified ? "default" : "secondary"}>
                  {transaction.notified ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Version
                </label>
                <p className="text-sm">{transaction.__v}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  MongoDB ID
                </label>
                <p className="text-sm font-mono">{transaction._id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
});
