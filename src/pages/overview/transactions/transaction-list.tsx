import { transactionColumns } from "@/components/columns/transaction-columns";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Breadcrumb, DataTable } from "@/components/widgets";
import { PATHS } from "@/routers/paths";
import { LayoutDashboard, Receipt, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import useIsMountedRef from "@/hooks/use-is-mounted";
import { useStores } from "@/models/helpers";
import { Config } from "@/config";
import { observer } from "mobx-react-lite";
import { CreateButton } from "@/components/authorized-buttons";

export const TransactionList = observer(function TransactionList() {
  const {
    transactionStore: { getTransactions, transactions },
  } = useStores();

  const isMounted = useIsMountedRef();

  useEffect(() => {
    if (isMounted.current) {
      getTransactions({
        page: Config.DEFAULT_PAGE,
        limit: Config.DEFAULT_PAGE_LIMIT,
      });
    }
  }, [isMounted]);

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
            disabled: true,
            icon: <Receipt className="h-4 w-4" />,
          },
        ]}
      />

      <div className="my-8">
        <div className="flex justify-between">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Manage transactions in your application
            </CardDescription>
          </div>
          <div>
            <CreateButton
              to={PATHS.Overview.transactions.new}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add New Transaction</span>
            </CreateButton>
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            data={transactions.data || []}
            columns={transactionColumns}
            onPageChange={() => {}}
            currentPage={transactions.current_page}
            totalPages={transactions.total_pages}
          />
        </div>
      </div>
    </>
  );
});
