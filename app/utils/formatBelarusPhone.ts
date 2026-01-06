export function formatBelarusPhone(raw: string): string {
  // Оставляем только цифры
  let digits = raw.replace(/\D/g, '');

  // Приводим к международному формату
  if (digits.startsWith('80')) {
    digits = '375' + digits.slice(2);
  } else if (digits.startsWith('8')) {
    digits = '375' + digits.slice(1);
  } else if (digits.startsWith('375')) {
    // уже ок
  } else if (digits.startsWith('+375')) {
    digits = digits.slice(1); // убираем +
  } else {
    throw new Error('Некорректный номер телефона');
  }

  // Проверка длины (должно быть 12 цифр: 375XXXXXXXXX)
  if (digits.length !== 12) {
    throw new Error('Некорректный номер телефона');
  }

  // Разбиваем на части
  const country = '+375';
  const code = digits.slice(3, 5);     // код оператора или города
  const part1 = digits.slice(5, 8);    // первые 3 цифры
  const part2 = digits.slice(8, 10);   // следующие 2 цифры
  const part3 = digits.slice(10, 12);  // последние 2 цифры

  return `${country} (${code}) ${part1}-${part2}-${part3}`;
}
