export interface IFolder {
  id: number;
  name: string;
}

export interface IKnowledge {
  id: number;
  title: string;
  folderId: number;
}
