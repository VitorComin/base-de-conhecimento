export interface IFolder {
  id: number;
  name: string;
  description: string;
}

export interface IKnowledge {
  id: number;
  title: string;
  folderId: number;
}
