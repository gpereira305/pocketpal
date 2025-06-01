import { CircleArrowUp, CircleArrowDown, DollarSign } from "lucide-react";
import SummaryCard from "../shared/SummaryCard";
import TransactionModal from "../shared/TransactionModal";
import { useQuery } from "@tanstack/react-query";

export default function SummaryCards() {
  const {
    isPending,
    isError,
    data: transactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      fetch("http://localhost:3001/transactions").then((res) => res.json()),
  });

  console.log(transactions);

  const cardsData = [
    {
      title: "Total de entradas",
      value: 100.0,
      icon: <CircleArrowUp className="text-green-500" />,
    },
    {
      title: "Total de saídas",
      value: 100.0,
      icon: <CircleArrowDown className="text-red-500" />,
    },
    {
      title: "Saldo atual",
      value: 100.0,
      icon: <DollarSign className="text-blue-500" />,
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4">
      <div className="grid w-[inherit] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cardsData.map(({ title, value, icon }, index) => (
          <SummaryCard key={index} title={title} value={value} icon={icon} />
        ))}
      </div>
      <div className="flex w-full items-center justify-end">
        <TransactionModal />
      </div>
    </div>
  );
}
