import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/Animation - 1737212013013.json"

const ErrorPage = () => {
    return (
       <div className="flex justify-center">
         <div className=" w-96 ">
            <Lottie animationData={groovyWalkAnimation} />
        </div>
       </div>
    );
};

export default ErrorPage;
