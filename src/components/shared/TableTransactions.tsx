import type { Transactions } from "@/types";
import type { ReactNode } from "react";
import { convertToBRL } from "../../utils";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

export default function TableTransactions({
  transactions,
  onRemove,
}: {
  transactions: Transactions[];
  onRemove: (id: string) => void;
}) {
  const queryClient = new QueryClient();

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

  const handleUppercase = (value: string | number): ReactNode => {
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };

  const handleConvertDate = (dateString: string): string => {
    const date = new Date(dateString);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const isExpense = (transactionType: string): boolean => {
    return transactionType === "despesa";
  };

  const sortedTransactions = transactions?.sort((a, b) => {
    return (
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime()
    );
  });

  return (
    <div className="w-full table-container border-none">
      <table className="min-w-full">
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
                className="border-b dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <td
                  className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100"
                  width="50%"
                >
                  {transactionDesc}
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
                <td className="px-6 py-4 text-left text-sm text-gray-900 dark:text-gray-100 flex justify-end">
                  <DeleteDialog id={id} deleteTransaction={deleteTransaction} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

const DeleteDialog = ({ id, deleteTransaction }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="mr-2 bg-red-500 text-white px-2 py-1 cursor-pointer"
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
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-500 text-white hover:bg-gray-600 cursor-pointer h-fit w-fit rounded-sm px-6 py-3">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteTransaction.mutateAsync(id)}
            className="bg-red-500 text-white hover:bg-red-600 h-fit w-fit cursor-pointer rounded-sm px-6 py-3"
          >
            Deletar transação
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
