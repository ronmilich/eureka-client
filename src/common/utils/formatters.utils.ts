export function convertDays(days: number | null | undefined): string {
  if (days == null) {
    return 'Unknown';
  }

  const daysInMonth = 30;
  const daysInYear = 365;

  if (days < daysInMonth) {
    // Less than one month: show days.
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (days < daysInYear) {
    // Between one month and one year: calculate months and leftover days.
    const months = Math.floor(days / daysInMonth);
    const remainderDays = days % daysInMonth;
    let result = `${months} month${months !== 1 ? 's' : ''}`;
    if (remainderDays > 0) {
      result += ` ${remainderDays} day${remainderDays !== 1 ? 's' : ''}`;
    }
    return result;
  } else {
    // One year or more: calculate years, then months and days from remainder.
    const years = Math.floor(days / daysInYear);
    const remainderDays = days % daysInYear;
    const months = Math.floor(remainderDays / daysInMonth);
    const leftoverDays = remainderDays % daysInMonth;
    let result = `${years} year${years !== 1 ? 's' : ''}`;
    if (months > 0) {
      result += ` ${months} month${months !== 1 ? 's' : ''}`;
    }
    if (leftoverDays > 0) {
      result += ` ${leftoverDays} day${leftoverDays !== 1 ? 's' : ''}`;
    }
    return result;
  }
}
