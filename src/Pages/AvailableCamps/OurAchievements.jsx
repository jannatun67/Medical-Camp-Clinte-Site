import { useEffect, useState, useRef } from "react";
import { FaHeartbeat, FaUsers, FaHospital, FaAward } from "react-icons/fa";
import { MdBloodtype, MdVolunteerActivism } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";

const OurAchievements = () => {
  const [counts, setCounts] = useState({
    patients: 0,
    camps: 0,
    doctors: 0,
    cities: 0,
    volunteers: 0,
    awards: 0
  });

  const sectionRef = useRef(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCounting) return;

    const targets = {
      patients: 50000,
      camps: 250,
      doctors: 500,
      cities: 45,
      volunteers: 1200,
      awards: 25
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timers = [];

    Object.keys(targets).forEach((key) => {
      let current = 0;
      const increment = Math.ceil(targets[key] / steps);

      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setCounts(prev => ({ ...prev, [key]: current }));
      }, interval);

      timers.push(timer);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [startCounting]);

  const achievements = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      value: counts.patients,
      label: "Happy Patients",
      suffix: "+",
      color: "from-[#0F766E] to-[#0F766E]",
      bgColor: "bg-[#0F766E]/10",
      iconColor: "text-[#0F766E]"
    },
    {
      icon: <GiHealthNormal className="w-8 h-8" />,
      value: counts.camps,
      label: "Camps Organized",
      suffix: "+",
      color: "from-[#F97316] to-[#F97316]",
      bgColor: "bg-[#F97316]/10",
      iconColor: "text-[#F97316]"
    },
    {
      icon: <FaHeartbeat className="w-8 h-8" />,
      value: counts.doctors,
      label: "Expert Doctors",
      suffix: "+",
      color: "from-[#0F766E] to-[#F97316]",
      bgColor: "bg-gradient-to-r from-[#0F766E]/10 to-[#F97316]/10",
      iconColor: "text-[#0F766E]"
    },
    {
      icon: <FaHospital className="w-8 h-8" />,
      value: counts.cities,
      label: "Cities Covered",
      suffix: "+",
      color: "from-[#F97316] to-[#0F766E]",
      bgColor: "bg-gradient-to-r from-[#F97316]/10 to-[#0F766E]/10",
      iconColor: "text-[#F97316]"
    },
    {
      icon: <MdVolunteerActivism className="w-8 h-8" />,
      value: counts.volunteers,
      label: "Active Volunteers",
      suffix: "+",
      color: "from-[#0F766E] to-[#0F766E]",
      bgColor: "bg-[#0F766E]/10",
      iconColor: "text-[#0F766E]"
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      value: counts.awards,
      label: "Awards Won",
      suffix: "",
      color: "from-[#F97316] to-[#F97316]",
      bgColor: "bg-[#F97316]/10",
      iconColor: "text-[#F97316]"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E]/5 via-white to-[#F97316]/5"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #0F766E 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#F97316]/10 text-[#F97316] rounded-full text-sm font-semibold mb-4">
            🏆 Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Achievements in{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Years of dedication and service have brought us here. We're proud of our journey and grateful to our community.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`relative mb-6 ${item.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                <div className={`${item.iconColor}`}>
                  {item.icon}
                </div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}></div>
              </div>

              {/* Number */}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {item.value.toLocaleString()}{item.suffix}
                </div>
                <p className="text-gray-600 font-medium">{item.label}</p>
              </div>

              {/* Bottom Line */}
              <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${item.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
            <MdBloodtype className="text-2xl text-[#F97316] animate-pulse" />
            <span className="text-gray-700">
              <span className="font-bold text-[#0F766E]">10+ Years</span> of serving communities
            </span>
            <MdVolunteerActivism className="text-2xl text-[#0F766E] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;