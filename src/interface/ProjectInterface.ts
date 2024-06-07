export interface iFromData {
  id?: string;
  name: string;
  description: string;
  dataProject: any;
  tagId: string;
  updatedDate?: string;
}

export interface IDataProject {
  id: string;
  link: string;
  type: 'image' | 'video'
}