import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { dataContactUs, navigation } from "../data/fakeData";
import HeaderBarComponent from "../component/HeaderBar";
import FooterComponent from "../component/FooterComponent";
import ContactUsItem from "../component/ContactUsItem";

const ContractUsComponent = () => {
  return (
    <>
      <HeaderBarComponent />
      <div className="px-6">
        <div className="pb-40">
          <div className="grid-grap-css-xs grid sm:gap-40 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 pt-40 place-items-center">
            {dataContactUs.map(contact => <ContactUsItem {...contact} />)}

          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}

export default ContractUsComponent;