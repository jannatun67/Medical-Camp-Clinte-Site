import { FaHeartbeat, FaUsers, FaUserMd, FaGlobeAsia } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    label: "Camps Organized",
    value: 120,
    icon: FaHeartbeat,
    color: "from-[#0F766E] to-[#F97316]",
    bgColor: "bg-[#0F766E]/10",
    iconColor: "text-[#0F766E]",
  },
  {
    label: "Participants Served",
    value: 5200,
    icon: FaUsers,
    color: "from-[#F97316] to-[#0F766E]",
    bgColor: "bg-[#F97316]/10",
    iconColor: "text-[#F97316]",
  },
  {
    label: "Healthcare Professionals",
    value: 85,
    icon: FaUserMd,
    color: "from-[#0F766E] to-[#0F766E]",
    bgColor: "bg-[#0F766E]/10",
    iconColor: "text-[#0F766E]",
  },
  {
    label: "Cities Covered",
    value: 25,
    icon: FaGlobeAsia,
    color: "from-[#F97316] to-[#F97316]",
    bgColor: "bg-[#F97316]/10",
    iconColor: "text-[#F97316]",
  },
];

const OurImpact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-br from-[#0F766E] via-[#0F766E] to-[#F97316] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-10 animate-pulse delay-1000"></div>

      <div className="relative w-11/12 mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Impact in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Numbers
            </span>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Making a difference in communities across the country
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                {/* Icon */}
                <div
                  className={`${stat.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                >
                  <Icon className={`w-10 h-10 ${stat.iconColor}`} />
                </div>

                {/* Number */}
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {inView && (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                      />
                    )}
                    {stat.label === "Participants Served" && "+"}
                  </div>

                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </div>

                {/* Hover Line */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${stat.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-full">
            <span className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white font-semibold">
              Trusted by 10,000+ patients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;