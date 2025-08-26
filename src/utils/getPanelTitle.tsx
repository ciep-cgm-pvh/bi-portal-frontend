import React from 'react';
import { Fuel, Wrench, Bus, HardHat, Landmark, FileText, FileInput } from 'lucide-react';

// Definimos uma interface para o objeto de retorno, para maior clareza
interface PanelInfo {
  title: string;
  icon: React.ReactNode | null; // O ícone pode ser um componente React ou nulo
}

// A função agora retorna o objeto PanelInfo
export function getPanelInfo(group: string | null): PanelInfo {
  switch (group) {
    case "manutencao":
      return { title: "BI: Manutenção", icon: <Wrench size={24} /> };
    case "diarias":
      return { title: "BI: Diárias", icon: <Bus size={24} /> };
    case "abastecimento":
      // Agora o ícone é retornado como um elemento, não dentro da string
      return { title: "BI: Abastecimento", icon: <Fuel size={24} /> };
    case "obras":
      return { title: "BI: Obras", icon: <HardHat size={24} /> };
    case "suprimento de fundos":
      return { title: "BI: Suprimento de Fundos", icon: <Landmark size={24} /> };
    case "contratos e convênios":
      return { title: "BI: Contratos e Convênios", icon: <FileText size={24} /> };
    case "produção de documentos":
      return { title: "BI: Produção de Documentos", icon: <FileInput size={24} /> };
    default:
      return { title: "Painel BI", icon: null };
  }
}