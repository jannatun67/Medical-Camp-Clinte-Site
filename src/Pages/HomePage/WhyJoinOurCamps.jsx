import { FaHeartPulse, FaStethoscope, FaUsers, FaShieldHeart } from "react-icons/fa6";

const benefits = [
  {
    title: "Free or Affordable Healthcare",
    description: "Access essential medical services without the financial burden.",
    icon: FaHeartPulse,
    color: "from-[#0F766E] to-[#F97316]",
    bgColor: "bg-[#0F766E]/10",
    iconColor: "text-[#0F766E]",
  },
  {
    title: "Qualified Doctors & Staff",
    description: "All camps are run by certified medical professionals.",
    icon: FaStethoscope,
    color: "from-[#F97316] to-[#0F766E]",
    bgColor: "bg-[#F97316]/10",
    iconColor: "text-[#F97316]",
  },
  {
    title: "Community Health Awareness",
    description: "Promote wellness and preventive care in underserved areas.",
    icon: FaUsers,
    color: "from-[#0F766E] to-[#0F766E]",
    bgColor: "bg-[#0F766E]/10",
    iconColor: "text-[#0F766E]",
  },
  {
    title: "Safe & Secure Environment",
    description: "Camps follow strict hygiene and safety protocols.",
    icon: FaShieldHeart,
    color: "from-[#F97316] to-[#F97316]",
    bgColor: "bg-[#F97316]/10",
    iconColor: "text-[#F97316]",
  },
];

const WhyJoinOurCamps = () => {
  return (
    <section className="relative py-24 bg-[#f8fafc]">
      {/* Dot Pattern Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0F766E]/10 rounded-full mb-6">
            <FaHeartPulse className="w-10 h-10 text-[#F97316] animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Join Our{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Medical Camps?
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience quality healthcare with compassion and care
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className={`relative mb-6 ${item.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-8 h-8 ${item.iconColor}`} />

                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#0F766E] transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Gradient Line */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${item.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinOurCamps;