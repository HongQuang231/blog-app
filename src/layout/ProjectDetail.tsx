import { useLocation } from "react-router-dom";
import HeaderBarComponent from "../component/HeaderBar";
import { useEffect, useState } from "react";
import { iFromData } from "../interface/ProjectInterface";
import { getDataProjectById } from "../api/projectApi";
import { getYoutubeVideoPath } from "../utlis/func";
import FooterComponent from "../component/FooterComponent";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ProjectDetailComponent = () => {
  const location = useLocation();
  const [data, setData] = useState<iFromData>()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    getDataProjectById(location.pathname.split('/')[2]).then(data => {
      setData(data)
    })
      .finally(() => setIsLoading(false))
  }, [])
  return (
    <>
      <HeaderBarComponent />
      <PhotoProvider
        speed={() => 800}
        easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
      >
        {data && (
          <div className="container mb-4">
            <div className="text-center text-lg font-bold">{data.name}</div>
            <div className="text-md font-normal my-3">{data.description}</div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {
                data.dataProject && JSON.parse(data.dataProject).map((item: any) => {
                  if (item.type === "video" && item.link !== '') {
                    return (
                      <div key={item.link}>
                        <iframe width="100%" height="315"
                          allowFullScreen
                          src={getYoutubeVideoPath(item.link)}
                        >
                        </iframe>
                      </div>
                    )
                  } else if (item.type === "image" && item.link !== '') {
                    return (
                      <div key={item.link}>

                        <PhotoView src={item.link}>
                          <img style={{ height: 315, width: "100%" }} src={item.link} />
                        </PhotoView>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
        )}
      </PhotoProvider>
      {!isLoading && <FooterComponent />}
    </>
  )
}

export default ProjectDetailComponent;