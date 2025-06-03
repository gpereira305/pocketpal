import { memo } from "react";
import { CircleArrowUp, CircleArrowDown, DollarSign } from "lucide-react";
import SummaryCard from "../shared/SummaryCard";
import TransactionsModal from "../shared/TransactionsModal";
import { useQuery } from "@tanstack/react-query";
import TransactionOperations from "../shared/TransactionOperations";
import type { Transactions } from "../../types";
import { axiosInstance } from "../../services/api";
import Loader from "../shared/Loader";

const Main = memo(() => {
  const {
    data: transactions,
    error,
    isLoading,
  } = useQuery<Transactions[]>({
    queryKey: ["transactions"],
    queryFn: () => axiosInstance.get("/transactions").then((res) => res.data),
  });

  if (error) return <div>Error loading transactions</div>;

  function calculateTransactions(transactions: Transactions[]) {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions?.forEach((transaction) => {
      if (transaction.transactionType === "receita") {
        totalIncome += transaction.transactionValue;
      } else {
        totalExpenses += transaction.transactionValue;
      }
    });

    return {
      totalIncome,
      totalExpenses,
    };
  }

  const { totalIncome, totalExpenses } = calculateTransactions(
    transactions || []
  );

  return (
    <main className="standard-container mt-10 h-full min-h-[calc(100vh-200px)]">
      {!isLoading ? (
        <div className="flex w-full flex-col items-center justify-between gap-4">
          <div className="grid w-[inherit] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
              title="Total de entradas"
              value={totalIncome}
              icon={<CircleArrowUp className="text-green-500" />}
            />
            <SummaryCard
              title="Total de saídas"
              value={totalExpenses}
              icon={<CircleArrowDown className="text-red-500" />}
            />
            <SummaryCard
              title="Saldo atual"
              value={totalIncome - totalExpenses}
              icon={<DollarSign className="text-blue-500" />}
            />
          </div>
          <div className="flex w-full items-center justify-end">
            <TransactionsModal />
          </div>

          <TransactionOperations transactions={transactions || []} />
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
});

Main.displayName = "Main";
export default Main;
