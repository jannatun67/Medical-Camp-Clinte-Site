import { FaCheck } from "react-icons/fa";


const AboutInformeation = () => {
    return (
        <div className="w-11/12 mx-auto ">
           <div className="text-center my-8">
           <h2 className="text-2xl text-[#578E7E]">About Information</h2>
           <h1 className="md:text-4xl font-bold text-3xl">Every patient is different, every smile is unique</h1>
           </div>

           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            <div  className="flex items-center gap-4 my-9 border p-3 shadow-xl" >
                <div className="text-[#578E7E] text-3xl">
                <FaCheck />
                </div>
               <div>
               <h3 className="font-bold text-2xl"> Safety First</h3>
               <p>We prioritize safety with health checks, contactless check-in, enhanced PPE, and more.</p>
               </div>
            </div>

            <div  className="flex items-center gap-4 my-9 border p-3 shadow-xl" >
                <div className="text-[#578E7E] text-3xl">
                <FaCheck />
                </div>
               <div>
               <h3 className="font-bold text-2xl"> Insurance Accepted</h3>
               <p>We prioritize safety with health checks, contactless check-in, enhanced PPE, and more.</p>
               </div>
            </div>

            <div  className="flex items-center gap-4 my-9 border p-3 shadow-xl" >
                <div className="text-[#578E7E] text-3xl">
                <FaCheck />
                </div>
               <div>
               <h3 className="font-bold text-2xl"> Trusted Team</h3>
               <p>We prioritize safety with health checks, contactless check-in, enhanced PPE, and more.</p>
               </div>
            </div>
           </div>
        </div>
    );
};

export default AboutInformeation;