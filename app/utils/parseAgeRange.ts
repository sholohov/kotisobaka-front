/**
 * Преобразует строковый шаблон возраста ("6m-2y") в диапазон дат рождения.
 * Возвращает [раньше, позже] для фильтра Strapi $between.
 */
export function parseAgeRange(value: string): [string, string] {
  const now = new Date()

  const parsePart = (part: string): Date => {
    if (part === '0') return new Date(0)
    if (part === 'now') return now

    const date = new Date(now)

    if (part.endsWith('m')) {
      const months = parseInt(part.slice(0, -1), 10)

      date.setMonth(date.getMonth() - months)
    } else if (part.endsWith('y')) {
      const years = parseInt(part.slice(0, -1), 10)

      date.setFullYear(date.getFullYear() - years)
    } else {
      throw new Error(`Неверная часть диапазона: "${part}"`)
    }

    return date
  }

  const [minAgeStr, maxAgeStr] = value.split('-')

  if (!minAgeStr || !maxAgeStr) {
    throw new Error(`Неверный формат диапазона: ${value}`)
  }

  // для возраста: "6m-2y" → животное родилось между (now - 2y) и (now - 6m)
  const minBirthDate = parsePart(maxAgeStr) // старший возраст → более ранняя дата рождения
  const maxBirthDate = parsePart(minAgeStr) // младший возраст → более поздняя дата рождения

  return [minBirthDate.toISOString(), maxBirthDate.toISOString()]
}
