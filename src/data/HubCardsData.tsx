import {
  Banknote,
  BookUser,
  FileCheck2,
  Fuel,
  TicketsPlane,
  TrafficCone,
  Wrench
} from 'lucide-react';

import type { HubCardInterface } from '../interfaces/hubCardInterface';

/**
* @description
* Lista de painéis de BI formatada para exibição como Hub Cards.
* Cada card representa um painel específico e mantém o link direto
* para o relatório correspondente no Looker Studio.
*/
const HubCardsDataV2: HubCardInterface[] = [
  {
    title: "Diárias (demo)",
    description: "Painel com dados de concessão de diárias.",
    route: "/painel/diarias/dashboard",
    icon: <TicketsPlane className="text-orange-400 w-6 h-6" />,
    type: "demonstracão",
  },
  {
    title: "Manutenção (demo)",
    description: "Painel com dados de manutenção de frota.",
    route: "/painel/manutencao/dashboard",
    icon: <Wrench className="text-slate-700 w-6 h-6" />,
    type: "Frota",
  },
  {
    title: "Abastecimento",
    description: "Painel com dados de abastecimento de frota.",
    route: "/painel/abastecimento/dashboard",
    icon: <Fuel className="text-orange-400 w-6 h-6" />,
    type: "Frota",
  },
]

const HubCardsData: HubCardInterface[] = [
  {
    title: "Diárias",
    description: "Painel com dados de diárias concedidas.",
    // route: "https://lookerstudio.google.com/reporting/613ae68b-beee-4091-9f6b-7aa1da14de8b/page/TAEHF",
    //route:"https://dashboard-geral.vercel.app/paineis/diarias",
    route: "https://lookerstudio.google.com/reporting/613ae68b-beee-4091-9f6b-7aa1da14de8b/page/TAEHF",
    icon: <TicketsPlane className="text-orange-400 w-6 h-6" />,
    type: "Gestão",
  },
  {
    title: "Obras",
    description: "Painel de acompanhamento de obras.",
    route: "https://lookerstudio.google.com/u/0/reporting/973f6e54-754d-4e03-9bd9-aedeea124ca2/page/7jzHF",
    icon: <TrafficCone className="text-yellow-500 w-6 h-6" />,
    type: "Infraestrutura",
  },
  {
    title: "Sup. de Fundos",
    description: "Painel de suprimento de fundos.",
    route: "https://lookerstudio.google.com/reporting/40cc18e1-c36e-40eb-99f6-114d224866b2",
    icon: <Banknote className="text-green-700 w-6 h-6" />,
    type: "Financeiro",
  },
  // {
  //   title: "Manutenção",
  //   description: "Painel de manutenção da frota.",
  //   // route: "https://lookerstudio.google.com/u/0/reporting/a41d513b-d75c-40bd-93e3-8f53825a1966/page/inJJF/edit",
  //   route: "https://dashboard-geral.vercel.app/paineis/manutencao",
  //   icon: <Wrench className="text-slate-700 w-6 h-6" />,
  //   type: "Frota",
  // },
  // {
  //   title: "Abastecimento",
  //   description: "Painel com dados de abastecimento.",
  //   route: "https://lookerstudio.google.com/reporting/1630a802-c80f-4231-9fe8-226a207b9b8a",
  //   icon: <Fuel className="text-orange-400 w-6 h-6" />,
  //   type: "Frota",
  // },
];

const HubExternalCardsData = [
  {
    title: "Contratos e Convênios",
    description: "Painel de acompanhamento de contratos e convênios. Dados por SEMESC.",
    route: "https://lookerstudio.google.com/u/0/reporting/411daa19-5fee-4c94-9aff-c9d7bfa6d82c/page/LfYfE",
    icon: <FileCheck2 className="text-cyan-600 w-6 h-6" />,
    type: "Financeiro",
  },
  {title: `Ouvidoria (SMTI)`,
    description: "Painel com dados de manifestações da ouvidoria desenvolvido pela SMTI.",
    route: "https://ouvidoria.portovelho.ro.gov.br/painel-ouvidoria",
    icon: <BookUser className="text-red-500 w-6 h-6" />,
    type: "Gestão",
  },
  {
    title: "Retomada de Obras da Educação (TCU)",
        description: "O Tribunal de Contas da União (TCU) lançou o Painel que monitora o progresso das obras paralisadas no setor educacional que estão sendo retomadas em todo o país.",
      route: "https://app.powerbi.com/view?r=eyJrIjoiM2NmMTdlYzctOTY3My00ZWZhLWI3ODQtN2YyZDEzNDY1MTk1IiwidCI6ImJmMTU4MTg4LTlhMTEtNDRjMi1iN2ZjLTIxZTg1NjEzYmEyNyJ9",
      icon: <TrafficCone className="text-orange-400 w-6 h-6 min-w-6 min-h-6" />,
      type: "Infraestrutura",
  },
]

// adiciona cards externos ao final
HubCardsData.push(...HubCardsDataV2);
HubCardsData.push(...HubExternalCardsData);

// organiza por ordem alfabética
HubCardsData.sort((a, b) => a.title.localeCompare(b.title));

export default function getHubCardsData() {
  return HubCardsData;
}
