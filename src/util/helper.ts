export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
