import { useParams } from "react-router-dom";
import UseAxiosPublic from "../../../UseHook/UseAxiosPublic";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaUser, FaEnvelope, FaCamera, FaPhone, FaSave, FaArrowLeft } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const Participant_ProfileUpdate = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPublic = UseAxiosPublic();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const photo = form.photo.value;
    const number = form.number.value;

    const formData = {
      photo,
      number
    };

    try {
      const res = await axiosPublic.put(`/user/${id}`, formData);
      console.log(res.data);
      
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        backdrop: `
          rgba(15, 118, 110, 0.2)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#F97316"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F766E]/5 via-white to-[#F97316]/5 py-12 px-4">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#0F766E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#F97316]/10 rounded-full blur-3xl"></div>
      
      {/* Floating Circles */}
      <div className="absolute top-40 left-20 w-20 h-20 bg-[#0F766E]/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-[#F97316]/20 rounded-full animate-pulse delay-700"></div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#0F766E] to-[#F97316] rounded-full mb-6 shadow-xl">
            <FaUser className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Update Your{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Profile
            </span>
          </h2>
          <p className="text-gray-600">
            Keep your information up to date to get the best experience
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#0F766E] to-[#F97316] px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/100"}
                  alt={user?.displayName}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold">{user?.displayName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <MdVerified className="text-yellow-300" />
                  <p className="text-white/90 text-sm">Verified Participant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="p-8">
            {/* Name Field (Read Only) */}
            <div className="mb-6 group">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaUser className="text-[#0F766E]" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={user?.displayName || ''}
                  readOnly
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-600 cursor-not-allowed focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                  Read Only
                </span>
              </div>
            </div>

            {/* Email Field (Read Only) */}
            <div className="mb-6 group">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaEnvelope className="text-[#F97316]" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-600 cursor-not-allowed focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                  Read Only
                </span>
              </div>
            </div>

            {/* Photo URL Field */}
            <div className="mb-6 group">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaCamera className="text-[#0F766E]" />
                Profile Photo URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="photo"
                  defaultValue={user?.photoURL || ''}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all duration-300 pr-12"
                />
                {user?.photoURL && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <img src={user.photoURL} alt="preview" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-2">
                Enter a valid image URL for your profile picture
              </p>
            </div>

            {/* Contact Number Field */}
            <div className="mb-8 group">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaPhone className="text-[#F97316]" />
                Contact Number
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-500 font-semibold">+88</span>
                </div>
                <input
                  type="tel"
                  name="number"
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-16 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 transition-all duration-300"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-2">
                Enter your Bangladeshi phone number (e.g., 017XXXXXXXX)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/dashboard/profile" 
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Cancel
              </Link>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white font-semibold py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className="group-hover:scale-110 transition-transform" />
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              <span className="text-[#0F766E] font-semibold">Note:</span> Your name and email cannot be changed as they are linked to your account.
            </p>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F97316] rounded-full"></span>
            Why update your profile?
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0F766E]/10 rounded-full flex items-center justify-center">
                <span className="text-[#0F766E] font-bold">1</span>
              </div>
              <span>Get camp notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F97316]/10 rounded-full flex items-center justify-center">
                <span className="text-[#F97316] font-bold">2</span>
              </div>
              <span>Easy contact for updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0F766E]/10 rounded-full flex items-center justify-center">
                <span className="text-[#0F766E] font-bold">3</span>
              </div>
              <span>Personalized experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participant_ProfileUpdate;