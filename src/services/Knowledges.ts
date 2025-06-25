import { IKnowledge } from "../types/KnowledgeTypes";

let knowledges: IKnowledge[] = [
  {
    id: 1,
    title: "conhecimento da pasta 1",
    folderId: 1,
    author: "Gabriel",
    description: "descrição",
  },
  {
    id: 2,
    title: "conhecimento da pasta 1 (1)",
    folderId: 1,
    author: "Vitor",
    description: "descrição",
  },
  {
    id: 3,
    title: "conhecimento da pasta 2 ",
    folderId: 2,
    author: "Daniel",
    description: "descrição",
  },
  {
    id: 4,
    title: "conhecimento da pasta 2 (1)",
    folderId: 2,
    author: "Patrick",
    description: "descrição",
  },
];

let nextId = 5;

export function getKnowledges(): Promise<IKnowledge[]> {
  return Promise.resolve(knowledges);
}

export function getKnowledgeById(id: number): Promise<IKnowledge | undefined> {
  return Promise.resolve(knowledges.find((k) => k.id === id));
}

export function createKnowledge(
  data: Omit<IKnowledge, "id">
): Promise<IKnowledge> {
  const newKnowledge: IKnowledge = { id: nextId++, ...data };
  knowledges.push(newKnowledge);
  return Promise.resolve(newKnowledge);
}

export function updateKnowledge(
  id: number,
  data: Partial<Omit<IKnowledge, "id">>
): Promise<IKnowledge | null> {
  const index = knowledges.findIndex((k) => k.id === id);
  if (index === -1) return Promise.resolve(null);

  knowledges[index] = { ...knowledges[index], ...data };
  return Promise.resolve(knowledges[index]);
}

export function deleteKnowledge(id: number): Promise<boolean> {
  const index = knowledges.findIndex((k) => k.id === id);
  if (index === -1) return Promise.resolve(false);

  knowledges.splice(index, 1);
  return Promise.resolve(true);
}
