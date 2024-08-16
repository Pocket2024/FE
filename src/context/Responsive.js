import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const ResponsiveContext = createContext();

export function ResponsiveProvider({ children }) {
  const isDesktop = useMediaQuery({ minWidth: 1000 });
  const isMobile = useMediaQuery({ maxWidth: 999 });

  return (
    <ResponsiveContext.Provider value={{ isDesktop, isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export const useResponsive = () => useContext(ResponsiveContext);
