import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../UseHook/UseAxiosSecure";
import { useState } from "react";
import SweetPagination from "sweetpagination";
import Swal from "sweetalert2";

const ManageRegistered = () => {
    const axiosSecure= UseAxiosSecure()
    const [currentPageData, setCurrentPageData] = useState([]);
    const { data:camps=[],refetch}=useQuery({
        queryKey:["register"],
        enabled:!!localStorage.getItem("access-token"),
        queryFn:async ()=>{
            const res= await axiosSecure.get("/JoinCamp")
            return res.data
        }
       
    })
    // console.log(camps);

     const handelDelete=(id)=>{
           Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                  if (result.isConfirmed) {
                   
                    axiosSecure.delete(`/JoinCamp/${id}`)
                    .then(res=>{
                     if (res.data.deletedCount > 0) {
                      refetch()
                       Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                     }
                    })
                  }
                });
        }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#578E7E] text-white">
            <tr>
              <th></th>
              <th>Participant Name</th>
              <th>Camp name</th>
              <th>Camp Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp,index)=>  <tr key={camp?._id} className="bg-base-200">
              <th>{index+1}</th>
              <td>{camp?.userName}</td>
              <td>{camp?.campName}</td>
              <td>{camp?.campFees}</td>
              <td><button className="btn bg-red-100">{camp?.status|| "unpaid"}</button></td>
              <td><button className="btn bg-green-100">{camp?.pendingStatus || "Pending"}</button></td>

              <td> <td>{camp?.status?<><button className="btn" disabled>Cancel</button></>:
              <><button onClick={()=>handelDelete(camp?._id)} className="btn bg-[#578E7E] text-white">Cancel</button></>}</td></td>
            </tr>)}
           
          </tbody>
        </table>
      </div>

       {/* pagination */}
       <SweetPagination
        currentPageData={setCurrentPageData}
        getData={camps}
        dataPerPage={10}
        navigation={true}
        getStyle={'style-2'}
      />
    </div>
  );
};

export default ManageRegistered;
