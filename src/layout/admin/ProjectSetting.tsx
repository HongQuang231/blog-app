import { useEffect, useState } from "react";
import { dataNavbarDashboard } from "../../data/fakeData";
import NavbarComponent from "../../component/Navbar";
import { fetchUploadImage } from "../../api/uploadImage";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { IDataProject, iFromData } from "../../interface/ProjectInterface";
import { getListTags } from "../../api/tagApi";
import { ITag } from "./Tags";

const dropDownData = [
  {
    id: 1,
    value: "1"
  },
  {
    id: 2,
    value: "2"
  },
  {
    id: 3,
    value: "3"
  },
  {
    id: 4,
    value: "4"
  },
  {
    id: 5,
    value: "5"
  },
  {
    id: 6,
    value: "6"
  },
  {
    id: 7,
    value: "7"
  }, {
    id: 8,
    value: "8"
  },
  {
    id: 9,
    value: "9"
  },
  {
    id: 10,
    value: "10"
  },
]

const SettingProjectComponent = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'de0sqyhr9'
    }
  });
  const [tag, setTag] = useState<ITag>();
  const [listTags, setListTags] = useState<ITag[]>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listImageAndVideo, setListImageAndVideo] = useState<IDataProject[]>([
    {
      id: "0",
      link: '',
      type: 'image'
    },
    {
      id: '1',
      link: '',
      type: 'video'
    }
  ]);

  useEffect(() => {
    handleListTags();
  }, [])
  const onSubmitFrom = (event: any) => {
    event.preventDefault();
    const dataSubmit: iFromData = {
      title: title,
      description: description,
      dataImageVideo: JSON.stringify(listImageAndVideo),
      tagId: tag!.name
    }
    console.log(dataSubmit);

  }

  const handleAddLinkImage = (type: 'image' | 'video') => {
    setListImageAndVideo([...listImageAndVideo, {
      id: (listImageAndVideo.length).toString(),
      link: '',
      type: type,
    }])
  }

  const onChangeInput = (id: string, value: any) => {
    let valueScrope: any
    if (typeof value !== 'string') {
      valueScrope = value?.target?.files[0];
      const formData = new FormData()
      formData.append("file", valueScrope)
      formData.append('upload_preset', 'myrr387r')
      fetchUploadImage(formData).then((response) => {
        if (response.status === 200) {
          valueScrope = response.url
        }
      })
        .catch(() => valueScrope = '');

      // var reader = new FileReader();
      // reader.onload = function (event) {
      //   // The file's text will be printed here
      //   console.log(event.target?.result);
      //   valueScrope = event.target?.result
      // };
      // reader.readAsDataURL(value?.target?.files[0]);
    } else {
      valueScrope = value;
    }
    const newList = listImageAndVideo.map((data) => {
      if (data.id === id) {
        if (data.type === 'video') {

        }
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
    })
  }

  const handleChangeSelect = (id: string) => {
    const dataFilter = listTags?.filter(tags => tags.id === id)
    setTag(dataFilter && dataFilter[0])
  }

  return (
    <div>
      <NavbarComponent data={dataNavbarDashboard} />
      <div className="p-20">
        <form onSubmit={(e) => onSubmitFrom(e)}>
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn tag</label>
          <select onChange={($event) => handleChangeSelect($event.target.value)} required id="countries" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {listTags && listTags.map(data => <option value={data.id}>{data.name}</option>)}
          </select>
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
                          {/* <img src={image.link} className="w-full h-full" /> */}
                          <AdvancedImage cldImg={cld.image(image.link).resize(fill().width(250).height(250))} />
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
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
                <input value={image.link} onChange={($event) => onChangeInput(image.id, $event.target.value)} type="text" id="link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://video..." required />
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
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">Thêm</button>
        </form>
      </div>
    </div>
  )
}

export default SettingProjectComponent;