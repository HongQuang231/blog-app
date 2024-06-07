import { iFromData } from "../interface/ProjectInterface";
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

export const getDataProjectById = async (id: string) => {
  const response = await fetch(BASE_URL + `/Project/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

export const postProject = async (body: iFromData, accessToken: string) => {
  const res = await fetch(BASE_URL + `/Project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  })
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return null;
  }
}

export const putProject = async (body: iFromData, accessToken: string) => {
  const res = await fetch(BASE_URL + `/Project`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  })
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return null;
  }
}