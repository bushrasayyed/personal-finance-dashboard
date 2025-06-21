//utility for formatting date
export function formatDate(date: Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  const day = `${d.getDate()}`.padStart(2, '0');
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
