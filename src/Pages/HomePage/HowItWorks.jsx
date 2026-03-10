import { FaUserPlus, FaCalendarCheck, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";

const steps = [
  {
    icon: <FaUserPlus className="w-8 h-8" />,
    title: "Create an Account",
    description: "Sign up with your email or social login to get started.",
    step: "01",
  },
  {
    icon: <LuCalendarClock className="w-8 h-8" />,
    title: "Browse Camps",
    description: "Explore available medical camps and check details that fit your needs.",
    step: "02",
  },
  {
    icon: <FaClipboardList className="w-8 h-8" />,
    title: "Join a Camp",
    description: "Register by providing basic info. You'll get notified about updates.",
    step: "03",
  },
  {
    icon: <FaCheckCircle className="w-8 h-8" />,
    title: "Attend & Benefit",
    description: "Visit the camp, consult with doctors, and receive medical support.",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-gradient-to-tr from-[#0F766E]/10 via-[#0F766E]/5 to-[#F97316]/10">
      {/* Wave Pattern Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="relative w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-[#F97316]/20 text-[#F97316] rounded-full text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It{" "}
            <span className="relative">
              Works
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 5" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="5 5"/>
              </svg>
            </span>
          </h2>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#0F766E]/20 via-[#F97316]/20 to-[#0F766E]/20 transform -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-7xl font-black text-[#0F766E]/20 group-hover:text-[#F97316]/20 transition-colors duration-300">
                  {step.step}
                </div>

                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#0F766E] to-[#F97316] rounded-2xl flex items-center justify-center text-white transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute inset-0 bg-[#F97316] rounded-2xl opacity-20 group-hover:animate-ping"></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-[#0F766E] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-8 h-8 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;