// utils/getPanelTitle.ts
export function getPanelTitle(group: string | null): string {
  switch (group) {
    case "manutencao":
      return "BI: Manutenção";
    case "diarias":
      return "BI: Diárias";
    case "abastecimento":
      return "BI: Abastecimento";
    case "obras":
      return "BI: Obras";
    case "suprimento de fundos":
      return "BI: Suprimento de Fundos";
    case "contratos e convênios":
      return "BI: Contratos e Convênios";
    case "produção de documentos":
      return "BI: Produção de Documentos";
    default:
      return "Painel BI";
  }
}
