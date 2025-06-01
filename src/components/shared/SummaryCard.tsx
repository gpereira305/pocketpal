import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}
export default function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <Card className="min-h-[150px] justify-between gap-6 rounded-sm border-none bg-white p-6 shadow-lg sm:min-h-[180px] dark:bg-[#323238]">
      <CardHeader className="flex items-center justify-between px-0">
        <CardTitle>
          <h1 className="text-xl font-normal">{title}</h1>
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex items-center justify-between px-0">
        <p className="font-mormal mt-2 mb-0 text-3xl text-gray-800 sm:text-4xl dark:text-gray-200">
          R$ {value}
        </p>
      </CardContent>
    </Card>
  );
}
