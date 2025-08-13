import type { ReactNode } from "react";

export interface NavLinkInterface {
  title: string;
  path: string;
  icon: ReactNode;
  element?: ReactNode;
  published: boolean;
  group?: string; // Optional grouping for navigation links
}
