import { Link, NavLink,} from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import UseAdmin from "../UseHook/UseAdmin";


const Navbar = () => {
  const [isAdmin]= UseAdmin()
  const { user, logOut } = useContext(AuthContext);
 

  const handelLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className=" sticky z-20 top-0 bg-base-100">
      <div className="navbar  w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm space-y-2 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink className="mr-3" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/availableCamps">Available Camps</NavLink>
              </li>
              <li>
                <NavLink to="/joinUs">Join US </NavLink>
              </li>
            </ul>
          </div>
          <a className="flex gap-3 items-center">
            <img className="md:w-[90px] w-[70px] " src={logo} alt="" />
            <p className="font-bold text-sm  md:text-xl">Medical Camp</p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/availableCamps">Available Camps</NavLink>
            </li>
            <li>
              <NavLink to="/joinUs">Join US </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" m-1">
                  <img
                    className="md:w-[47px] w-[33px] rounded-full object-center"
                    src={`${user?.photoURL}`}
                    referrerPolicy="no-referrer"
                    alt=""
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box space-y-2 z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <p>{user?.displayName}</p>
                  </li>
                  <li>
                  <Link to={`${isAdmin?"/dashboard/addCamp":"/dashboard/register"}`}>Dashboard</Link>
                  </li>
                  <li>
                    <Link
                      onClick={handelLogout}
                      to="/login"
                      className="btn text-white bg-[#578E7E] hover:bg-[#219B9D]"
                    >
                      log-Out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn text-white bg-[#578E7E] hover:bg-[#219B9D]"
              ></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
