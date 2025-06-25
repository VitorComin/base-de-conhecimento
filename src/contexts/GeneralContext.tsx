import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getFolders } from "../services/KnowledgeFolders";
import { getKnowledges } from "../services/Knowledges";

interface KnowledgeContextType {
  folders: any;
  setFolders: any;
  knowledges: any;
  setKnowledges: any;
  handleSearch: any;
  originalFolders: any;
  originalKnowledges: any;
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(
  undefined
);

interface KnowledgeProviderProps {
  children: ReactNode;
}

export function KnowledgeProvider({ children }: KnowledgeProviderProps) {
  const [originalFolders, setOriginalFolders] = useState<any>();
  const [originalKnowledges, setOriginalKnowledges] = useState<any>();
  const [folders, setFolders] = useState<any>(originalFolders);
  const [knowledges, setKnowledges] = useState<any>(originalKnowledges);

  useEffect(() => {
    async function fetchData() {
      const [fetchedFolders, fetchedKnowledges] = await Promise.all([
        getFolders(),
        getKnowledges(),
      ]);
      setOriginalFolders(fetchedFolders);
      setFolders(fetchedFolders);
      setOriginalKnowledges(fetchedKnowledges);
      setKnowledges(fetchedKnowledges);
    }

    fetchData();
  }, []);

  function handleSearch(value: any) {
    setFolders(
      originalFolders.filter((folder: any) =>
        folder.title.includes(value.target.value)
      )
    );

    setKnowledges(
      originalKnowledges.filter((knowledge: any) =>
        knowledge.title.includes(value.target.value)
      )
    );
  }

  return (
    <KnowledgeContext.Provider
      value={{
        folders,
        setFolders,
        knowledges,
        setKnowledges,
        handleSearch,
        originalFolders,
        originalKnowledges,
      }}
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
