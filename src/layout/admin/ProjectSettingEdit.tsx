import { useEffect, useState } from "react";
import { dataNavbarDashboard } from "../../data/fakeData";
import NavbarComponent from "../../component/Navbar";
import { fetchUploadImage } from "../../api/uploadImage";
import { IDataProject, iFromData } from "../../interface/ProjectInterface";
import { getListTags } from "../../api/tagApi";
import { ITag } from "./Tags";
import { getDataProjectById, postProject, putProject } from "../../api/projectApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";
import LoadingComponent from "../../component/LoadingComponent";
const SettingProjectEditComponent = () => {
  const accessToken = useSelector((state: any) => state.login.accessToken)
  const location = useLocation();
  const navigation = useNavigate();
  const [tag, setTag] = useState<ITag>();
  const [listTags, setListTags] = useState<ITag[]>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [listImageAndVideo, setListImageAndVideo] = useState<IDataProject[]>([]);

  useEffect(() => {
    handleListTags();
  }, [])

  const onSubmitFrom = async (event: any) => {
    event.preventDefault();
    const dataSubmit: iFromData = {
      id: location.pathname.split('/')[3],
      name: title,
      description: description,
      dataProject: JSON.stringify(listImageAndVideo),
      tagId: tag!.id
    }

    const data = await putProject(dataSubmit, accessToken)
    if (data) {
      toast.success('Sửa thành công')
    } else {
      toast.error('Sửa không thành công')
    }
  }

  const handleAddLinkImage = (type: 'image' | 'video') => {
    setListImageAndVideo([...listImageAndVideo, {
      id: uuidv4(),
      link: '',
      type: type,
    }])
  }

  const onChangeInput = async (id: string, value: any) => {
    let valueScrope: any

    if (typeof value !== 'string') {
      setIsLoading(true)
      valueScrope = value?.target?.files[0];
      const formData = new FormData()
      formData.append("file", valueScrope)
      formData.append('upload_preset', 'myrr387r')
      const response = await fetchUploadImage(formData)
      if (response) {
        valueScrope = response.secure_url
      } else {
        valueScrope = ''
      }
      setIsLoading(false)

    } else {
      valueScrope = value;
    }
    const newList = listImageAndVideo.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          link: valueScrope
        }
      }
      return data;
    })
    setListImageAndVideo([...newList])
  }

  const handleDelete = (id: string) => {
    const filterList = listImageAndVideo.filter(data => data.id !== id)
    setListImageAndVideo([...filterList])
  }

  const handleListTags = () => {
    getListTags().then(tags => {
      setListTags(tags)

      getDataProjectById(location.pathname.split('/')[3]).then((data: iFromData) => {
        setTitle(data.name)
        setListImageAndVideo(JSON.parse(data.dataProject))
        setDescription(data.description)

        const tag = tags.find((tag: any) => tag.id === data.tagId)
        setTag(tag)
      })
    })
  }

  const handleChangeSelect = (id: string) => {
    const dataFilter = listTags?.filter(tags => tags.id === id)
    setTag(dataFilter && dataFilter[0])
  }

  return (
    <div>
      <NavbarComponent data={dataNavbarDashboard} />
      <LoadingComponent isLoading={isLoading}>
        <div className="p-20">
          <form onSubmit={(e) => onSubmitFrom(e)}>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn tag</label>
            {listTags && tag && (
              <select value={tag.id} onChange={($event) => handleChangeSelect($event.target.value)} required id="countries" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {listTags.map(data => <option value={data.id}>{data.name}</option>)}
              </select>
            )}
            <div className="mb-6">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Tên ảnh</label>
              <input value={title} onChange={($event) => setTitle($event.target.value)} type="text" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên ảnh" required />
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900">Đường dẫn hình ảnh</label>
                <button onClick={() => handleAddLinkImage("image")} type="button" data-tooltip-target="tooltip-default" data-tooltip-trigger="hover" className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listImageAndVideo.filter(data => data.type === "image").map(image => (
                  <>
                    {
                      image.link !== '' ? (
                        <div key={image.id} className="flex items-center justify-between gap-10 mb-3">
                          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <img src={image.link} className="w-full h-full" />
                          </label>
                          <button type="button" onClick={() => handleDelete(image.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">SVG, PNG, JPG or GIF</p>
                          </div>
                          <input onChange={($event) => onChangeInput(image.id, $event)} id="dropzone-file" type="file" className="hidden" />
                          <button type="button" onClick={() => handleDelete(image.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </button>
                        </label>
                      )
                    }

                  </>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label htmlFor="link-video" className="block mb-2 text-sm font-medium text-gray-900">Đường dẫn video</label>
                <button onClick={() => handleAddLinkImage("video")} type="button" data-tooltip-target="tooltip-default" data-tooltip-trigger="hover" className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                  </svg>
                </button>
              </div>
              {listImageAndVideo.filter(data => data.type === "video").map(image => (
                <div key={image.id} className="flex items-center justify-between gap-10 mb-3">
                  <input value={image.link} onChange={($event) => onChangeInput(image.id, $event.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://video..." required />
                  <button type="button" onClick={() => handleDelete(image.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>


            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>
            <textarea value={description} onChange={($event) => setDescription($event.target.value)} required id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">Thay đổi</button>
            <button style={{ marginLeft: 20 }} onClick={() => navigation('/project/edit')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">Quay lại</button>
          </form>
        </div>
      </LoadingComponent>
    </div>
  )
}

export default SettingProjectEditComponent;