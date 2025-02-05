import Banner from "../../Components/Banner/Banner";
import PopularMedicalCamps from "../../Components/PopularMedicalCamps/PopularMedicalCamps";
import AboutInformeation from "./AboutInformeation";
import Reviews from "./Reviews";


const HomePage = () => {
    return (
        <div>
           <Banner></Banner>
          <PopularMedicalCamps></PopularMedicalCamps>
          <Reviews></Reviews>
          <AboutInformeation></AboutInformeation>
        </div>
    );
};

export default HomePage;