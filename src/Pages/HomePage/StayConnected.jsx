import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const StayConnected = () => {
  return (
    <section className="bg-indigo-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Stay Connected
        </h2>
        <p className="text-gray-700 mb-8 text-lg">
          Subscribe to get the latest updates about upcoming camps, news, and health tips.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Subscribe
          </button>
        </form>

        <div className="mt-10">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Follow us</h4>
          <div className="flex justify-center gap-4 text-indigo-600 text-xl">
            <a href="#" className="hover:text-indigo-800 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-indigo-800 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-indigo-800 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-indigo-800 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayConnected;
