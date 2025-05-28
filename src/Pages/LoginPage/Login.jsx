import Lottie from "lottie-react";
import loginAnimation from "../../assets/Animation - 1736785425770.json";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { userLogin, setUser, googleLogin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = async () => {
    googleLogin()
      .then(async (result) => {
        const userInfo = {
          name: result.user?.displayName,
          photo: result.user?.photoURL,
          email: result.user?.email,
          role: "customer",
        };
         navigate("/");
        await axios.post("https://medical-camp-server-site.onrender.com/user", userInfo);
        setUser(result.user);
       
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google login successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
       
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 md:w-[500px] h-[500px] shrink-0 shadow-2xl p-5 space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
            <div className="mt-5 text-center">
              <p>
                Don&apos;t have an account?
                <Link to="/signUp">
                  <span className="text-blue-500 font-semibold"> Sign up</span>
                </Link>
              </p>
            </div>
            <div className="mt-5 flex justify-center">
              <p onClick={handleGoogleLogin} className="btn cursor-pointer">
                <FaGoogle className="text-blue-600" /> Login With Google
              </p>
            </div>
          </form>
        </div>
        <div className="text-center lg:text-left">
          <Lottie className="md:w-[500px]" animationData={loginAnimation} />
        </div>
      </div>
    </div>
  );
};

export default Login;
