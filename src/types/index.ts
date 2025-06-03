import React from "react";
export type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

export interface Transactions {
  id: string;
  transactionDesc: string;
  transactionValue: number;
  transactionType: string;
  transactionDate: string;
}

export interface TransactionTableProps {
  sortedTransactions: Transactions[];
  deleteTransaction: {
    mutateAsync: (id: string) => Promise<unknown>;
  };
  sortColumn: keyof Transactions;
  sortOrder: "asc" | "desc";
  toggleSortOrder: (column: keyof Transactions) => void;
  tabelheaderStyle: string;
  handleUppercase: (value: string | number) => React.ReactNode;
  handleConvertDate: (dateString: string) => string;
  convertToBRL: (value: number) => string;
  isExpense: (transactionType: string) => boolean;
}

export interface DeleteDialogProps {
  id: string;
  deleteTransaction: {
    mutateAsync: (id: string) => Promise<unknown>;
  };
}
