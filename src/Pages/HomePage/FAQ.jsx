import { useState } from "react";
import { FaQuestionCircle, FaPlus, FaMinus } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register for a medical camp?",
      answer: "You can register by creating an account on our platform, browsing available camps, and clicking the 'Register Now' button on your chosen camp. You'll receive a confirmation email with all the details.",
      category: "Registration"
    },
    {
      question: "Are the medical camps free?",
      answer: "Most of our camps are free or offered at a minimal cost. We believe in making healthcare accessible to everyone. Specific pricing details are mentioned on each camp's page.",
      category: "Pricing"
    },
    {
      question: "What documents do I need to bring?",
      answer: "Please bring a valid ID proof (National ID, Passport, or Driver's License) and any previous medical reports if available. For children, bring their birth certificate and vaccination records.",
      category: "Documents"
    },
    {
      question: "Can I register for multiple camps?",
      answer: "Yes, you can register for multiple camps. However, please check the dates to ensure they don't conflict. You can manage all your registrations from your dashboard.",
      category: "Registration"
    },
    {
      question: "Are the doctors qualified?",
      answer: "Absolutely! All our camps are staffed by certified and experienced medical professionals including doctors, nurses, and specialists from reputed hospitals.",
      category: "Medical"
    },
    {
      question: "What if I need to cancel my registration?",
      answer: "You can cancel your registration from your dashboard up to 24 hours before the camp. For any assistance, contact our support team.",
      category: "Cancellation"
    },
    {
      question: "Do you provide medicine?",
      answer: "Yes, basic medicines and first aid are provided free of cost at our camps. For specific prescriptions, you may need to purchase from pharmacies.",
      category: "Medical"
    },
    {
      question: "Is there an age limit?",
      answer: "Our camps welcome people of all ages. However, some specialized camps (like pediatric or geriatric) may have specific age requirements mentioned in the camp details.",
      category: "Eligibility"
    }
  ];

  // Group by category
  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0F766E]/10 via-[#F97316]/10 to-[#0F766E]/10 overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute top-20 left-20 opacity-10">
        <FaQuestionCircle className="text-9xl text-[#0F766E] animate-spin-slow" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-10">
        <MdHelpOutline className="text-9xl text-[#F97316] animate-bounce-slow" />
      </div>

      <div className="relative w-11/12 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] px-6 py-2 rounded-full mb-4">
            <FaQuestionCircle />
            <span className="font-semibold">Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our medical camps and services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button className="px-4 py-2 bg-[#0F766E] text-white rounded-full text-sm font-semibold hover:bg-[#115E59] transition-colors">
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold hover:bg-[#F97316]/10 hover:text-[#F97316] transition-colors shadow-sm"
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Question */}
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-[#0F766E] to-[#F97316] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-[#0F766E] transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] transition-all duration-300 ${openIndex === index ? 'rotate-180 bg-[#F97316] text-white' : ''}`}>
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </div>
              </button>

              {/* Answer */}
              <div 
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'pb-5' : 'max-h-0'
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-8 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#0F766E] to-[#F97316] rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-[#0F766E] font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;