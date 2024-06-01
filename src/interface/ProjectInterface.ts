export interface iFromData {
  id?: string;
  title: string;
  description: string;
  dataImageVideo: any;
  tagId: string;
}

export interface IDataProject {
  id: string;
  link: string;
  type: 'image' | 'video'
}