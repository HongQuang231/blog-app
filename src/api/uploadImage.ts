export const fetchUploadImage = async (formData: any) => {
  const response = await fetch("https://api.cloudinary.com/v1_1/de0sqyhr9/image/upload", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
  return response;
}