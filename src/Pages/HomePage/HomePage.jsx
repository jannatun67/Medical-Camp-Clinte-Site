import Banner from "../../Components/Banner/Banner";
import Featured from "../../Components/Featured/Featured";
import PopularMedicalCamps from "../../Components/PopularMedicalCamps/PopularMedicalCamps";
import ScaleImpact from "../../Components/ScaleImpact/ScaleImpact";
// import AboutInformeation from "./AboutInformeation";
import HowItWorks from "./HowItWorks";
import MeetOurProfessionals from "./MeetOurProfessionals";
import OurImpact from "./OurImpact";
import Reviews from "./Reviews";
import StayConnected from "./StayConnected";
import WhyJoinOurCamps from "./WhyJoinOurCamps";


const HomePage = () => {
    return (
        <div>
           <Banner></Banner>
          <PopularMedicalCamps></PopularMedicalCamps>
          <WhyJoinOurCamps></WhyJoinOurCamps>
          <HowItWorks></HowItWorks>
         
          <Reviews></Reviews>
           <MeetOurProfessionals></MeetOurProfessionals>
           <OurImpact></OurImpact>
          {/* <AboutInformeation></AboutInformeation> */}
          <Featured></Featured>
          <ScaleImpact></ScaleImpact>
          <StayConnected></StayConnected>
        </div>
    );
};

export default HomePage;