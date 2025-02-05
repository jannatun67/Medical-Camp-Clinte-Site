import { Outlet } from "react-router-dom";
import Navbar from "../../Sheard/Navbar";
import Footer from "../../Sheard/Footer";

const MainLayout = () => {
    return (
        <div>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
    );
};

export default MainLayout;