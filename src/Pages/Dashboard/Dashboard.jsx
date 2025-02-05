import { FaCashRegister, FaHome, FaUserCircle } from "react-icons/fa";
import { IoIosAddCircle, IoMdAnalytics } from "react-icons/io";
import { RiSecurePaymentFill } from "react-icons/ri";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../../UseHook/UseAdmin";


const Dashboard = () => {
    // ToDO:get isAdmin value from the  database
    const [isAdmin]= UseAdmin()
    return (
        <div className="w-11/12 mx-auto ">
           <div className="md:flex">
           <div className="w-64 min-h-screen bg-[#578E7E] text-white">
            <div>
                <h1 className="text-center font-bold text-2xl py-10">Medical Camp</h1>
            </div>
             <ul className="menu space-y-3">
                {
                    isAdmin?
                     <>
                 <li>
                <NavLink to="/dashboard/organizerProfile"> <FaUserCircle /> Organizer Profile</NavLink>
                </li>
                <li>
                <NavLink to="/dashboard/addCamp"> <IoIosAddCircle /> Add A Camp</NavLink>
                </li>
                <li>
                <NavLink to="/dashboard/manageCamps"><SiGooglecampaignmanager360 />Manage Camps</NavLink>
                </li>
                <li>
                <NavLink to="/dashboard/registeredCamps"> <FaCashRegister />Manage Registered Camps</NavLink>
                </li>

                    </>
                    :
                    <>
                     <li>
                <NavLink to="/dashboard/analytics"> <IoMdAnalytics /> Analytics</NavLink>
                </li>
                <li>
                <NavLink to="/dashboard/Participant_Profile"> <FaUserCircle /> Participant Profile</NavLink>
                </li>
                <li>
                <NavLink to="/dashboard/register"><FaCashRegister /> Registered Camps</NavLink>
                </li>
                <li>
                <NavLink to="/dashboard/paymentHistory"> <RiSecurePaymentFill />Payment History</NavLink>
                </li>

                    </>
                }
                {/* shard Nav Links  */}
                <div className=" divider h-[1px] bg-white"></div>
                <li>
                <NavLink to="/"> <FaHome />Home</NavLink>
                </li>
             </ul>
            </div>
            <div className="md:flex-1 md:p-28 mt-10 ">
                <Outlet></Outlet>
            </div>
           </div>
        </div>
    );
};

export default Dashboard;