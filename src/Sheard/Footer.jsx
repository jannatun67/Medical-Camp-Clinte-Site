
// import logo from "../assets/logo.jpg";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">MCMS</h2>
          <p>
            Empowering communities with accessible and efficient medical care through well-organized camps.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/available-camps" className="hover:text-white transition">Available Camps</a></li>
            <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
            <li><a href="/join-us" className="hover:text-white transition">Join Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@mcms.org</p>
          <p>Phone: +1 800 123 4567</p>
          <p>Address: 123 Health St, Wellness City</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} MCMS. All rights reserved.
      </div>
    </footer>
    );
};

export default Footer;