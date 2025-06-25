import { IFolder } from "../types/KnowledgeTypes";

let knowledgeFolders: IFolder[] = [
  { id: 1, title: "Pasta 1", description: "eita" },
  { id: 2, title: "Pasta 2", description: "eita 2" },
];

let nextId = 3;

export function getFolders(): Promise<IFolder[]> {
  return Promise.resolve(knowledgeFolders);
}

export function getFolderById(id: number): Promise<IFolder | undefined> {
  return Promise.resolve(knowledgeFolders.find((f) => f.id === id));
}

export function createFolder(data: Omit<IFolder, "id">): Promise<IFolder> {
  const newFolder: IFolder = {
    id: Math.floor(Math.random() * 1000000),
    ...data,
  };
  knowledgeFolders.push(newFolder);
  return Promise.resolve(newFolder);
}

export function updateFolder(
  id: number,
  data: Partial<Omit<IFolder, "id">>
): Promise<IFolder | null> {
  const index = knowledgeFolders.findIndex((f) => f.id === id);
  if (index === -1) return Promise.resolve(null);

  knowledgeFolders[index] = { ...knowledgeFolders[index], ...data };
  return Promise.resolve(knowledgeFolders[index]);
}

export function deleteFolder(id: number): Promise<boolean> {
  const index = knowledgeFolders.findIndex((f) => f.id === id);
  if (index === -1) return Promise.resolve(false);

  knowledgeFolders.splice(index, 1);
  return Promise.resolve(true);
}
