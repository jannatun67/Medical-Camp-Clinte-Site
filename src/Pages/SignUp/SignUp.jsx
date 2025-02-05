import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import signUpAnimation from "../../assets/Animation.json"
import { useForm } from "react-hook-form";
import {  useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const navigate=useNavigate()
  const{ createUser,googleLogin,updateUserProfile}=useContext(AuthContext)
  // console.log(createUser,setUser);

  const {register,handleSubmit, formState: { errors },} = useForm()

  const onSubmit = async (data) => {
   
    try {
      const result = await createUser(data.email, data.password);
      console.log("result",result);
      await updateUserProfile(data.name, data.photo);
  
      if (result.user?.email) {
        const userInfo = {
          ...data,
          role: "customer",
        };
  
        const res = await axios.post("https://medical-camp-server-site.onrender.com/user", userInfo);
        console.log("res data",res.data);
  
        navigate("/");

  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload()
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  

   // Google
      const handelGoogle = async()=>{
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
         
          <div className="card bg-base-100 md:w-[500px] h-[750px]  shrink-0 shadow-2xl p-5 space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
         Sign Up Your Account
        </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
             {/* user name Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              User Name
            </label>
            <input
              type="text"
              name="name"
              {...register("name",{ required: true })}
              placeholder="Enter your userName "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
             {errors.name && <span className="text-red-500">Name is required</span>}
          </div>
           {/* Photo Input */}
           <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
             User Photo
            </label>
            <input
              type="url"
              name="photo"
              {...register("photo",{ required: true })}
              placeholder="Enter your Photo Url "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
            {errors.name && <span className="text-red-500">Photo is required</span>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email 
            </label>
            <input
              type="email"
              name="email"
              {...register("email",{ required: true })}
              placeholder="Enter your email "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
            {errors.name && <span className="text-red-500">Email is required</span>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password",{ required: true,minLength:6, maxLength: 20 })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
             {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>)}
             {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must br 6 Characters</p>)}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#578E7E] hover:bg-[#219B9D] text-white font-medium py-2 rounded-lg  focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
            <div className="mt-5 text-center">
                <p>Create an account?<Link to="/login"><span className="text-[#219B9D] font-semibold"> Login</span></Link></p>
            </div>
            <div className="mt-5 flex justify-center">
                <p onClick={handelGoogle} className="btn"><FaGoogle className="text-[#219B9D]" /> Login With Google</p>
            </div>

        </form>
          </div>
          <div className="text-center lg:text-left">
           <Lottie className="md:w-[500px]" animationData={signUpAnimation}></Lottie>
          </div>
        </div>
      </div>
        </div>
    );
};

export default SignUp;