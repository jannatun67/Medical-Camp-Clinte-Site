
import featured from "../../assets/banner/Featured.jpg"
const Featured = () => {
    return (
        <div className=" w-11/12 mx-auto py-10">
            <div className="w-10/12 mx-auto">
            <div>
                <h1 className="text-2xl md:text-4xl font-semibold mb-5">Featured in Forbes</h1>
            </div>
            <div className="md:flex items-center gap-6">
                <img src={featured} alt="" />
                <div>
                    <h3 className="md:text-3xl">Startup Eskala Aims To Reimagine Microfinance With Micro-Equity.</h3>
                    <div className=" flex justify-center">
                        <button className="btn bg-[#578E7E] hover:bg-[#219B9D] text-white">LINK TO ARTICLE</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Featured;