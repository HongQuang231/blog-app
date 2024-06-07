import { Swiper, SwiperSlide } from 'swiper/react';
import { dataNavbarDashboard, dataNavbarProjet, products } from "../data/fakeData";
import HeaderBarComponent from "../component/HeaderBar";
import FooterComponent from "../component/FooterComponent";
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NavbarComponent from '../component/Navbar';
import PaginationComponent from '../component/PaginationCustom';
import { useEffect, useState } from 'react';
import ModalComponent from '../component/ModalComponent';
import { iFromData } from '../interface/ProjectInterface';
import { IGetProject, getDataProject } from '../api/projectApi';
import { formatDate, getYoutubeVideoPath, splitText } from '../utlis/func';
import * as A from 'antd';
import { getListTags } from '../api/tagApi';
import { ITag } from './admin/Tags';
import LoadingComponent from '../component/LoadingComponent';
import { PhotoView } from 'react-photo-view';
import { useLocation, useNavigate } from 'react-router-dom';


const ProjectComponent = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<iFromData[]>();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [listTags, setListTags] = useState<ITag[]>()
  const [activeKeyChange, setActiveKeyChange] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getListTag()
  }, []);

  const handleLoadData = (props: IGetProject) => {
    setIsLoading(true)
    const { currentPage, pageSize, tagId } = props
    getDataProject({ currentPage: currentPage, pageSize: pageSize, tagId: tagId }).then((res) => {
      setProducts(res.data);
      setTotalItems(res.totalPage);
      setIsLoading(false)
    })
      .catch(() => setIsLoading(false));
  }

  const getListTag = () => {
    getListTags().then((res) => {
      setListTags(res)
      const data: IGetProject = {
        currentPage: currentPage,
        pageSize: 4,
        tagId: res[0].id
      }
      setActiveKeyChange(res[0].id)
      handleLoadData(data);
    })
  }

  const handleChangeTab = (tagId: string) => {
    setActiveKeyChange(tagId);
    const data: IGetProject = {
      currentPage: 1,
      pageSize: 4,
      tagId: tagId
    }
    handleLoadData(data)
  }

  const handleChangePage = (page: any) => {
    console.log(page);
    const data: IGetProject = {
      currentPage: page,
      pageSize: 4,
      tagId: activeKeyChange!
    }
    handleLoadData(data)
    setCurrentPage(page)
  }
  return (
    <>
      {location.pathname !== '/project/edit' ? <HeaderBarComponent /> : <NavbarComponent data={dataNavbarDashboard} />}
      <div className="px-6">
        <div className="pb-20">
          <A.Tabs
            tabPosition={"top"}
            items={listTags && listTags.map((tag) => {
              return {
                label: tag.name,
                key: tag.id,
                // children: `Content of tab ${tag.id}`,
              };
            })}
            onChange={(activeKey) => handleChangeTab(activeKey)}
          />
          <LoadingComponent isLoading={isLoading}>
            {products && products.length > 0 ? (
              <div style={{ minHeight: 600 }} className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div style={{ cursor: "pointer", marginTop: 20 }} key={product.id} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <Swiper
                        spaceBetween={30}
                        effect={'fade'}
                        navigation={true}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[EffectFade, Navigation, Pagination]}
                        className="mySwiper"
                        style={{ height: 315, width: "100%" }}
                      >
                        {
                          JSON.parse(product.dataProject).length > 0 && JSON.parse(product.dataProject).map((data: any) => {
                            if (data.type === "video" && data.link !== '') {
                              return (
                                <SwiperSlide key={data.link}>
                                  <iframe width="100%" height="315"
                                    allowFullScreen
                                    src={getYoutubeVideoPath(data.link)}
                                  >
                                  </iframe>
                                </SwiperSlide>
                              )
                            } else if (data.type === "image" && data.link !== '') {
                              return (
                                <SwiperSlide key={data.link}>
                                  <img style={{ height: 315, width: "100%" }} src={data.link} />
                                </SwiperSlide>
                              )
                            }
                          })
                        }

                      </Swiper>
                    </div>
                    <h2 className="mt-4 text-lg text-gray-700 font-medium animate-flip-up">{product.name}</h2>
                    <A.Tooltip title={product.description}>
                      <h2 className="mt-1 text-xs text-gray-500 font-normal animate-flip-up">{splitText(product.description, 100)}</h2>
                    </A.Tooltip>
                    <div className='flex items-center justify-between mt-2 animate-flip-up'>
                      <p className="mt-1 text-sm font-normal text-gray-900">{formatDate(product.updatedDate)}</p>
                      {location.pathname !== '/project/edit' && (
                        <button onClick={() => navigation(`/detail/${product.id}`,)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full'>{'Chi tiết'}</button>
                      )}
                      {location.pathname == '/project/edit' && (
                        <button onClick={() => navigation(`/dashboard/setting-project-edit/${product.id}`,)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full'>{'Chỉnh sửa'}</button>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            ) : <A.Empty imageStyle={{ height: 200 }} />}
          </LoadingComponent>
          {
            totalItems >= 0 && (
              <div className='mt-10 flex items-end justify-center'>
                <A.Pagination pageSize={4} defaultCurrent={currentPage} total={totalItems * 4} onChange={(e) => handleChangePage(e)} />
              </div>
            )
          }
        </div>
      </div>


      <FooterComponent />
    </>
  )
}

export default ProjectComponent;