import { memo } from "react";
import type { Transactions } from "@/types";
import type { ReactNode } from "react";
import { convertToBRL } from "../../utils";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TransactionsTable from "./TransactionsTable";
import useFilterTransactions from "../../hooks/useFilterTransactions";

const TransactionOperations = memo(
  ({ transactions }: { transactions: Transactions[] }) => {
    const queryClient = new QueryClient();

    const {
      filterType,
      setFilterType,
      sortOrder,
      sortColumn,
      toggleSortOrder,
      sortedTransactions,
    } = useFilterTransactions(transactions);

    // Função para deletar uma transação
    const deleteTransaction = useMutation({
      mutationFn: (id: string) => {
        return axiosInstance.delete(`/transactions/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        toast.success("Transação cadastrada com sucesso!");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Erro ao cadastrar transação!");
      },
    });

    // Função para converter o valor para o formato BRL
    const handleUppercase = (value: string | number): ReactNode => {
      if (typeof value === "string") {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      return value;
    };

    // Função para converter a data para o formato "DD/MM/AAAA"
    const handleConvertDate = (dateString: string): string => {
      const date = new Date(dateString);
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    };

    const isExpense = (transactionType: string): boolean => {
      return transactionType === "despesa";
    };

    //STYLES
    const tabelheaderStyle = `px-6 py-4 text-left text-sm border-b dark:border-gray-700 bg-white dark:bg-[#121214] cursor-pointer uppercase`;

    return (
      <div className="w-full h-full mt-20">
        {transactions.length > 0 ? (
          <>
            <div className="flex justify-end mb-4 custom-select rounded-sm">
              <Select
                value={filterType}
                onValueChange={(value) =>
                  setFilterType(value as "all" | "receita" | "despesa")
                }
              >
                <SelectTrigger className="sm:w-[200px] w-full cursor-pointer">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent className="h-[inherit] ">
                  <SelectItem
                    className="cursor-pointer h-[inherit]"
                    value="all"
                  >
                    Todos
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer h-[inherit]"
                    value="receita"
                  >
                    Receita
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer h-[inherit]"
                    value="despesa"
                  >
                    Despesa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TransactionsTable
              sortedTransactions={sortedTransactions}
              deleteTransaction={deleteTransaction}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              toggleSortOrder={toggleSortOrder}
              tabelheaderStyle={tabelheaderStyle}
              handleUppercase={handleUppercase}
              handleConvertDate={handleConvertDate}
              convertToBRL={convertToBRL}
              isExpense={isExpense}
            />
          </>
        ) : (
          <section className="text-center pt-20">
            <h2 className="text-gray-500 text-2xl">
              Você não tem nenhuma transação cadastrada ainda
            </h2>
          </section>
        )}
      </div>
    );
  }
);

TransactionOperations.displayName = "TransactionOperations";
export default TransactionOperations;
