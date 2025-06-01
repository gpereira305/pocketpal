import { useState, useRef, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { z } from "zod";
import type { ZodIssue } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "../../services/api";
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

const TransactionModal = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);
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

  const addTransaction = useMutation({
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

  const onSubmit: SubmitHandler<TransactionSchemaType> = async (values) => {
    const numericValue = Number(
      values.transactionValue.replace(/[^0-9]/g, "").replace(/^0+/, "")
    );
    const transactionValues = {
      id: uuidv4(),
      ...values,
      transactionDate: values.transactionDate?.toISOString(),
      transactionValue: numericValue,
    };
    await addTransaction.mutateAsync(transactionValues);
  };

  const { formState } = form;
  const { errors } = formState;

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

        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit(onSubmit)(event);
            }}
            className="space-y-6"
          >
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <div>
                          <Button
                            ref={popoverRef}
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal cursor-pointer h-[45px]",
                              !field.value && "text-gray-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "dd/MM/yyyy")
                              : "Selecione uma data"}
                            <span className="sr-only">Selecione uma data</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <CalendarIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                          }}
                          initialFocus
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
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
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo</SelectLabel>
                          <SelectItem value="receita">Receita</SelectItem>
                          <SelectItem value="despesa">Despesa</SelectItem>
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
                className="w-full px-6 py-3 h-fit cursor-pointer"
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

TransactionModal.displayName = "TransactionModal";
export default TransactionModal;

const ErrorMessage = ({
  error,
}: {
  error: FieldError | ZodIssue | undefined;
}) => {
  if (!error) return null;

  return <span className="text-red-500 text-sm">{error.message}</span>;
};
