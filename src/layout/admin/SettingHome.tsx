import { useEffect, useReducer, useState } from "react";
import { dataNavbarDashboard } from "../../data/fakeData";
import NavbarComponent from "../../component/Navbar";
import { IHome } from "../../interface/MainPageInterface";
import { getHomeImage, putImageHome } from "../../api/homeApi";
import { useSelector } from "react-redux";

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

const SettingHomeComponent = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkImage, setLinkImage] = useState("");

  const [listDataHome, setListDataHome] = useState<IHome[]>()

  const accessToken = useSelector((state: any) => state.login.accessToken)

  useEffect(() => {
    handleLoadData();
  }, [])

  const handleLoadData = () => {
    getHomeImage().then((image) => {
      setListDataHome(image)

      setId(image[0].id);
      setTitle(image[0].title);
      setDescription(image[0].description);
      setLinkImage(image[0].linkImage);
    })
  }

  const onSubmitFrom = async (event: any) => {
    event.preventDefault();
    const dataSubmit: IHome = {
      id: id,
      title: title,
      description: description,
      linkImage: linkImage,
    }
    await putImageHome(dataSubmit, accessToken)
    handleLoadData();
  }

  const handleChangeSelect = (valueId: string) => {
    const dataById = listDataHome?.filter(item => item.id === valueId);
    if (dataById && dataById.length) {
      setId(dataById[0].id);
      setTitle(dataById[0].title);
      setDescription(dataById[0].description);
      setLinkImage(dataById[0].linkImage);
    }
  }

  return (
    <div>
      <NavbarComponent data={dataNavbarDashboard} />
      <div className="p-20">
        <form onSubmit={(e) => onSubmitFrom(e)}>
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn ảnh số</label>
          <select value={id} onChange={($event) => handleChangeSelect($event.target.value)} required id="countries" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {listDataHome && listDataHome.map((data, index) => <option value={data.id}>{index + 1}</option>)}
          </select>
          <div className="mb-6">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Tên ảnh</label>
            <input value={title} onChange={($event) => setTitle($event.target.value)} type="text" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên ảnh" required />
          </div>
          <div className="mb-6">
            <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900">Đường dẫn hình ảnh</label>
            <input value={linkImage} onChange={($event) => setLinkImage($event.target.value)} type="text" id="link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://image..." required />
          </div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>
          <textarea value={description} onChange={($event) => setDescription($event.target.value)} required id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">Thay đổi</button>
        </form>
      </div>
    </div>
  )
}

export default SettingHomeComponent;