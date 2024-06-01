import React, { useEffect } from "react"
import img1 from "../assets/images/img1.jpg"
import img2 from "../assets/images/img2.jpg"
import img3 from "../assets/images/img3.jpg"
import img4 from "../assets/images/img4.jpg"
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import image4 from "../assets/images/image4.jpg"


export default function Test() {
  let timeRunning = 3000;
  let timeAutoNext = 7000;
  // let runTimeOut;
  // let runNextAuto = setTimeout(() => {
  //   next.click();
  // }, timeAutoNext);


  return (
    <>
      <div className="carousel">

        <div className="list">
          <div className="item">
            <img src={img1} />
            <div className="content">
              <div className="author">CALLMEREV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">PHOTOGRAPH</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab et
                quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
                nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
              </div>
            </div>
          </div>
          <div className="item">
            <img src={img2} />
            <div className="content">
              <div className="author">CALLMEREV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">PHOTOGRAPH</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab et
                quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
                nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
              </div>

            </div>
          </div>
          <div className="item">
            <img src={img3} />
            <div className="content">
              <div className="author">CALLMEREV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">PHOTOGRAPH</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab et
                quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
                nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
              </div>
            </div>
          </div>
          <div className="item">
            <img src={img4} />
            <div className="content">
              <div className="author">CALLMEREV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">PHOTOGRAPH</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab et
                quasi ducimus aut doloribus non numquam. Explicabo, laboriosam
                nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
              </div>
            </div>
          </div>
        </div>

        <div className="thumbnail">
          <div className="item">
            <img src={img1} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
          <div className="item">
            <img src={img2} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
          <div className="item">
            <img src={img3} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
          <div className="item">
            <img src={img4} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
        </div>


        {/* <div className="arrows">
          <button onClick={() => showSlider("prev")} id="prev">prev</button>
          <button onClick={() => showSlider("next")} id="next">next</button>
        </div> */}

        <div className="time"></div>
      </div>
    </>
  )
}