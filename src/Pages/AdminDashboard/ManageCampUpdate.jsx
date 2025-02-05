import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from "../../UseHook/UseAxiosSecure";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";



const ManageCampUpdate = () => {
  const UpdateData= useLoaderData()
  // console.log(UpdateData);
  const {campName,healthcareName,photo,campFees,location,participantCount,description,date,_id}=UpdateData
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = UseAxiosSecure()

  const handelUpdate=async (e)=>{
      e.preventDefault()
      const from = e.target;
      const campName= from.campName.value;
      const healthcareName=from.healthcareName.value;
      const photo= from.photo.value;
      const campFees=parseInt(from.campFees.value);
      const location=from.location.value;
      const participantCount=parseInt(from.participantCount.value);
      const description=from.description.value;
      const date = startDate? `${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate
        .getDate()
        .toString()
        .padStart(2, '0')}/${startDate.getFullYear()}`
    : null;

    const UpdateData ={
      campName,
      healthcareName,
      photo,
      campFees,
      location,
      participantCount,
      description,
      date
    }
    // console.log(UpdateData);
    try{
      await axiosSecure.put(`/medicalCamps/${_id}`,UpdateData)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: " Update Post  Successful",
        showConfirmButton: false,
        timer: 1500
      });
    }
    catch (error){
      console.log(error);
    }
  }
     
    return (
        <div>
             <div className=" p-2  min-h-screen">
               <div className="text-center ">
                <h2 className="text-2xl md:text-5xl font-bold mb-5"> Update A Camp</h2>
                 <div className=" mt-10">
                   <form onSubmit={handelUpdate}>
       
                    <div className="md:flex gap-3">
                    <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">Camp Name</span>
                       </label>
                       <input
                         type="text"
                         name="campName"
                        defaultValue={campName}
                         placeholder="Camp Name"
                         className="input input-bordered w-full"
                         required
                       />
                      
                     </div>
       
                     <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">Healthcare Professional Name</span>
                       </label>
                       <input
                         type="text"
                         name="healthcareName"
                        defaultValue={healthcareName}
                         placeholder="Healthcare Name"
                         className="input input-bordered w-full"
                         required
                       />
                     </div>
                    </div>
       
                    <div className="md:flex gap-3">
                    <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">Image</span>
                       </label>
                       <input
                         type="url"
                         name="photo"
                       defaultValue={photo}
                         placeholder="Photo URL"
                         className="input input-bordered w-full"
                         required
                       />
                       
                     </div>
       
                     <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">Camp Fees</span>
                       </label>
                       <input
                         type="number"
                         name="campFees"
                        defaultValue={campFees}
                         placeholder="Camp Fees"
                         className="input input-bordered w-full"
                         required
                       />
                       
                     </div>
                    </div>
       
                    <div className="md:flex gap-3">
                    <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">Location</span>
                       </label>
                       <input
                         type="text"
                         name="location"
                        defaultValue={location}
                         placeholder="Location"
                         className="input input-bordered w-full"
                         required
                       />
                        
                     </div>
       
                     <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">participant count</span>
                       </label>
                       <input
                         type="number"
                         name="participantCount"
                         defaultValue={participantCount}
                         className="input input-bordered w-full"
                         required
                       />
                       
                     </div>
                    </div>
       
                    <div className="md:flex gap-3 items-center">
                    <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">Date & Time</span>
                       </label >
                       <label className="input-group ">
                       <DatePicker
                         className='border py-3 px-2 rounded-xl w-full '
                           selected={startDate}
                           onChange={(date) => setStartDate(date)}
                           dateFormat="MM/dd/yyyy" 
                         name="date"
                         defaultValue={date}
                         />
                       </label>
                     </div>
       
                     <div className="form-control md:w-1/2">
                       <label className="label">
                         <span className="label-text">Description</span>
                       </label>
                       <textarea name="description"
                       
                       id="" defaultValue={description} cols="30" rows="10" className="border p-2 "></textarea>
                      
                     </div>
                    </div>
       
                     <div className="form-control mt-6">
                       <button className="btn text-white bg-[#578E7E] hover:bg-[#219B9D]">Update Camp</button>
                     </div>
                   </form>
                 </div>
               </div>
             </div>
           </div>
    );
};

export default ManageCampUpdate;