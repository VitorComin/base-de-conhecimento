import { IFolder } from "../types/KnowledgeTypes";

const BASE_URL = "https://685c9013769de2bf085d0ff0.mockapi.io/folders";

export async function getFolders(): Promise<IFolder[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Erro ao buscar pastas");
  return res.json();
}

export async function getFolderById(id: number): Promise<IFolder | null> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao buscar pasta");
  return res.json();
}

export async function createFolder(
  data: Omit<IFolder, "id">
): Promise<IFolder> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar pasta");
  return res.json();
}

export async function updateFolder(
  id: number,
  data: Partial<Omit<IFolder, "id">>
): Promise<IFolder | null> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao atualizar pasta");
  return res.json();
}

export async function deleteFolder(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar pasta");
  return true;
}
