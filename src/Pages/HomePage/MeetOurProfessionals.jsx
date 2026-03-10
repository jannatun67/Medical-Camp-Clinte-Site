import { FaStar, FaLinkedin, FaTwitter } from "react-icons/fa";

const professionals = [
  {
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiologist",
    experience: "15+ years",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
  },
  {
    name: "Dr. James Patel",
    specialty: "Pediatrician",
    experience: "12+ years",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 4.8,
  },
  {
    name: "Dr. Olivia Kim",
    specialty: "Dermatologist",
    experience: "10+ years",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.9,
  },
  {
    name: "Dr. Ethan Rodriguez",
    specialty: "General Physician",
    experience: "20+ years",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5.0,
  },
];

const MeetOurProfessionals = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#F97316]/10 via-[#F97316]/5 to-[#0F766E]/10">
      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(30deg, #0F766E 12%, transparent 12.5%, transparent 87%, #0F766E 87.5%, #0F766E), linear-gradient(150deg, #F97316 12%, transparent 12.5%, transparent 87%, #F97316 87.5%, #F97316)',
        backgroundSize: '80px 140px',
        backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0'
      }}></div>
      
      <div className="relative w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#F97316]/20 text-[#F97316] rounded-full text-sm font-semibold mb-4">
            Expert Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our{" "}
            <span className="relative">
              Healthcare Heroes
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[#0F766E]/20 rounded-full opacity-40"></div>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experienced, compassionate, and dedicated professionals ensuring quality care
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((pro, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F766E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-colors">
                    <FaLinkedin />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#F97316] hover:bg-[#F97316] hover:text-white transition-colors">
                    <FaTwitter />
                  </button>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-[#0F766E] transition-colors">
                  {pro.name}
                </h3>
                <p className="text-[#F97316] font-semibold mb-2">{pro.specialty}</p>
                
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full text-sm font-medium">
                    {pro.experience}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <FaStar className="text-sm" />
                    <span className="text-gray-700 font-medium">{pro.rating}</span>
                  </span>
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white rounded-xl font-semibold hover:from-[#115E59] hover:to-[#EA580C] transition-all duration-300 transform hover:scale-105">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurProfessionals;