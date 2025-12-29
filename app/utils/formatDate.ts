export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input);

  // базовый формат: день месяц год
  const formatter = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
}
