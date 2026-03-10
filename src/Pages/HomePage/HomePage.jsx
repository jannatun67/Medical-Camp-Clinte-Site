import Banner from "../../Components/Banner/Banner";
import Featured from "../../Components/Featured/Featured";
import PopularMedicalCamps from "../../Components/PopularMedicalCamps/PopularMedicalCamps";
import ScaleImpact from "../../Components/ScaleImpact/ScaleImpact";
import FAQ from "./FAQ";
import Gallery from "./Gallery";
// import AboutInformeation from "./AboutInformeation";
import HowItWorks from "./HowItWorks";
import MeetOurProfessionals from "./MeetOurProfessionals";
import OurImpact from "./OurImpact";
import Reviews from "./Reviews";
import StayConnected from "./StayConnected";
import UpcomingCamps from "./UpcomingCamps";
import WhyJoinOurCamps from "./WhyJoinOurCamps";


const HomePage = () => {
    return (
        <div >
           <Banner></Banner>
         <div className="">
             <PopularMedicalCamps></PopularMedicalCamps>
          <WhyJoinOurCamps></WhyJoinOurCamps>
          <HowItWorks></HowItWorks>
         <UpcomingCamps></UpcomingCamps>
          <Reviews></Reviews>
           <MeetOurProfessionals></MeetOurProfessionals>
           <Gallery></Gallery>
           <FAQ></FAQ>
         </div>
         <OurImpact></OurImpact>
          <StayConnected></StayConnected>
        </div>
    );
};

export default HomePage;