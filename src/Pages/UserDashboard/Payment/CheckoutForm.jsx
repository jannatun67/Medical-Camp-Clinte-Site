import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosPublic from "../../../UseHook/UseAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";


const CheckoutForm = ({id}) => {
    const[error,setError]=useState('')
    const [transactionId,setTransactionId]= useState('')
    const stripe = useStripe()
    const elements= useElements()
    const axiosPublic= UseAxiosPublic()
    const [clientSecret, setClientSecret] = useState("");
    const {user}=useContext(AuthContext)

    const [camps,setCamps]=useState([])
  
    // console.log("camp",camps);
    useEffect(()=>{
       axiosPublic.get('/medicalCamps')
        .then(res => setCamps(res.data))
    },[])
    
    const totalCampFees = camps.reduce((total, camp) => {
      return total + (camp.campFees || 0); // Add campFees if defined, else add 0
  }, 0);
// console.log(totalCampFees);
useEffect(() => {
  if (totalCampFees && totalCampFees > 0) {
      const createPaymentIntent = async () => {
          try {
              const response = await axiosPublic.post("/create-payment-intent", { totalCampFee: totalCampFees });
              setClientSecret(response.data.clientSecret);
          } catch (error) {
              console.error("Error creating payment intent:", error);
          }
      };

      createPaymentIntent();
  } else {
      console.warn("Invalid totalCampFees provided.");
  }
}, [totalCampFees,axiosPublic]);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            console.log('error', error);
           setError(error.message)
          } else {
            console.log('Payment Method', paymentMethod);
            setError("")
          }
          // confirm payment
          const{paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
              card:card,
              billing_details:{
                email:user?.email ||"anonymous",
                name:user?.displayName ||"anonymous"
              }
            }
          })
          if (confirmError) {
            console.log("confirm Error");
          }
          else{
            console.log("Payment Intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
              console.log("transaction id", paymentIntent.id);
              setTransactionId(paymentIntent.id)
              // now save the payment database
              const payment={
                email:user?.email,
                Fees:totalCampFees,
                transactionId:paymentIntent.id,
                date:new Date(),
                campId:id,
                campName:camps?.campName,
                pendingStatus:"confirmed",
                status:"paid"
                // campsId:camps.map(item=> item.id),
              }
           const res=await axiosPublic.post("/payments",payment)
           console.log("payment save",res);
           if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Payment is Successful",
              showConfirmButton: false,
              timer: 1500
            });
           }
            }
          }
    }
  return (
    <div>
        <div>
            <h2 className="text-center font-bold text-3xl mb-7">Payment</h2>
        </div>
      <form onSubmit={handleSubmit}>
       <CardElement
       options={{
        style:{
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
        }
       }}
       >
       </CardElement>
      <div className="flex justify-center mt-5">
      <button className="btn text-white bg-[#578E7E] hover:bg-[#219B9D]" type="submit"
       disabled={!stripe || !clientSecret}>
        Pay
      </button>
      </div>
       <p className="text-red-600">{error}</p>
       {transactionId && <p className="text-green-600">Your Transaction:{transactionId}</p>}
      </form>
    </div>
  );
}; 

export default CheckoutForm;
