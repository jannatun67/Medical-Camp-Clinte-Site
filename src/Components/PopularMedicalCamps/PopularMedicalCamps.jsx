import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";

const PopularMedicalCamps = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetch("https://medical-camp-server-site.onrender.com/medicalCamp")
      .then((res) => res.json())
      .then((data) => setCamps(data.slice(0, 6)));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F766E]/5 via-[#0F766E]/10 to-[#F97316]/5 py-20">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#0F766E]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#F97316]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-[#0F766E]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 right-20 w-72 h-72 bg-[#F97316]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>

      <div className="relative w-11/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#0F766E]/10 text-[#0F766E] rounded-full text-sm font-semibold mb-4">
            🔥 Popular Camps
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Most{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Requested
            </span>{" "}
            Medical Camps
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of participants who have benefited from our most popular medical camps
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {camps.map((camp, index) => (
            <div
              key={camp?._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={camp?.photo}
                  alt={camp?.campName}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="flex items-center gap-2 text-[#0F766E] font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    #{index + 1} Popular
                  </span>
                </div>

                {/* Participant Count */}
                <div className="absolute bottom-4 right-4 bg-[#F97316] text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="flex items-center gap-2">
                    <MdPeople className="text-lg" />
                    <span className="font-bold">{camp?.participantCount}+</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                  {camp?.campName}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaLocationDot className="text-[#0F766E] flex-shrink-0" />
                    <span className="text-sm">{camp?.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUserDoctor className="text-[#F97316] flex-shrink-0" />
                    <span className="text-sm font-medium">{camp?.healthcareName}</span>
                  </div>
                </div>

                {/* View Details Button */}
                 <Link to={`/camp-details/${camp?._id}`}>
                    <button className="w-full bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white py-3 rounded-xl font-semibold hover:from-[#115E59] hover:to-[#EA580C] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn">
                      View Details
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </Link>

              </div>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="flex items-center py-12 justify-center">
          <Link to="/availableCamps">
            <button className="group relative px-8 py-4 bg-white text-[#0F766E] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-[#0F766E]">
              <span className="relative z-10 flex items-center gap-2">
                Explore All Camps
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/10 to-[#F97316]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularMedicalCamps;