import axios from "axios";

export const axiosPublic = axios.create({
    baseURL:"https://medical-camp-server-site.onrender.com"
})

const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;