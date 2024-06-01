import { Swiper, SwiperSlide } from 'swiper/react';
import { dataNavbarProjet, products } from "../data/fakeData";
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
import { getYoutubeVideoPath } from '../utlis/func';
import * as A from 'antd';
import { getListTags } from '../api/tagApi';
import { ITag } from './admin/Tags';


const ProjectComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<iFromData[]>();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [listTags, setListTags] = useState<ITag[]>()
  const [activeKeyChange, setActiveKeyChange] = useState<string>()

  useEffect(() => {
    getListTag()
  }, []);

  const handleLoadData = (props: IGetProject) => {
    const { currentPage, pageSize, tagId } = props
    getDataProject({ currentPage: currentPage, pageSize: pageSize, tagId: tagId }).then((res) => {
      setProducts(res.data);
      setTotalItems(res.totalPage);
    });
  }

  const getListTag = () => {
    getListTags().then((res) => {
      setListTags(res)
      const data: IGetProject = {
        currentPage: currentPage + 1,
        pageSize: 8,
        tagId: res[0].id
      }
      handleLoadData(data);
    })
  }

  const handleChangeTab = (tagId: string) => {
    setActiveKeyChange(tagId);
    const data: IGetProject = {
      currentPage: 1,
      pageSize: 8,
      tagId: tagId
    }
    handleLoadData(data)
  }

  const handleChangePage = (page: any) => {
    console.log(page);
    const data: IGetProject = {
      currentPage: page,
      pageSize: 8,
      tagId: activeKeyChange!
    }
    // handleLoadData(data)
    // setCurrentPage(page)
  }
  return (
    <>
      <HeaderBarComponent />
      <div className="px-6">
        <div className="pb-20">
          <A.Tabs
            defaultActiveKey="1"
            tabPosition={"top"}
            style={{ height: 220 }}
            items={listTags && listTags.map((tag) => {
              return {
                label: tag.name,
                key: tag.id,
                // children: `Content of tab ${tag.id}`,
              };
            })}
            onChange={(activeKey) => handleChangeTab(activeKey)}
          />
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products && products.map((product) => (
              <div style={{ cursor: "pointer" }} key={product.id} className="group">
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
                      JSON.parse(product.dataImageVideo).length > 0 && JSON.parse(product.dataImageVideo).map((data: any) => {
                        if (data.type === "video") {
                          return (
                            <SwiperSlide key={data.link}>
                              <iframe width="100%" height="315"
                                allowFullScreen
                                src={getYoutubeVideoPath(data.link)}
                              >
                              </iframe>
                            </SwiperSlide>
                          )
                        } else if (data.type === "image") {
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
                <h2 className="mt-4 text-sm text-gray-700 font-medium animate-flip-up">{product.title}</h2>
                <h2 className="mt-1 text-xs text-gray-500 font-normal animate-flip-up">{product.description}</h2>
                <div className='flex items-center justify-between mt-2 animate-flip-up'>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.tagId}</p>
                  <button onClick={() => setShowModal(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full'>{product.description}</button>
                </div>
                {showModal && <ModalComponent showModal={showModal} setShowModal={setShowModal} data={product} />}
              </div>
            ))}
          </div>
          {
            totalItems >= 0 && (
              <div className='mt-10 flex items-end justify-center'>
                <A.Pagination pageSize={8} defaultCurrent={currentPage} total={100} onChange={(e) => handleChangePage(e)}/>
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