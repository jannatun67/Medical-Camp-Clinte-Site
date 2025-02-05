import Lottie from "lottie-react";
import loginAnimation from "../../assets/Animation - 1736785425770.json"
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";



const Login = () => {
  const navigate=useNavigate()
  const{userLogin,setUser, googleLogin}= useContext(AuthContext)
  const handelSubmit = e=>{
    e.preventDefault()
    const from = e.target
    const email = from.email.value;
    const password= from.password.value;
    
    console.log(email,password);
    userLogin(email,password)
    .then(result =>{
      const user= result.user
      console.log(user);
      setUser(user)
      navigate("/")
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "user login successfully",
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch((error) => {
     console.log(error);
    });
  }
   // Google
   const handelGoogleLogin = async()=>{
    googleLogin()
    .then(async(result) => {
      // console.log(result.user);

             const userInfo = {
               name: result.user?.displayName,
               photo:result.user?.photoURL,
               email:result.user?.email,
               password:result.user?.password,
               role: "customer"
             };
             Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
             const res = await axios.post("https://medical-camp-server-site.onrender.com/user", userInfo);
             console.log(res);
             navigate("/");
       
     
    })
    .catch((error) => {
      // Swal.fire("Please try again!");
    });
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
         
          <div className="card bg-base-100 md:w-[500px] h-[500px]  shrink-0 shadow-2xl p-5 space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
          <form onSubmit={handelSubmit} >
          {/* Email/Username Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email 
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Password Input */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
            <div className="mt-5 text-center">
                <p>Don't have an account?<Link to="/signUp"><span className="text-blue-500 font-semibold"> Sign up</span></Link></p>
            </div>
            <div className="mt-5 flex justify-center">
                <p onClick={handelGoogleLogin} className="btn"><FaGoogle className="text-blue-600" /> Login With Google</p>
            </div>

        </form>
          </div>
          <div className="text-center lg:text-left">
           <Lottie className="md:w-[500px]" animationData={loginAnimation}></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
