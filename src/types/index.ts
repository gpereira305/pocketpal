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
