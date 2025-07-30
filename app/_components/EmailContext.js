"use client";
import { createContext, useContext, useState } from "react";
const EmailContext = createContext();

function EmailProvider({ children }) {
  const [form, setForm] = useState(fakse);
  return (
    <EmailContext.Provider value={{ existingUser, setExistingUser }}>
      {children}
    </EmailContext.Provider>
  );
}

function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined)
    throw new Error("Context is used outside provider");
  return context;
}

export { EmailProvider, useEmail };
