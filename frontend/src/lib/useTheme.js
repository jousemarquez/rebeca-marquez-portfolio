import { useEffect } from "react";

// Sitio con tema único (paleta Remarubi), sin alternancia claro/oscuro.
if (typeof document !== "undefined") {
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "light";
}

export const useTheme = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }, []);

  // Return dummy setter so consuming components don't break
  const noop = () => {};
  return ["light", noop];
};