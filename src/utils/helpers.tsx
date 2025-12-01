// Helpers Genéricos
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

export function formatMonth(m?: string) {
  if (!m) return 'N/A';
  const iso = /^(\d{4})-(\d{1,2})$/.exec(m);
  if (iso) {
    const [ , y, mm ] = iso;
    return new Date(Number(y), Number(mm) - 1, 1)
      .toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
      .replace('.', '');
  }
  const br = /^(\d{1,2})\/(\d{4})$/.exec(m);
  if (br) {
    const [ , mm, y ] = br;
    return new Date(Number(y), Number(mm) - 1, 1)
      .toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
      .replace('.', '');
  }
  return m;
}

export const formatDateForInput = (dateString: string | Date): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Pega o ano, mês e dia em UTC para evitar deslocamento por fuso horário
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};