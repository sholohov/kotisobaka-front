export function getAge(input: string | number | Date, short = false): string {
  const date = input instanceof Date ? input : new Date(input);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return new Intl.NumberFormat('ru', {
      style: 'unit',
      unit: 'day',
      unitDisplay: short ? 'short' : 'long',
    }).format(diffDays);
  }

  const diffWeeks = Math.floor(diffDays / 7);

  if (diffDays < 30) {
    return new Intl.NumberFormat('ru', {
      style: 'unit',
      unit: 'week',
      unitDisplay: short ? 'short' : 'long',
    }).format(diffWeeks);
  }

  const diffMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
      (now.getMonth() - date.getMonth());

  if (diffMonths < 12) {
    return new Intl.NumberFormat('ru', {
      style: 'unit',
      unit: 'month',
      unitDisplay: short ? 'short' : 'long',
    }).format(diffMonths);
  }

  const diffYears = now.getFullYear() - date.getFullYear();

  return new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'year',
    unitDisplay: short ? 'short' : 'long',
  }).format(diffYears);
}
