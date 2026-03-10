import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaClock } from "react-icons/fa";
import { MdPeople, MdLocalHospital } from "react-icons/md";

const UpcomingCamps = () => {
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const res = await fetch("https://medical-camp-server-site.onrender.com/medicalCamp");
        const data = await res.json();

        console.log("API Data:", data);

        // API safe check
        const camps = Array.isArray(data) ? data : data?.data || [];

        // Filter upcoming if status exists
        const upcoming = camps
          .filter((camp) => !camp.status || camp.status === "upcoming")
          .slice(0, 3);

        setUpcomingCamps(upcoming);
      } catch (error) {
        console.log("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#F97316]/10 via-[#F97316]/5 to-[#0F766E]/10 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#0F766E]/20 rounded-full blur-xl opacity-70"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#F97316]/20 rounded-full blur-xl opacity-70"></div>
      </div>

      <div className="relative w-11/12 mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] px-6 py-2 rounded-full mb-4">
            <FaCalendarAlt />
            <span className="font-semibold">Don't Miss Out</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Medical Camps
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Register now for our upcoming medical camps and secure your spot
          </p>
        </div>

        {/* Camps Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {loading ? (

            /* Skeleton Loader */
            [1,2,3].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-xl"></div>
              </div>
            ))

          ) : upcomingCamps.length > 0 ? (

            upcomingCamps.map((camp) => (

              <div
                key={camp._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden"
              >

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={camp.photo || "https://i.ibb.co/2kR0h9C/medical-camp.jpg"}
                    alt={camp.campName}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                    <FaCalendarAlt className="text-[#0F766E]" />
                    {camp.date
                      ? new Date(camp.date).toLocaleDateString()
                      : "Date TBD"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {camp.campName || "Medical Camp"}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">

                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#F97316]" />
                      {camp.location || "Location TBD"}
                    </div>

                    <div className="flex items-center gap-2">
                      <FaUserMd className="text-[#0F766E]" />
                      {camp.healthcareName || "Healthcare Team"}
                    </div>

                    <div className="flex items-center gap-2">
                      <MdPeople className="text-[#F97316]" />
                      {camp.participantCount || 0} participants
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Seats Available</span>
                      <span className="font-semibold text-[#0F766E]">
                        {Math.max(0, 50 - (camp.participantCount || 0))} left
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#0F766E] to-[#F97316] h-2 rounded-full"
                        style={{
                          width: `${((camp.participantCount || 0) / 50) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Button */}
                  <Link to={`/camp/${camp._id}`}>
                    <button className="w-full bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
                      Register Now
                    </button>
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <p className="text-center col-span-3 text-gray-500">
              No upcoming camps available
            </p>

          )}

        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link to="/availableCamps">
            <button className="px-8 py-3 border-2 border-[#0F766E] text-[#0F766E] rounded-full font-semibold hover:bg-[#0F766E] hover:text-white transition">
              View All Camps
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default UpcomingCamps;