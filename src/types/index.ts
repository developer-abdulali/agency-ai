import type { ReactNode } from 'react';

type MenuItem = {
  href: string;
  label: string;
  submenu?: SubmenuItem[];
};

type SubmenuItem = {
  href: string;
  icon: ReactNode;
  label: string;
  desc: string;
};

export type { MenuItem };
