import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const PopularMedicalCamps = () => {
    const [camps,setCamps]=useState([])
    // console.log(camps);
    useEffect(()=>{
        fetch('https://medical-camp-server-site.onrender.com/medicalCamp')
        .then(res => res.json())
        .then(data => setCamps(data))
    },[])
    return (
        <div className="w-11/12 mx-auto py-10">
           <div className="text-center md:text-5xl text-2xl font-bold mb-12">
           <h2>Popular Medical Camps</h2>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3">
            {
                camps.map(camp => <div key={camp?._id} className="card bg-base-100  shadow-xl">
                    <figure>
                      <img
                      className="h-[300px] w-[500px] object-cover"
                        src={camp?.photo}
                        alt="camp" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{camp?.campName}</h2>
                      <h2 className="font-semibold text-gray-500">{camp?.location}</h2>
                     <div className="flex justify-between items-center gap-2">
                     <h3 className="text-gray-500 font-semibold">{camp?.healthcareName}</h3>
                        <h3 className="text-gray-500 font-semibold">{camp?.campFees}</h3>
                     </div>
                   
                     <div className="flex justify-between items-center gap-2">
                     <p className="text-gray-500 font-semibold">{camp?.date}</p>
                     <p className="text-gray-500 font-semibold">{camp?.participantCount}</p>
                     </div>
                    </div>
                  </div>)
            }
           </div>
           <div className="flex items-center py-8 justify-center">
           <Link to="/availableCamps"> <button className="btn bg-[#578E7E] hover:bg-[#219B9D] text-white">See All Camps</button></Link>
           </div>
        </div>
    );
};

export default PopularMedicalCamps;