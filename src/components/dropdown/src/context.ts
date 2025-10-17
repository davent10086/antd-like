import React from "react";
import type { DropdownProps } from "./interface";

export interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  trigger: DropdownProps['trigger'];
  placement: DropdownProps['placement'];
}

export const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export const DropdownProvider = DropdownContext.Provider;