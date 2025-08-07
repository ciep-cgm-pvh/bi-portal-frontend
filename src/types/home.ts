// Tipagem para as props do nosso novo template
import type { JSX, ReactNode } from 'react';

export interface HomePanelTemplateProps {
  icon: JSX.Element;
  title: string;
  subtitle?: string;
  description: ReactNode; // ReactNode para permitir texto com formatação (ex: <strong>)
  actionLinks: ActionLink[];
}

// Tipagem para os botões de ação
export interface ActionLink {
  text: string;
  path: string;
  variant: 'primary' | 'secondary'; // Para controlar o estilo do botão
  icon?: JSX.Element;
}