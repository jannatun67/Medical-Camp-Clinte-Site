import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";


const UseAdmin = () => {
    const axiosSecure= UseAxiosSecure()
    const {user}= useContext(AuthContext)
   const {data:isAdmin}= useQuery({
    queryKey:[user?.email,'isAdmin'],
    queryFn : async ()=>{
        const res = await axiosSecure.get(`/user/admin/${user?.email}`)
        // console.log(res);
        return res.data?.admin
    }
   })
   console.log(isAdmin);
   return [isAdmin]
};

export default UseAdmin;