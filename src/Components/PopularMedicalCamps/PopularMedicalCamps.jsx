import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularMedicalCamps = () => {
  const [camps, setCamps] = useState([]);
  // console.log(camps);
  useEffect(() => {
    fetch("https://medical-camp-server-site.onrender.com/medicalCamp")
      .then((res) => res.json())
      .then((data) => setCamps(data));
  }, []);
  return (
    <div className="w-11/12 mx-auto py-20">
      <div className="text-center md:text-5xl text-2xl font-bold mb-16">
        <h2>Popular Medical Camps</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {camps.map((camp) => (
          <div key={camp?._id} className="card bg-base-100  shadow-sm">
            <figure>
              <img
                className="h-[200px] w-[500px] object-cover"
                src={camp?.photo}
                alt="camp"
              />
            </figure>
            <div className="p-4">
              <h2 className="card-title py-3">{camp?.campName}</h2>
              <h2 className="font-semibold text-gray-500 pb-2">
                {camp?.location}
              </h2>
              <h3 className="text-gray-500 font-semibold">
                {camp?.healthcareName}
              </h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">
                  {" "}
                  <p className="text-white font-semibold">
                    {camp?.participantCount}
                  </p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center py-8 justify-center">
        <Link to="/availableCamps">
          {" "}
          <button className="btn bg-indigo-600 hover:bg-indigo-800  text-white">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularMedicalCamps;
