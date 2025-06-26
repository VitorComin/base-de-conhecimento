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
  setOriginalFolders: any;
  setOriginalKnowledges: any;
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

  function handleSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();

    setFolders(
      originalFolders.filter((folder: any) => {
        const titleMatches = folder.title?.toLowerCase().includes(searchValue);

        const tagsMatches = Array.isArray(folder.tags)
          ? folder.tags.some((tag: string) =>
              tag.toLowerCase().includes(searchValue)
            )
          : false;

        return titleMatches || tagsMatches;
      })
    );

    setKnowledges(
      originalKnowledges.filter((knowledge: any) => {
        const titleMatches = knowledge.title
          ?.toLowerCase()
          .includes(searchValue);

        const tagsMatches = Array.isArray(knowledge.tags)
          ? knowledge.tags.some((tag: string) =>
              tag.toLowerCase().includes(searchValue)
            )
          : false;

        return titleMatches || tagsMatches;
      })
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
        setOriginalFolders,
        setOriginalKnowledges,
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
