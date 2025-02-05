import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";
import Swal from "sweetalert2";


const JoinCamp = ({ camp,refetch}) => {
  
  const {
    campName,
    healthcareName,
    photo,
    campFees,
    location,
    participantCount,
    description,
    date,
    _id
  } = camp;
  const [startDate, setStartDate] = useState(new Date());
  const{user}=useContext(AuthContext)
  const axiosPublic = UseAxiosPublic()

  const handelJoinCamp = e =>{
    e.preventDefault()
    const from = e.target;
    const campName= from.campName.value;
    const healthcareName=from.healthcareName.value;
    const photo= from.photo.value;
    const campFees=parseInt(from.campFees.value);
    const location=from.location.value;
   
    const description=from.description.value;
    const date = startDate? `${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${startDate.getFullYear()}`
  : null;
  const userName= from.userName.value;
    const userEmail=from.userEmail.value;
    const gender=from.gender.value;
    const emergency_contact=from.emergency_contact.value;
    const phone_number=from.phone_number.value;

    const formData = {
        campId: _id,
        campName,
        healthcareName,
        photo,
        campFees,
        location,
        participantCount:participantCount+1,
        description,
        userName,
        userEmail,
        gender,
        emergency_contact,
        date,
        phone_number
    }
    console.log(formData);
    try{
         axiosPublic.post("/JoinCamp",formData)
         .then(res=> console.log(res.data))
         Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
    }
    catch (error){
        console.log(error);
    }

  }

  return (
    <div>
      <div className=" p-2  min-h-screen">
        <div className="text-center ">
          <h2 className="text-2xl md:text-5xl font-bold mb-5"> Join A Camp</h2>
          <div className=" mt-10">
            <form onSubmit={handelJoinCamp}>
              <div className="md:flex gap-3">
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Camp Name</span>
                  </label>
                  <input
                    type="text"
                    name="campName"
                    defaultValue={campName}
                    readOnly
                    placeholder="Camp Name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">
                      Healthcare Professional Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="healthcareName"
                    defaultValue={healthcareName}
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                    placeholder="Location"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                
              </div>

              <div className="md:flex gap-3 items-center">
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Date & Time</span>
                  </label>
                  <label className="input-group ">
                    <DatePicker
                      className="border py-3 px-2 rounded-xl w-full "
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MM/dd/yyyy"
                      name="date"
                      defaultValue={date}
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    id=""
                    defaultValue={description}
                    readOnly
                    cols="30"
                    rows="10"
                    className="border p-2 "
                  ></textarea>
                </div>
              </div>

              <div className="md:flex gap-3">
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Participant Email</span>
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    defaultValue={user?.email}
                    placeholder="email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Participant Name</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    defaultValue={user?.displayName}
                    placeholder="name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="md:flex gap-3">
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="number"
                    name="phone_number"
                    placeholder="number"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Participant Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="age"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="md:flex gap-3">
                <div className="form-control md:w-1/2">
                
                  <select id="gender" name="gender" required   className="input input-bordered w-full mt-9">
                    <option value="" disabled selected>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Emergency Contact</span>
                  </label>
                  <input
                    type="number"
                    name="emergency_contact"
                    placeholder="Emergency Contact"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="form-control mt-6">
                <button className="btn text-white bg-[#578E7E] hover:bg-[#219B9D]">
                  Join Camp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCamp;
