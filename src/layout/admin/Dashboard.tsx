import NavbarComponent from "../../component/Navbar";
import { dataNavbarDashboard } from "../../data/fakeData";

const DashboardComponent = () => {
  return (
    <>
      <NavbarComponent data={dataNavbarDashboard}/>
    </>
  )
}

export default DashboardComponent;