import { createContext, useContext, useState, ReactNode } from "react";
import { folderKnowledges, knowledgeFolders } from "../utils/config";

interface KnowledgeContextType {
  folders: any;
  setFolders: any;
  knowledges: any;
  setKnowledges: any;
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(
  undefined
);

interface KnowledgeProviderProps {
  children: ReactNode;
}

export function KnowledgeProvider({ children }: KnowledgeProviderProps) {
  const [folders, setFolders] = useState<any>(knowledgeFolders);
  const [knowledges, setKnowledges] = useState<any>(folderKnowledges);

  return (
    <KnowledgeContext.Provider
      value={{ folders, setFolders, knowledges, setKnowledges }}
    >
      {children}
    </KnowledgeContext.Provider>
  );
}

export function useKnowledge() {
  const context = useContext(KnowledgeContext);
  if (!context) {
    throw new Error("useKnowledge must be used within a KnowledgeProvider");
  }
  return context;
}
