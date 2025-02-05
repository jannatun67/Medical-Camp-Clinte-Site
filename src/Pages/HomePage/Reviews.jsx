import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Reviews = () => {
  const axiosPublic = UseAxiosPublic();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    }
  });
  // console.log(feedbacks);

  return (
    <div className="w-11/12 mx-auto mb-10 ">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback?._id}>
            <div className="space-y-4 m-24 flex justify-center flex-col items-center">
              <img className="rounded-full " src={feedback?.photo} alt="" />
              <div>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={feedback?.number}
                  readOnly
                />
              </div>
              <p>{feedback?.feedback}</p>
              <h2 className="text-2xl font-semibold">{feedback?.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
