
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import SweetPagination from "sweetpagination";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const CampRegister = () => {
     const {user}= useContext(AuthContext)
     const [currentPageData, setCurrentPageData] = useState([]);

    const axiosPublic= UseAxiosPublic()
    const { data:camps=[],refetch}=useQuery({
        queryKey:["register"],
        queryFn:async ()=>{
            const res= await axiosPublic.get("/JoinCamp")
            return res.data
        }
       
    })
    console.log(camps);

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
               
                axiosPublic.delete(`/JoinCamp/${id}`)
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

    const handelOnsubmit= e =>{
      e.preventDefault()
      const from = e. target;
      const number= parseInt(from.number.value);
      const feedback= from.feedback.value

      const fromData={
        photo:user?.photoURL,
        name:user?.displayName,
        number,
        feedback
      }

   const res= axiosPublic.post("/feedback",fromData)
      console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Rating Add successFully",
        showConfirmButton: false,
        timer: 1500
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
              <th>Camp name</th>
              <th>Camp Fees</th>
              <th>Participant Name</th>
              <th>Payment Status</th>
              <th>Confirmation</th>
              <th>Cancel Button</th>
              <th>Feed Button</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((camp,index) =>  <tr key={camp?._id} className="bg-base-200">
              <th>{index+1}</th>
              <td>{camp?.campName}</td>
              <td>{camp?.campFees}</td>
              <td>{camp?.userName}</td>
              <td><Link to={`/dashboard/payment/${camp?._id}`}><button className="btn bg-red-100">{camp?.status || "pay"}</button></Link></td>

              <td className="btn bg-green-200">{camp?.pendingStatus||"pending"}</td>

              <td>{camp?.status?<><button className="btn" disabled>Cancel</button></>:
              <><button onClick={()=>handelDelete(camp?._id)} className="btn bg-[#578E7E] text-white">Cancel</button></>}</td>

              <td onClick={()=>document.getElementById('my_modal_1').showModal()} >Feedback</td>
              

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

    {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <div className="modal-action">

    <form onSubmit={handelOnsubmit} className="card-body">
    <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input type="number" name="number" placeholder="rating" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Feedback</span>
          </label>
          <textarea type="text" name="feedback" placeholder="feedback" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
      <button className="btn">send</button>
         
        </div>
        <form method="dialog">
        <button className="btn">X</button>
      </form>
      </form>
    </div>
  </div>
</dialog>
    </div>
  );
};

export default CampRegister;
