import {  useLoaderData, useParams } from "react-router-dom";
import JoinCamp from "../JoinCamp/JoinCamp";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic, { axiosPublic } from "../../UseHook/UseAxiosPublic";

const CampDetails = () => {
  const {id}= useParams()
 const axiosPublic= UseAxiosPublic()
  const {data : camp =[],refetch, isRefetching} = useQuery({
    queryKey:'data',
    queryFn:async ()=>{
      const res = await axiosPublic.get(`medicalCamps/${id}`)
      return res.data
    }
  })
  // const camp = useLoaderData();
  // console.log(camp);
  return (
    <div className="flex justify-center py-10">
      <div className="card bg-base-100  shadow-xl">
        <figure>
          <img
            className="w-[500px] h-[300px] object-cover "
            src={camp?.photo}
            alt="camp"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl">{camp?.campName}</h2>
          <h2 className="font-semibold text-gray-500 text-xl">
            {camp?.location}
          </h2>
          <p className="text-gray-500">{camp?.description}</p>
          <div className="flex justify-between items-center gap-2">
            <h3 className="text-gray-500 font-semibold">
              {camp?.healthcareName}
            </h3>
            <h3 className="text-gray-500 font-semibold">{camp?.campFees}</h3>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p className="text-gray-500 font-semibold">{camp?.date}</p>
            <p className="text-gray-500 font-semibold">
              {camp?.participantCount}
            </p>
          </div>

          <div className="card-actions justify-end">
        
            <button
              className="btn bg-[#578E7E] hover:bg-[#219B9D] text-white"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Join Camp
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div>
                  <JoinCamp camp={camp} refetch={refetch}></JoinCamp>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
