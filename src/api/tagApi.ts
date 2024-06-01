import { toast } from "react-toastify";
import { BASE_URL } from "../utlis/constain"

export const getListTags = async () => {
  const response = await fetch(BASE_URL + '/Tag', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.json();
}

export const postTag = async (body: { name: string, description: string }, token: string) => {
  const response = await fetch(BASE_URL + '/Tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })


  if (response.status === 200) {
    toast.success('Thêm mới thành công')
    return response.json();
  } else {
    toast.error('Thêm mới không thành công')
    return null;
  }
}

export const putTag = async (body: { name: string, description: string, id: string }, token: string) => {
  const response = await fetch(BASE_URL + '/Tag', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })


  if (response.status === 200) {
    toast.success('Thay đổi thành công')
    return response.json();
  } else {
    toast.error('Thay đổi không thành công')
    return null;
  }
}

export const deleteTagbyId = async (id: string, token: string) => {
  const response = await fetch(BASE_URL + `/Tag/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (response.status === 200) {
    toast.success('Xóa thành công')
    return true;
  } else {
    toast.error('Xóa không thành công')
    return null;
  }
}