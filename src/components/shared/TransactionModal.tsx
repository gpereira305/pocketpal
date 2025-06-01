import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CircleArrowUp, CircleArrowDown, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function TransactionModal() {
  const [newTransaction, setNewTransaction] = useState({
    transaction: "",
    value: "",
    date: undefined as Date | undefined,
    type: "" as "receita" | "despesa" | "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);

  const isFormValid = () => {
    return (
      newTransaction.transaction.trim() !== "" &&
      newTransaction.value.trim() !== "" &&
      newTransaction.date !== undefined &&
      newTransaction.type !== ""
    );
  };

  const handleTransactionType = (type: "receita" | "despesa") => {
    setNewTransaction((prevState) => ({
      ...prevState,
      type: type,
    }));
  };

  const handleSubmit = () => {
    const transactionValues = {
      ...newTransaction,
      date: newTransaction.date?.toISOString(),
      value: Number(
        (Number(newTransaction.value.replace(/[^0-9.-]+/g, "")) * 100).toFixed(
          2
        )
      ),
    };
    console.log("Submitting transaction:", transactionValues);
    setNewTransaction({
      transaction: "",
      value: "",
      date: undefined,
      type: "",
    });
    setIsOpen(false);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setNewTransaction((prevState) => ({
      ...prevState,
      date: selectedDate,
    }));
    if (popoverRef.current) {
      popoverRef.current.click();
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(numericValue) / 100);

    setNewTransaction((prevState) => ({
      ...prevState,
      value: formattedValue,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-fit w-fit cursor-pointer rounded-sm px-6 py-3">
          Nova transação
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader className="pb-4">
          <DialogTitle>Faça uma nova transação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 pb-2">
          <div className="grid gap-3">
            <Textarea
              placeholder="Transação"
              rows={4}
              value={newTransaction.transaction}
              onChange={(e) => {
                setNewTransaction((prevState) => ({
                  ...prevState,
                  transaction: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid gap-3 h-full">
            <Input
              id="username-1"
              name="value"
              value={newTransaction.value}
              onChange={handleValueChange}
              placeholder="Valor"
              autoComplete="off"
              className="h-[45px]"
            />
          </div>
          <div className="grid gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  ref={popoverRef}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal cursor-pointer h-[45px]",
                    !newTransaction.date && "text-gray-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newTransaction.date
                    ? format(newTransaction.date, "dd/MM/yyyy")
                    : "Selecione uma data"}
                  <span className="sr-only">Selecione uma data</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Calendar
                  mode="single"
                  selected={newTransaction.date}
                  onSelect={handleDateSelect}
                  initialFocus
                  toDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Button
              className={`flex-1 cursor-pointer shadow-none px-6 py-3 h-fit ${
                newTransaction.type === "receita"
                  ? "bg-green-500 text-white"
                  : ""
              }`}
              type="button"
              onClick={() => handleTransactionType("receita")}
            >
              <CircleArrowUp className="text-green-500" />
              Entrada
            </Button>
            <Button
              className={`flex-1 cursor-pointer shadow-none px-6 py-3 h-fit ${
                newTransaction.type === "despesa" ? "bg-red-500 text-white" : ""
              }`}
              type="button"
              onClick={() => handleTransactionType("despesa")}
            >
              <CircleArrowDown className="text-red-500" />
              Saída
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full px-6 py-3 h-fit cursor-pointer"
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Cadastrar transação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
