
import { FaUserPlus } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { FaClipboardCheck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon:<FaUserPlus className="w-8 h-8 text-indigo-600" />,
    title: "Create an Account",
    description: "Sign up with your email or social login to get started.",
  },
  {
    icon:<LuCalendarClock className="w-8 h-8 text-indigo-600" />,
    title: "Browse Camps",
    description: "Explore available medical camps and check details that fit your needs.",
  },
  {
    icon:<FaClipboardCheck className="w-8 h-8 text-indigo-600"  />,
    title: "Join a Camp",
    description: "Register by providing basic info. You’ll get notified about updates.",
  },
  {
    icon:<FaCheckCircle className="w-8 h-8 text-indigo-600" />,
    title: "Attend & Benefit",
    description: "Visit the camp, consult with doctors, and receive medical support.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Easy steps to get started and take part in our impactful medical camps.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="text-center bg-gray-50 rounded-2xl p-6 shadow hover:shadow-md transition duration-300"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
