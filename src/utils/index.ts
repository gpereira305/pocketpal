export function convertToBRL(value: number): string {
  const decimalValue = value / 100;
  const formattedValue = decimalValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedValue.replace(".", "#").replace(".", ",").replace("#", ".");
}
