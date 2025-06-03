import { useState, memo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { z } from "zod";
import type { ZodIssue } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// Validação do formulário
const transactionSchema = z.object({
  transactionDesc: z
    .string()
    .trim()
    .min(5, "Descrição deve ter pelo menos 5 caracteres"),
  transactionValue: z.string().min(1, "Valor é obrigatório"),
  transactionDate: z.date({
    required_error: "Data é obrigatória",
  }),
  transactionType: z.enum(["receita", "despesa"], {
    errorMap: () => ({ message: "Tipo de transação é obrigatório" }),
  }),
});

type TransactionSchemaType = z.infer<typeof transactionSchema>;

const TransactionsModal = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const queryClient = new QueryClient();

  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionDesc: "",
      transactionValue: "",
      transactionDate: undefined as Date | undefined,
      transactionType: undefined,
    },
  });

  // Função para adicionar uma nova transação ao banco de dados
  const { mutateAsync: addTransaction } = useMutation({
    mutationFn: (newTransaction: {
      transactionDate: string;
      transactionValue: number;
      transactionDesc: string;
      transactionType: "receita" | "despesa";
    }) => {
      return axiosInstance.post("/transactions", newTransaction, {
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

  // Função para validar e enviar a transação
  const onSubmit: SubmitHandler<TransactionSchemaType> = async (
    values,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    const numericValue = Number(
      values.transactionValue.replace(/[^0-9]/g, "").replace(/^0+/, "")
    );
    const transactionValues = {
      id: uuidv4(),
      ...values,
      transactionDate: values.transactionDate?.toISOString(),
      transactionValue: numericValue,
    };
    await addTransaction(transactionValues);
  };

  const { formState, handleSubmit, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    if (startDate) {
      setValue("transactionDate", startDate);
    }
  }, [startDate, setValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-fit w-fit cursor-pointer rounded-sm px-6 py-3 dark:bg-sidebar-primary dark:text-white">
          Nova transação
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader className="pb-4">
          <DialogTitle>Faça uma nova transação</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="transactionDesc"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormControl>
                    <Textarea
                      placeholder="Descrição da transação"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  {errors.transactionDesc && (
                    <ErrorMessage error={errors.transactionDesc} />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionValue"
              render={({ field }) => (
                <FormItem className="gap-0 custom-select">
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        const formattedValue = new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(numericValue) / 100);

                        field.onChange(formattedValue);
                      }}
                      placeholder="Valor da transação"
                      autoComplete="off"
                    />
                  </FormControl>
                  {errors.transactionValue && (
                    <ErrorMessage error={errors.transactionValue} />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormControl>
                    <DatePickerComponent
                      selectedDate={startDate}
                      setSelectedDate={setStartDate}
                      {...field}
                    />
                  </FormControl>
                  {errors.transactionDate && (
                    <ErrorMessage error={errors.transactionDate} />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="gap-0 custom-select">
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value: "receita" | "despesa") => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Selecione um tipo de transação" />
                      </SelectTrigger>
                      <SelectContent className="h-[inherit]">
                        <SelectGroup>
                          <SelectLabel>Tipo</SelectLabel>
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
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.transactionType && (
                    <ErrorMessage error={errors.transactionType} />
                  )}
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                className="w-full px-6 py-3 h-fit cursor-pointer rounded-sm"
                type="submit"
              >
                Cadastrar transação
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

TransactionsModal.displayName = "TransactionsModal";
export default TransactionsModal;

const ErrorMessage = ({
  error,
}: {
  error: FieldError | ZodIssue | undefined;
}) => {
  if (!error) return null;

  return <span className="text-red-500 text-sm">{error.message}</span>;
};

const DatePickerComponent = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()}
        className="custom-datepicker text-sm"
        placeholderText="Selecione uma data"
      />
    </div>
  );
};
