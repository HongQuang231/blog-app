import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { dataContactUs, navigation } from "../data/fakeData";
import HeaderBarComponent from "../component/HeaderBar";
import FooterComponent from "../component/FooterComponent";
import ContactUsItem from "../component/ContactUsItem";

const AboutComponent = () => {
  return (
    <>
      <HeaderBarComponent />
      <div className="px-6">
        <div className="pb-40">
          <div className="p-20">
            <div className="font-semibold leading-10 text-xl">INTRODUCING A COMPANY</div>
            <div className="leading-8 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam deleniti quisquam expedita enim maxime corporis repellat similique possimus? Numquam voluptatibus eveniet incidunt ullam consectetur explicabo eos architecto doloremque quo. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi animi explicabo saepe fuga in porro consequatur laudantium cupiditate, ullam sit velit, aliquam accusamus repellendus beatae, recusandae molestias assumenda corporis. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quis ex aliquam! Nemo corrupti hic reiciendis dolorum rerum voluptatibus, sed perspiciatis quis nisi delectus obcaecati laborum, eius laboriosam, explicabo minus! <br />
            </div>

            <div className="font-semibold leading-10 text-xl pt-10">INTRODUCING A COMPANY</div>
            <div className="leading-8 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam deleniti quisquam expedita enim maxime corporis repellat similique possimus? Numquam voluptatibus eveniet incidunt ullam consectetur explicabo eos architecto doloremque quo. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi animi explicabo saepe fuga in porro consequatur laudantium cupiditate, ullam sit velit, aliquam accusamus repellendus beatae, recusandae molestias assumenda corporis. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quis ex aliquam! Nemo corrupti hic reiciendis dolorum rerum voluptatibus, sed perspiciatis quis nisi delectus obcaecati laborum, eius laboriosam, explicabo minus! <br />
            </div>
          </div>
          <div className="pl-20 pr-20 grid-grap-css-xs-is-about grid sm:gap-40 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 pt-40 place-items-center">
            {dataContactUs.map(contact => <ContactUsItem {...contact} isAboutUs={true} />)}
          </div>

          <div className="p-20">
            <div className="font-semibold leading-10 text-xl">INTRODUCING A COMPANY</div>
            <div className="leading-8 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam deleniti quisquam expedita enim maxime corporis repellat similique possimus? Numquam voluptatibus eveniet incidunt ullam consectetur explicabo eos architecto doloremque quo. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi animi explicabo saepe fuga in porro consequatur laudantium cupiditate, ullam sit velit, aliquam accusamus repellendus beatae, recusandae molestias assumenda corporis. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quis ex aliquam! Nemo corrupti hic reiciendis dolorum rerum voluptatibus, sed perspiciatis quis nisi delectus obcaecati laborum, eius laboriosam, explicabo minus! <br />
            </div>

            <div className="font-semibold leading-10 text-xl pt-10">INTRODUCING A COMPANY</div>
            <div className="leading-8 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam deleniti quisquam expedita enim maxime corporis repellat similique possimus? Numquam voluptatibus eveniet incidunt ullam consectetur explicabo eos architecto doloremque quo. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi animi explicabo saepe fuga in porro consequatur laudantium cupiditate, ullam sit velit, aliquam accusamus repellendus beatae, recusandae molestias assumenda corporis. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quis ex aliquam! Nemo corrupti hic reiciendis dolorum rerum voluptatibus, sed perspiciatis quis nisi delectus obcaecati laborum, eius laboriosam, explicabo minus! <br />
            </div>

            <div className="font-semibold leading-10 text-xl pt-10">INTRODUCING A COMPANY</div>
            <div className="leading-8 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam deleniti quisquam expedita enim maxime corporis repellat similique possimus? Numquam voluptatibus eveniet incidunt ullam consectetur explicabo eos architecto doloremque quo. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi animi explicabo saepe fuga in porro consequatur laudantium cupiditate, ullam sit velit, aliquam accusamus repellendus beatae, recusandae molestias assumenda corporis. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quis ex aliquam! Nemo corrupti hic reiciendis dolorum rerum voluptatibus, sed perspiciatis quis nisi delectus obcaecati laborum, eius laboriosam, explicabo minus! <br />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}

export default AboutComponent;