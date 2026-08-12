/**
 * Monta o intervalo de anos aceito pela API.
 *
 * Os selects devolvem string vazia quando nada foi escolhido; nesse caso o
 * intervalo é omitido para não enviar `NaN` ao backend. Se só um dos lados
 * for preenchido, o outro fica em aberto.
 */
export const montarYearRange = (
  yearFrom?: string,
  yearTo?: string
): { from?: number; to?: number } | undefined => {
  const from = yearFrom ? Number(yearFrom) : undefined;
  const to = yearTo ? Number(yearTo) : undefined;

  const valido = (v?: number) => typeof v === 'number' && !isNaN(v);

  if (!valido(from) && !valido(to)) return undefined;

  return {
    ...(valido(from) ? { from } : {}),
    ...(valido(to) ? { to } : {}),
  };
};
