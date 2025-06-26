import { IKnowledge } from "../types/KnowledgeTypes";

const BASE_URL = "https://685c9013769de2bf085d0ff0.mockapi.io/knowledges";

export async function getKnowledges(): Promise<IKnowledge[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Erro ao buscar conhecimentos");
  return res.json();
}

export async function getKnowledgeById(id: number): Promise<IKnowledge | null> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao buscar conhecimento");
  return res.json();
}

export async function createKnowledge(
  data: Omit<IKnowledge, "id">
): Promise<IKnowledge> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar conhecimento");
  return res.json();
}

export async function updateKnowledge(
  id: number,
  data: Partial<Omit<IKnowledge, "id">>
): Promise<IKnowledge | null> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao atualizar conhecimento");
  return res.json();
}

export async function deleteKnowledge(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar conhecimento");
  return true;
}
