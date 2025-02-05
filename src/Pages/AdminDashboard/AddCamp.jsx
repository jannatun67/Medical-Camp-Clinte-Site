import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../UseHook/UseAxiosSecure";
import Swal from "sweetalert2";


const AddCamp = () => {
    const [startDate, setStartDate] = useState(new Date());
     const {register,handleSubmit, formState: { errors },} = useForm()
     const axiosSecure = UseAxiosSecure()

     const onSubmit =async (data) => {
        // console.log(data);
        const date = startDate? `${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate
            .getDate()
            .toString()
            .padStart(2, '0')}/${startDate.getFullYear()}`
        : null;
        const campFeesNumber=parseInt(data.campFees);
        const participantCountNumber=parseInt(data.participantCount)
        // console.log(campFeesNumber);
        const campInfo={
            ...data,
            campFees:campFeesNumber,
            participantCount:participantCountNumber,
            date,
            
           
        }
        // console.log(campInfo);
       try{
        await axiosSecure.post("/medicalCamps",campInfo)
        Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Added successfully",
                      showConfirmButton: false,
                      timer: 1500
                    });
       }
       catch(error) {
        console.log(error);
       }
     }
  return (
    <div>
      <div className=" p-2  min-h-screen">
        <div className="text-center ">
         <h2 className="text-2xl md:text-5xl font-bold mb-5"> Add A Camp</h2>
          <div className=" mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>

             <div className="md:flex gap-3">
             <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Camp Name</span>
                </label>
                <input
                  type="text"
                  name="campName"
                  {...register("campName",{ required: true })}
                  placeholder="Camp Name"
                  className="input input-bordered w-full"
                  required
                />
                 {errors.campName && <span className="text-red-500">CampName is required</span>}
              </div>

              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Healthcare Professional Name</span>
                </label>
                <input
                  type="text"
                  name="healthcareName"
                  {...register("healthcareName",{ required: true })}
                  placeholder="Healthcare Name"
                  className="input input-bordered w-full"
                  required
                />
                 {errors.healthcareName && <span className="text-red-500">Healthcare Name is required</span>}
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
                  {...register("photo",{ required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
                  required
                />
                 {errors.photo && <span className="text-red-500">Photo is required</span>}
              </div>

              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Camp Fees</span>
                </label>
                <input
                  type="number"
                  name="campFees"
                  {...register("campFees",{ required: true })}
                  placeholder="Camp Fees $"
                  className="input input-bordered w-full"
                  required
                />
                 {errors.campFees && <span className="text-red-500">Camp Fees is required</span>}
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
                  {...register("location",{ required: true })}
                  placeholder="Location"
                  className="input input-bordered w-full"
                  required
                />
                 {errors.location && <span className="text-red-500">location is required</span>}
              </div>

              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">participant count</span>
                </label>
                <input
                  type="number"
                  name="participantCount"
                  {...register("participantCount",{ required: true })}
                  placeholder="participant count"
                  className="input input-bordered w-full"
                  required
                />
                 {errors.participantCount && <span className="text-red-500">Participant Count is required</span>}
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
                  />
                </label>
              </div>

              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea name="description"
                 {...register("description",{ required: true })}
                id="" cols="30" rows="10" className="border p-2 "></textarea>
                {errors.description && <span className="text-red-500">description is required</span>}
              </div>
             </div>

              <div className="form-control mt-6">
                <button className="btn text-white bg-[#578E7E] hover:bg-[#219B9D]">Add Camp</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCamp;
