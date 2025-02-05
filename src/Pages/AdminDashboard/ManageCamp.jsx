import {useQuery,} from '@tanstack/react-query'
import UseAxiosSecure from '../../UseHook/UseAxiosSecure';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SweetPagination from "sweetpagination";

const ManageCamp = () => {
    const axiosSecure=UseAxiosSecure()
    const [currentPageData, setCurrentPageData] = useState([]);
    const {data:camps=[] , refetch}= useQuery({
        queryKey:['camp'],
        enabled:!!localStorage.getItem("access-token"),
        queryFn: async ()=> {
          const res=  await axiosSecure.get('/medicalCamps')
          return res.data
        }
    })
    // console.log(camps);

    const handelDelete = (id)=>{
      // console.log(id);
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
         
          axiosSecure.delete(`/medicalCamps/${id}`)
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
        <div className="text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-5 ">Manage Camps</h2>
        </div>
      <div className="overflow-x-auto pt-10">
        <table className="table">
          {/* head */}
          <thead className="bg-[#578E7E] text-white">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th> Healthcare Professiona</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {
              camps.map((camp,index) =>  <tr key={camp?._id}>
                <th>{index+1}</th>
                <td>{camp?.campName}</td>
                <td>{camp?.date}</td>
                <td>{camp?.location}</td>
                <td>{camp?.healthcareName}</td>
               <div className='flex gap-3 items-center'>
               <td>
                <Link to={`/dashboard/updateCamp/${camp?._id}`}><button className='btn bg-[#578E7E] text-white'><FaEdit /></button></Link>
               </td>
               <td onClick={() =>handelDelete(camp?._id)} className='btn bg-[#578E7E] text-white'><RiDeleteBin6Fill /></td>
               </div>
              </tr>)
            }
      
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

export default ManageCamp;
