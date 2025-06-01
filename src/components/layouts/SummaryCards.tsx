import { CircleArrowUp, CircleArrowDown, DollarSign } from "lucide-react";
import SummaryCard from "../shared/SummaryCard";
import TransactionModal from "../shared/TransactionModal";
import { useQuery } from "@tanstack/react-query";
import TableTransactions from "../shared/TableTransactions";
import type { Transactions } from "../../types";

export default function SummaryCards() {
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      fetch("http://localhost:3001/transactions").then(
        (res) => res.json() as Promise<Transactions[]>
      ),
  });

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
    transactions ? transactions : []
  );

  return (
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
        <TransactionModal />
      </div>

      <TableTransactions transactions={transactions} />
    </div>
  );
}
