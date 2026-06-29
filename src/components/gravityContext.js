import { createContext, useContext } from "react";

export const GravityContext = createContext(null);

export const useGravity = () => useContext(GravityContext);
