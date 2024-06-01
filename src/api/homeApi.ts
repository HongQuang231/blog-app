import { toast } from "react-toastify";
import { IHome } from "../interface/MainPageInterface";
import { BASE_URL } from "../utlis/constain";

export const getHomeImage = async () => {
  const response = await fetch(BASE_URL + '/Home', {
    method: 'GET',
    // mode: "no-cors",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    toast.error('Thay đổi dữ liệu không thành công')
    return null;
  }
}

export const putImageHome = async (dataBody: IHome, accessToken: string) => {
  const response = await fetch(BASE_URL + `/Home`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(dataBody)
  });
  if (response.status === 200) {
    toast.success('Thay đổi dữ liệu thành công')
    const data = await response.json();
    return data;
  } else {
    toast.error('Thay đổi dữ liệu không thành công')
    return null;
  }
}