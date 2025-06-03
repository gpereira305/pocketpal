import { convertToBRL } from "../../utils";
import type { SummaryCardProps } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { ReactElement } from "react";

export default function SummaryCard({
  title,
  value,
  icon,
}: SummaryCardProps & { icon?: ReactElement }) {
  const getIcon = () => {
    if (value > 0 && title === "Total de entradas") {
      return "+";
    } else if (value > 0 && title === "Total de saídas") {
      return "-";
    } else {
      return "";
    }
  };

  return (
    <Card className="min-h-[150px] justify-between gap-6 rounded-sm border-none bg-white p-6 shadow-lg sm:min-h-[180px] dark:bg-[#121214]">
      <CardHeader className="flex items-center justify-between px-0">
        <CardTitle>
          <h2 className="text-xl font-normal">{title}</h2>
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex items-center justify-between px-0">
        <h3
          className={`font-mormal mt-2 mb-0 text-3xl ${
            (icon?.props as { className?: string })?.className || ""
          }`}
        >
          {getIcon()} {convertToBRL(value)}
        </h3>
      </CardContent>
    </Card>
  );
}
