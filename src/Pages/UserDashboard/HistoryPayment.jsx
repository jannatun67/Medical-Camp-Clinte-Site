import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";
import SweetPagination from "sweetpagination";
import { useState } from "react";

const HistoryPayment = () => {
   const [currentPageData, setCurrentPageData] = useState([]);
  const axiosPublic = UseAxiosPublic();
  const { data: PaymentHistory = [], refetch } = useQuery({
    queryKey: ["history"],
    enabled: !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosPublic.get("/payments");
      return res.data;
    }
  });
 
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#578E7E] text-white">
            <tr>
              <th></th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {PaymentHistory.map((history,index)=>  <tr key={history?._id} className="bg-base-200">
              <th>{index+1}</th>
              <td>Cy Ganderton</td>
              <td>{history?.Fees}</td>
              <td>{history?.status}</td>
              <td>{history?.pendingStatus}</td>
            </tr>)}
           
          </tbody>
        </table>
      </div>

       {/* pagination */}
       <SweetPagination
        currentPageData={setCurrentPageData}
        getData={PaymentHistory}
        dataPerPage={10}
        navigation={true}
        getStyle={'style-2'}
      />
    </div>
  );
};

export default HistoryPayment;
