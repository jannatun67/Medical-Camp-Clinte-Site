import { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";

const AvailableCamps = () => {
  const [grid, setGrid] = useState(true);
  const axiosPublic = UseAxiosPublic();

  const handelGrid = (value) => {
    setGrid(value);
  };

  const [camps, setCamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState('');

  // console.log(camps);
  useEffect(() => {
    axiosPublic.get("/medicalCamps").then((res) => setCamps(res.data));
  }, []);

  const handelSearch = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    const filteredCamps = camps.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.healthcareName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.date.includes(searchQuery)
    );
    setCamps(filteredCamps);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (sortOption === 'mostRegistered') {
    camps.sort((a, b) => b.participantCount - a.participantCount);
  } else if (sortOption === 'campFees') {
    camps.sort((a, b) => a.campFees - b.campFees); 
  } else if (sortOption === 'alphabetical') {
    camps.sort((a, b) => a.campName.localeCompare(b.campName));
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="md:flex justify-between  items-center">
        <div className="flex gap-5 items-center">
        <div className="flex gap-4 text-2xl">
          <div onClick={() => handelGrid(true)} className="cursor-pointer">
            {" "}
            <BsFillGrid3X3GapFill />
          </div>
          <div onClick={() => handelGrid(false)} className="cursor-pointer">
            <IoGrid />
          </div>
        </div>
        <div className="text-center md:text-5xl text-2xl font-bold md:mb-5">
          <h2>Available Camps</h2>
        </div>
        </div>

        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={handelSearch}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="mt-2">
        <select
        value={sortOption}
        onChange={handleSortChange}
        className="border rounded p-2 w-full mb-4"
      >
        <option value="">Sort By</option>
        <option value="mostRegistered">Most Registered</option>
        <option value="campFees">Camp Fees </option>
        <option value="alphabetical">Alphabetical Order (Camp Name)</option>
      </select>
        </div>
      </div>
      <div
        className={`grid md:grid-cols-2 ${
          grid ? "lg:grid-cols-3" : "lg:grid-cols-2"
        } grid-cols-1 gap-3 mt-10`}
      >
        {...camps?.map((camp) => (
          <div key={camp?._id} className="card bg-base-100  shadow-xl">
            <figure>
              <img
                className="h-[200px] w-[500px] object-cover"
                src={camp?.photo}
                alt="camp"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-bold text-2xl">
                {camp?.campName}
              </h2>
              <h2 className="font-semibold text-gray-500 text-xl">
                {camp?.location}
              </h2>
              <div className="flex justify-between items-center gap-2">
                <h3 className="text-gray-500 font-semibold">
                  {camp?.healthcareName}
                </h3>
                <h3 className="text-gray-500 font-semibold">
                  {camp?.campFees}
                </h3>
              </div>

              <div className="flex justify-items-end items-center gap-2">
                <p className="text-gray-500 font-semibold">{camp?.date}</p>
                <p className="text-gray-500 font-semibold">
                  {camp?.participantCount}
                </p>
              </div>

              <div className="card-actions justify-end">
                <Link to={`/camp-details/${camp?._id}`}>
                  <button className="btn  bg-indigo-600 hover:bg-indigo-800 text-white">
                    Camp Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
