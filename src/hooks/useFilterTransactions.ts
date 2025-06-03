import type { Transactions } from "@/types";
import { useState } from "react";

export default function useFilterTransactions(transactions: Transactions[]) {
  const [filterType, setFilterType] = useState<"all" | "receita" | "despesa">(
    "all"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] =
    useState<keyof Transactions>("transactionDate");

  const toggleSortOrder = (column: keyof Transactions) => {
    if (column === sortColumn) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedTransactions = transactions
    ?.filter((transaction) => {
      if (filterType === "all") return true;
      return transaction.transactionType === filterType;
    })
    .sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      } else if (sortColumn === "transactionDate") {
        const dateA =
          valueA &&
          typeof valueA === "object" &&
          (valueA as object) instanceof Date
            ? valueA
            : new Date(valueA as string);
        const dateB =
          valueB &&
          typeof valueB === "object" &&
          (valueB as object) instanceof Date
            ? valueB
            : new Date(valueB as string);
        return sortOrder === "asc"
          ? (dateA as Date).getTime() - (dateB as Date).getTime()
          : (dateB as Date).getTime() - (dateA as Date).getTime();
      } else if (sortColumn === "transactionType") {
        const typeOrder = { despesa: 1, receita: 2 };
        return sortOrder === "asc"
          ? typeOrder[valueA as "despesa" | "receita"] -
              typeOrder[valueB as "despesa" | "receita"]
          : typeOrder[valueB as "despesa" | "receita"] -
              typeOrder[valueA as "despesa" | "receita"];
      }
      return 0;
    });

  return {
    filterType,
    setFilterType,
    sortOrder,
    sortColumn,
    toggleSortOrder,
    sortedTransactions,
  };
}
