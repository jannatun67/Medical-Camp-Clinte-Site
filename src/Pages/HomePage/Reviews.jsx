import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Reviews = () => {
  const axiosPublic = UseAxiosPublic();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    }
  });

  return (
    <section className="relative py-24 bg-gradient-to-r from-[#0F766E]/10 via-[#F97316]/10 to-[#0F766E]/10 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0F766E]/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F97316]/20 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Participants
            </span>{" "}
            Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who have experienced our medical camps
          </p>
        </div>

        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper"
          loop={true}
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback?._id}>
              <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative">
                  <FaQuoteLeft className="absolute top-8 left-8 text-4xl text-[#0F766E]/20" />
                  <FaQuoteRight className="absolute bottom-8 right-8 text-4xl text-[#F97316]/20" />

                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="relative mb-6">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#F97316] shadow-xl">
                        <img 
                          className="w-full h-full object-cover" 
                          src={feedback?.photo || "https://randomuser.me/api/portraits/women/44.jpg"} 
                          alt={feedback?.name}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                    </div>

                    <div className="mb-4">
                      <Rating
                        style={{ maxWidth: 180 }}
                        value={feedback?.number}
                        readOnly
                      />
                    </div>

                    <p className="text-gray-700 text-lg md:text-xl mb-6 italic leading-relaxed">
                      "{feedback?.feedback}"
                    </p>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {feedback?.name}
                    </h3>
                    
                    <p className="text-[#F97316] font-medium">
                      Verified Participant
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Styles */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: #F97316;
            background: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 20px;
          }
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #F97316;
            opacity: 0.3;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
            width: 30px;
            border-radius: 5px;
            background: #0F766E;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Reviews;