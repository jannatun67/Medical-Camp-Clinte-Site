import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../../assets/banner/banner1.jpg"
import banner2 from "../../assets/banner/banner2.jpg"
import banner3 from "../../assets/banner/banner3.jpg"
import banner4 from "../../assets/banner/banner4.jpeg"

const Banner = () => {
    return (
        <div>
        <Carousel>
                <div className="md:h-[500px] h-[100px]">
                    <img className="md:h-full h-[100px] object-cover" src={banner1} />
                </div>
                <div className="md:h-[500px] h-[100px]">
                    <img className="md:h-full h-[100px] object-cover" src={banner2} />
                   
                </div>
                <div className="md:h-[500px] h-[100px] ">
                    <img className="md:h-full h-[100px] object-cover" src={banner3} />
                  
                </div>
                <div className="md:h-[500px] h-[100px]">
                    <img className="md:h-full h-[100px] object-cover" src={banner4} />
                  
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;