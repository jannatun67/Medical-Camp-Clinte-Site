import { useState } from "react";
import { FaBars, FaTimes, FaCashRegister, FaHome, FaUserCircle } from "react-icons/fa";
import { IoIosAddCircle, IoMdAnalytics } from "react-icons/io";
import { RiSecurePaymentFill } from "react-icons/ri";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../../UseHook/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = UseAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
      {/* Hamburger menu for mobile */}
      <div className="md:hidden flex justify-between items-center bg-[#578E7E] text-white p-4">
        <h1 className="text-xl font-bold">Medical Camp</h1>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-[#578E7E] text-white z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out min-h-screen p-6`}
      >
        <div className="hidden md:block text-center font-bold text-2xl mb-8">
          Medical Camp
        </div>
        <ul className="space-y-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/organizerProfile" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <FaUserCircle /> Organizer Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addCamp" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <IoIosAddCircle /> Add A Camp
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCamps" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <SiGooglecampaignmanager360 /> Manage Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/registeredCamps" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <FaCashRegister /> Registered Camps
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/analytics" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <IoMdAnalytics /> Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/Participant_Profile" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <FaUserCircle /> Participant Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/register" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <FaCashRegister /> Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <RiSecurePaymentFill /> Payment History
                </NavLink>
              </li>
            </>
          )}
          <div className="border-t border-white my-4"></div>
          <li>
            <NavLink to="/" className="flex items-center gap-2" onClick={toggleSidebar}>
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
