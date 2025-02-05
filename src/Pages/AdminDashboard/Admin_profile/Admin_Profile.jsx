import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../UseHook/UseAxiosSecure";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const Admin_Profile = () => {
    const{ user}= useContext(AuthContext)

    const axiosSecure= UseAxiosSecure()

    const {data:users=[] , }= useQuery({
        queryKey:['user',user?.email],
        queryFn: async ()=> {
          const res=  await axiosSecure.get(`/user/${user?.email}`)
          return res.data
        },
        enabled:!!user?.email
    })
    console.log(users);
    return (
        <div>
             <div className="card bg-base-100  shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={users?.photo}
            referrerPolicy="no-referrer"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{users?.name}</h2>
          <p>{users?.email}</p>
          <div className="card-actions">
           <Link to={`/dashboard/Participant_ProfileUpdate/${users?._id}`}> <button className="btn  text-white bg-[#578E7E] hover:bg-[#219B9D]">Update</button></Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Admin_Profile;