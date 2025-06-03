// src/components/ui/select.tsx
"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const SelectContext = React.createContext<{
  open: boolean;
  value: string;
  onValueChange: (value: string) => void;
  setOpen: (open: boolean) => void;
} | null>(null);

// Interface pour les props du composant Select
interface SelectProps {
  children: React.ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void; // Ajout de cette prop
}

export function Select({ children, defaultValue, onValueChange }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || "");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue); // Appel du callback externe
    }
    setOpen(false); // Fermer le dropdown
  };

  return (
    <SelectContext.Provider value={{ 
      open, 
      value, 
      onValueChange: handleValueChange,
      setOpen 
    }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  const context = React.useContext(SelectContext);
  
  return (
    <div 
      className="flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer"
      onClick={() => context?.setOpen(!context.open)}
    >
      <span>{context?.value || children}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </div>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(SelectContext);
  
  if (!context?.open) return null;

  return (
    <div className="absolute z-50 w-full mt-1 border rounded-md bg-white shadow-md">
      {children}
    </div>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const context = React.useContext(SelectContext);
  
  return (
    <div 
      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
      onClick={() => {
        context?.onValueChange(value);
      }}
    >
      {children}
    </div>
  );
}

// Interface pour SelectValue avec placeholder optionnel
interface SelectValueProps {
  children?: React.ReactNode;
  placeholder?: string;
}

export function SelectValue({ children, placeholder }: SelectValueProps) {
  const context = React.useContext(SelectContext);
  
  // Afficher la valeur sélectionnée, ou le placeholder, ou les children
  if (context?.value) {
    return <>{context.value}</>;
  }
  
  if (placeholder) {
    return <span className="text-gray-500">{placeholder}</span>;
  }
  
  return <>{children}</>;
}