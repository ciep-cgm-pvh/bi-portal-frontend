// utils/getPanelTitle.ts
export function getPanelTitle(group: string | null): string {
  switch (group) {
    case "manutencao":
      return "BI: Manutenção";
    case "diarias":
      return "BI: Diárias";
    // Adicione mais conforme necessário
    default:
      return "Painel BI";
  }
}
