import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaHeart } from "react-icons/fa";
import { MdEmail, MdNotificationsActive } from "react-icons/md";

const StayConnected = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0F766E] via-[#0F766E] to-[#F97316] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-overlay animate-ping"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <MdNotificationsActive className="absolute top-20 left-20 text-white/10 text-6xl animate-bounce" />
        <MdEmail className="absolute bottom-20 right-20 text-white/10 text-6xl animate-bounce delay-300" />
        <FaHeart className="absolute top-40 right-40 text-white/10 text-4xl animate-pulse" />
      </div>

      <div className="relative w-11/12 mx-auto max-w-4xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <MdNotificationsActive className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Stay{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Connected
              </span>
            </h2>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Subscribe to get the latest updates about upcoming camps, health tips, and community news
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
              >
                <FaTelegramPlane />
                Subscribe Now
              </button>
            </div>

            {subscribed && (
              <div className="mt-4 p-4 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/50">
                <p className="text-green-200 flex items-center gap-2">
                  <FaHeart className="animate-pulse" />
                  Thank you for subscribing! Check your email for confirmation.
                </p>
              </div>
            )}

            <p className="text-gray-300 text-sm mt-4 text-center">
              We respect your privacy. No spam, unsubscribe anytime.
            </p>
          </form>

          <div className="text-center">
            <h4 className="text-white font-semibold mb-6 text-lg">Follow us on social media</h4>
            <div className="flex justify-center gap-4">
              {[
                { icon: <FaFacebookF />, color: "hover:bg-[#0F766E]", link: "#" },
                { icon: <FaTwitter />, color: "hover:bg-[#F97316]", link: "#" },
                { icon: <FaInstagram />, color: "hover:bg-[#0F766E]", link: "#" },
                { icon: <FaLinkedinIn />, color: "hover:bg-[#F97316]", link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 ${social.color} border border-white/30`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-400/30 rounded-full blur-2xl"></div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2024 Medical Camp Platform. All rights reserved. Made with <FaHeart className="inline text-red-400 animate-pulse" /> for better healthcare
          </p>
        </div>
      </div>
    </section>
  );
};

export default StayConnected;