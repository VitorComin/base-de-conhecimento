export interface IFolder {
  id: number;
  title: string;
  description: string;
}

export interface IKnowledge {
  id: number;
  title: string;
  folderId: number;
  description: string;
  author: string;
}
