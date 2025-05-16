
import { FaHeartPulse } from "react-icons/fa6";
import { FaStethoscope } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";


const benefits = [
  {
    title: 'Free or Affordable Healthcare',
    description: 'Access essential medical services without the financial burden.',
    icon: <FaHeartPulse  className="w-8 h-8 text-emerald-600" />,
  },
  {
    title: 'Qualified Doctors & Staff',
    description: 'All camps are run by certified medical professionals.',
    icon:<FaStethoscope className="w-8 h-8 text-emerald-600" />,
  },
  {
    title: 'Community Health Awareness',
    description: 'Promote wellness and preventive care in underserved areas.',
    icon:<FaUsers className="w-8 h-8 text-emerald-600"/>,
  },
  {
    title: 'Safe & Secure Environment',
    description: 'Camps follow strict hygiene and safety protocols for everyone’s protection.',
    icon:<IoShieldCheckmark className="w-8 h-8 text-emerald-600"/>,
  },
];

const WhyJoinOurCamps = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Join Our Camps?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Discover the benefits of participating in our medical camps and how they help improve community health.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center"
          >
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
     
    </section>
  );
};

export default WhyJoinOurCamps;
