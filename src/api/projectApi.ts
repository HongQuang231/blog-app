import { BASE_URL, PAGE_SIZE } from "../utlis/constain";

export interface IGetProject {
  currentPage: number,
  pageSize: number,
  tagId: string,
}

export const getDataProject = async ({ currentPage, pageSize, tagId }: IGetProject) => {
  const response = await fetch(BASE_URL + `/Project/getByPage?page=${currentPage}&size=${pageSize}&tagId=${tagId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}