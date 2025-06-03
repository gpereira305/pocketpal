import type { DeleteDialogProps, TransactionTableProps } from "@/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { memo } from "react";

const TransactionsTable = memo((props: TransactionTableProps) => {
  const {
    sortedTransactions,
    deleteTransaction,
    sortColumn,
    sortOrder,
    toggleSortOrder,
    tabelheaderStyle,
    handleUppercase,
    handleConvertDate,
    convertToBRL,
    isExpense,
  } = props;

  return (
    <div className="w-full table-container border-none">
      <table className="min-w-full">
        <thead>
          <tr>
            <th
              className={tabelheaderStyle}
              onClick={() => toggleSortOrder("transactionDesc")}
            >
              Descrição{" "}
              {sortColumn === "transactionDesc"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className={tabelheaderStyle}
              onClick={() => toggleSortOrder("transactionValue")}
            >
              Valor{" "}
              {sortColumn === "transactionValue"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className={tabelheaderStyle}
              onClick={() => toggleSortOrder("transactionType")}
            >
              Tipo{" "}
              {sortColumn === "transactionType"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className={tabelheaderStyle}
              onClick={() => toggleSortOrder("transactionDate")}
            >
              Data{" "}
              {sortColumn === "transactionDate"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th className={`${tabelheaderStyle} text-right`}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions?.map(
            ({
              id,
              transactionDesc,
              transactionValue,
              transactionType,
              transactionDate,
            }) => (
              <tr
                key={id}
                className="border-b dark:border-gray-700 bg-white dark:bg-[#121214]"
              >
                <td className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                  {handleUppercase(transactionDesc)}
                </td>
                <td className="px-6 py-4 text-left text-sm text-gray-900 dark:text-gray-100">
                  <p
                    className={`${
                      isExpense(transactionType)
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {isExpense(transactionType) ? "-" : "+"}{" "}
                    {convertToBRL(transactionValue)}
                  </p>
                </td>
                <td className="px-6 py-4 text-left text-sm text-gray-900 dark:text-gray-100">
                  {handleUppercase(transactionType)}
                </td>
                <td className="px-6 py-4 text-left text-sm text-gray-900 dark:text-gray-100">
                  {handleConvertDate(transactionDate)}
                </td>
                <td className="px-6 py-4 text-left text-sm text-gray-900 dark:text-gray-100 flex justify-end  items-end">
                  <DeleteDialog id={id} deleteTransaction={deleteTransaction} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
});

TransactionsTable.displayName = "TransactionsTable";
export default TransactionsTable;
const DeleteDialog = ({ id, deleteTransaction }: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className=" bg-red-500 text-white px-2 py-1 cursor-pointer ml-auto"
          onClick={() => {}}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-14">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar esta transação?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-end sm:flex-row flex-col gap-2">
          <AlertDialogCancel className="bg-gray-500 text-white hover:bg-gray-600 cursor-pointer h-fit sm:w-fit rounded-sm px-6 py-3 w-full">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteTransaction.mutateAsync(id)}
            className="bg-red-500 text-white hover:bg-red-600 h-fit sm:w-fit cursor-pointer rounded-sm px-6 py-3 w-full"
          >
            Deletar transação
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
