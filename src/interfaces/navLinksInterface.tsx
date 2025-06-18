import type { ReactNode } from "react";

export interface NavLinkInterface {
  title: string;
  path: string;
  icon: ReactNode;
  element?: ReactNode;
  group?: string; // Optional grouping for navigation links
}
