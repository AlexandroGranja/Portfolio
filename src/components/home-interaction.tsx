"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Name = "name" | "signature" | null;
type Interaction = {
  activeName: Name;
  setActiveName: (name: Name) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  menuItem: number;
  setMenuItem: (index: number) => void;
};
const Context = createContext<Interaction | null>(null);
export function HomeInteractionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeName, setActiveName] = useState<Name>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItem, setMenuItem] = useState(-1);
  const pathname = usePathname();
  useEffect(() => {
    setActiveName(null);
    setMenuOpen(false);
    setMenuItem(-1);
  }, [pathname]);
  useEffect(() => {
    document.body.dataset.homeInteraction = menuOpen
      ? "menu"
      : (activeName ?? "rest");
    return () => {
      delete document.body.dataset.homeInteraction;
    };
  }, [menuOpen, activeName]);
  return (
    <Context.Provider
      value={{
        activeName,
        setActiveName,
        menuOpen,
        setMenuOpen,
        menuItem,
        setMenuItem,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useHomeInteraction() {
  const state = useContext(Context);
  if (!state) throw new Error("HomeInteractionProvider ausente");
  return state;
}
