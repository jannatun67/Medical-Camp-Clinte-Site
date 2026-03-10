import { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { FaSearch, FaMapMarkerAlt, FaUserMd, FaCalendarAlt, FaUsers, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";
import OurAchievements from "./OurAchievements";


const AvailableCamps = () => {
  const [grid, setGrid] = useState(true);
  const axiosPublic = UseAxiosPublic();

  const handleGrid = (value) => {
    setGrid(value);
  };

  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosPublic.get("/medicalCamps")
      .then((res) => {
        setCamps(res.data);
        setFilteredCamps(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching camps:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = camps.filter(
      (camp) =>
        camp.campName?.toLowerCase().includes(query.toLowerCase()) ||
        camp.healthcareName?.toLowerCase().includes(query.toLowerCase()) ||
        camp.location?.toLowerCase().includes(query.toLowerCase()) ||
        camp.description?.toLowerCase().includes(query.toLowerCase()) ||
        camp.date?.includes(query)
    );
    setFilteredCamps(filtered);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    
    let sorted = [...filteredCamps];
    
    if (option === 'mostRegistered') {
      sorted.sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0));
    } else if (option === 'campFees') {
      sorted.sort((a, b) => (a.campFees || 0) - (b.campFees || 0)); 
    } else if (option === 'alphabetical') {
      sorted.sort((a, b) => (a.campName || '').localeCompare(b.campName || ''));
    }
    
    setFilteredCamps(sorted);
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
   <>
    <div className="min-h-screen bg-gradient-to-br from-[#0F766E]/5 via-white to-[#F97316]/5 py-12">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#0F766E]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#F97316]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative w-11/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#F97316]/10 text-[#F97316] rounded-full text-sm font-semibold mb-4">
            🏥 Find Your Care
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Available{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Medical Camps
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and join medical camps near you. Quality healthcare at your doorstep.
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Grid/List Toggle */}
            <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-xl">
              <button
                onClick={() => handleGrid(true)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  grid 
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white shadow-lg' 
                    : 'text-gray-500 hover:text-[#0F766E]'
                }`}
              >
                <BsFillGrid3X3GapFill size={20} />
              </button>
              <button
                onClick={() => handleGrid(false)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  !grid 
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white shadow-lg' 
                    : 'text-gray-500 hover:text-[#F97316]'
                }`}
              >
                <BsListUl size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#0F766E] transition-colors" />
                <input
                  onChange={handleSearch}
                  type="text"
                  value={searchQuery}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all duration-300"
                  placeholder="Search camps, doctors, locations..."
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-64">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all duration-300 bg-white cursor-pointer appearance-none"
              >
                <option value="">📊 Sort By</option>
                <option value="mostRegistered">👥 Most Registered</option>
                <option value="campFees">💰 Lowest Fees</option>
                <option value="alphabetical">📝 Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Search Stats */}
          {searchQuery && (
            <div className="mt-4 text-sm text-gray-600">
              Found <span className="font-bold text-[#0F766E]">{filteredCamps.length}</span> camps matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Camps Grid */}
        {loading ? (
          // Loading Skeleton
          <div className={`grid ${grid ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : filteredCamps.length > 0 ? (
          <div className={`grid ${
            grid 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'md:grid-cols-2'
          } gap-6 transition-all duration-500`}>
            {filteredCamps.map((camp) => (
              <div
                key={camp?._id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={camp?.photo || "https://via.placeholder.com/400x300"}
                    alt={camp?.campName}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Fee Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="flex items-center gap-1 font-semibold">
                      <FaDollarSign />
                      {camp?.campFees || 0}
                    </span>
                  </div>

                  {/* Participant Count Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#0F766E]">
                      <FaUsers className="text-[#F97316]" />
                      {camp?.participantCount || 0}+ Registered
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-[#0F766E] transition-colors">
                    {camp?.campName}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-[#F97316] flex-shrink-0" />
                      <span className="text-sm">{camp?.location || "Location not specified"}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaUserMd className="text-[#0F766E] flex-shrink-0" />
                      <span className="text-sm font-medium">{camp?.healthcareName || "Healthcare provider"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="text-[#F97316] flex-shrink-0" />
                      <span className="text-sm">{camp?.date ? formatDate(camp.date) : "Date TBA"}</span>
                    </div>
                  </div>

                  {/* Description Preview */}
                  {camp?.description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {camp.description}
                    </p>
                  )}

                  {/* Action Button */}
                  <Link to={`/camp-details/${camp?._id}`}>
                    <button className="w-full bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white py-3 rounded-xl font-semibold hover:from-[#115E59] hover:to-[#EA580C] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn">
                      View Details
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#F97316]/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#0F766E]/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        ) : (
          // No Results Found
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
              <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Camps Found</h3>
              <p className="text-gray-500 mb-6">We couldn't find any camps matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilteredCamps(camps);
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white rounded-xl font-semibold hover:from-[#115E59] hover:to-[#EA580C] transition-all duration-300"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {filteredCamps.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700">
                <span className="font-bold text-[#0F766E]">{filteredCamps.length}</span> camps available
              </span>
              <span className="w-px h-6 bg-gray-300"></span>
              <span className="text-gray-700">
                <span className="font-bold text-[#F97316]">
                  {filteredCamps.reduce((acc, camp) => acc + (camp.participantCount || 0), 0)}
                </span> total participants
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Add required animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>

    <OurAchievements></OurAchievements>
   
       
   </>
  );
};

export default AvailableCamps;