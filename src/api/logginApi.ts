import { toast } from "react-toastify";
import { BASE_URL } from "../utlis/constain";

export const loginApi = async () => {
  const response = await fetch(BASE_URL + "/Account/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: "admin@gmail.com",
      password: "admin"
    })
  })

  if(response.status === 200) {
    toast.success('Successfully logged in')
    return response.json();
  } else {
    toast.error('Failed to log in')
    return null;
  }
}