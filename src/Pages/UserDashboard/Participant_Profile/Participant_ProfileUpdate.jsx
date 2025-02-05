
import { useParams } from "react-router-dom";
import UseAxiosPublic from "../../../UseHook/UseAxiosPublic";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";



const Participant_ProfileUpdate = () => {
   const {id} = useParams()
   const {user}= useContext(AuthContext)
   
    const axiosPublic = UseAxiosPublic()

    const handelUpdate =async e =>{
        e.preventDefault()
        const from = e.target;
        const name= from.name.value;
        const email= from.email.value;
        const photo= from.photo.value;
        const number= from.number.value;

        const fromData ={
           photo,
            number
        }
        console.log(fromData);

   const res=await axiosPublic.put(`/user/${id}`,{...fromData})
        console.log(res.data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Update Successfully",
            showConfirmButton: false,
            timer: 1500
          });
    }
    return (
        <div className="card bg-base-100 md:w-[500px] h-[500px]  shrink-0 shadow-2xl p-5 space-y-5">
              <form onSubmit={handelUpdate}>
          
          <div className="mb-4">
            <label  className="block text-gray-600 font-medium mb-2">
                Name
            </label>
            <input
              type="text"
              name="name"
              value={user?.displayName}
              readOnly
              placeholder="Enter your Name "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label  className="block text-gray-600 font-medium mb-2">
              Email 
            </label>
            <input
              type="email"
              name="email"
              value={user?.email}
              readOnly
              placeholder="Enter your email "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
             Photo
            </label>
            <input
              type="url"
              name="photo"
              placeholder="Enter your photo "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

        
          <div className="mb-4">
            <label  className="block text-gray-600 font-medium mb-2">
            Contact Number
            </label>
            <input
              type="number"
              name="number"
              placeholder="Enter your number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Update
          </button>
        </form>
        </div>
    );
};

export default Participant_ProfileUpdate;