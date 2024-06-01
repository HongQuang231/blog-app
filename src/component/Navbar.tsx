import { NavLink } from "react-router-dom";
import { getListTags } from "../api/tagApi";

interface iNavbar {
  id: number;
  name: string;
  link: string;
  isSelected: boolean;
  icon: string;
}

interface navbar {
  data: iNavbar[]
}

const NavbarComponent = (props: navbar) => {
  return (
    <div className="border-b border-gray-200 mb-10">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {props.data && props.data.map((navbarItem: iNavbar) => (
          <li key={navbarItem.id} className="me-2">
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "rgb(37 99 235)" : "rgb(107 114 128)",
                  borderBottomWidth: isActive ? 2 : 0,
                  borderColor: isActive ? "rgb(37 99 235)" : "unset"
                };
              }}
              to={navbarItem.link} className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
              {navbarItem.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavbarComponent;