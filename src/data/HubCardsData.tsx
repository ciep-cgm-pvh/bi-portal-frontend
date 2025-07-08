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
const HubCardsData: HubCardInterface[] = [
  // {
  //   title: "Diárias (demo)",
  //   description: "Painel com dados de concessão de diárias.",
  //   route: "/painel/diarias/home",
  //   icon: <TicketsPlane className="text-orange-400 w-6 h-6" />,
  //   type: "Gestão",
  // },
  // {
  //   title: "Manutenção (demo)",
  //   description: "Painel com dados de manutenção de frota.",
  //   route: "/painel/manutencao/home",
  //   icon: <Wrench className="text-slate-700 w-6 h-6" />,
  //   type: "Gestão",
  // },

  {
    title: "Diárias 2025",
    description: "Painel com dados de diárias concedidas em 2025.",
    route: "https://lookerstudio.google.com/u/0/reporting/ff73c52e-ae9a-4c31-824f-01b3c1b4f64a/page/TAEHF",
    icon: <TicketsPlane className="text-orange-400 w-6 h-6" />,
    type: "Gestão",
  },
  {
    title: "Diárias 2024",
    description: "Painel com dados de diárias concedidas em 2024.",
    route: "https://lookerstudio.google.com/u/0/reporting/b00c64f0-95ea-49ae-bb0a-9b660de3c392/page/iaVlE",
    icon: <TicketsPlane className="text-orange-400 w-6 h-6" />,
    type: "Gestão",
  },
  {
    title: "Obras 2025",
    description: "Painel de acompanhamento de obras de 2025.",
    route: "https://lookerstudio.google.com/u/0/reporting/973f6e54-754d-4e03-9bd9-aedeea124ca2/page/7jzHF",
    icon: <TrafficCone className="text-yellow-500 w-6 h-6" />,
    type: "Infraestrutura",
  },
  {
    title: "Sup. de Fundos 2025",
    description: "Painel de suprimento de fundos de 2025.",
    route: "https://lookerstudio.google.com/reporting/40cc18e1-c36e-40eb-99f6-114d224866b2",
    icon: <Banknote className="text-green-700 w-6 h-6" />,
    type: "Financeiro",
  },
    {
    title: "Sup. de Fundos 2024",
    description: "Painel de suprimento de fundos de 2024.",
    route: "https://lookerstudio.google.com/u/0/reporting/0f03c025-df3c-4aa1-bdaf-2b052df4569b/page/3fWlE",
    icon: <Banknote className="text-green-700 w-6 h-6" />,
    type: "Financeiro",
  },
  {
    title: "Manutenção",
    description: "Painel de manutenção da frota de 2025.",
    route: "https://lookerstudio.google.com/u/0/reporting/a41d513b-d75c-40bd-93e3-8f53825a1966/page/inJJF/edit",
    icon: <Wrench className="text-slate-700 w-6 h-6" />,
    type: "Frota",
  },
  {
    title: "Abastecimento",
    description: "Painel com dados de abastecimento.",
    route: "https://lookerstudio.google.com/reporting/1630a802-c80f-4231-9fe8-226a207b9b8a",
    icon: <Fuel className="text-orange-400 w-6 h-6" />,
    type: "Frota",
  },
];

const HubExternalCardsData = [
  {
    title: "Contratos e Convênios",
    description: "Painel de acompanhamento de contratos e convênios. Dados por SEMESC.",
    route: "https://lookerstudio.google.com/u/0/reporting/411daa19-5fee-4c94-9aff-c9d7bfa6d82c/page/LfYfE",
    icon: <FileCheck2 className="text-cyan-600 w-6 h-6" />,
    type: "Financeiro",
  },
  {
    title: `Ouvidoria (por SMTI)`,
    description: "Painel com dados de manifestações da ouvidoria desenvolvido pela SMTI.",
    route: "https://ouvidoria.portovelho.ro.gov.br/painel-ouvidoria",
    icon: <BookUser className="text-red-500 w-6 h-6" />,
    type: "Gestão",
  },
]

// organiza por ordem alfabética
HubCardsData.sort((a, b) => a.title.localeCompare(b.title));

// adiciona cards externos ao final
HubCardsData.push(...HubExternalCardsData);

export default function getHubCardsData() {
  return HubCardsData;
}