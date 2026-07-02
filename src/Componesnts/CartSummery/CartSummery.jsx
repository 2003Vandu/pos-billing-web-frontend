import { useContext, useState } from 'react';
import'./CartSummery.css';
import { AppContext } from '../../Context/Appcontext';
import { createOrder, deleteOrder } from '../../Service/OrderService';
import {toast} from 'react-hot-toast';
import { createrazorpayOrder, verifyPayment } from '../../Service/PaymentService';
import { AppConstants } from '../../Util/Constant';
import  ReceiptPopup from  '../ReceiptPopup/ReceiptPopup';


const CartSymmery =({customerName, setCustomerName,mobileNumber, setMobileNumber})=>{

     console.log("🔍 Props Check:", { customerName, mobileNumber });

     {/** we will get a cart item from Appcontext */}
     const {cartItems, clearCart} =useContext(AppContext);
     const [isProcessing , setIsProcessing] = useState(false);
     const [orderDetails, setOrderDetails] = useState(null);
     const [showPopup , setShowPopup] = useState(false);


     
     {/** we need to calculate the total amount  */}
     const totalAmount =  cartItems.reduce((total,item)=> total + item.price * item.quantity, 0);

     {/** once we get a total amount we can calculate tax  */}
     const tax =totalAmount *0.01;

     {/** we calculate grand total */}
     const grandTotal= totalAmount + tax;

     {/** to clear the cart */}
     const clearAll=()=>{
        setCustomerName("");
        setMobileNumber("");
        clearCart();
        setOrderDetails(null);  // ✅ Reset order details
        setShowPopup(false);    // ✅ Close popup
     }
// ✅ Place Order just shows the receipt (if order exists)
    const placeOrder = () => {
        if (orderDetails) {
            toast.error("Please complete payment first!");
            return;
        }
        setShowPopup(true);
    };

     const handlePrintReceipt = () =>{
        window.print();
     };

    
     {/** hear we create a function to load a razorpay script */}
     const loadRazorpayScript = ()=>{

        return new Promise((resolve, rejected)=>{
            const script = document.createElement('script')
            script.src="https://checkout.razorpay.com/v1/checkout.js";
            script.onload  = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        })
     }

     {/** we need creat one more function for delete order method if mone thing goes wrong 
        we have to delete the order from the database */}
        const deletOrderOnFailure = async (orderId) => {

            try {
                await deleteOrder(orderId);
            } catch (error) {
                console.error(error);
                toast.error("something went wrong");
                
            }
        }

        const completPayment = async (paymentMode)=>{
            if(!customerName  || !mobileNumber )
            {
                toast.error("Please enter a valid customer details");
                return;
            }
            if(cartItems.length === 0){
                toast.error("Your cart is empty");
                return;
            }
            const orderData = {
                    customerName,customerName,
                    phoneNumber: mobileNumber,
                    cartItems,
                    subtotal: totalAmount,
                    tax,
                    grandTotal,
                    paymentMethod :paymentMode.toUpperCase()
                 }
                 console.log("📤 Sending Order Data:", orderData);  // ✅ Debug 
            setIsProcessing(true);
            try {

               const response = await createOrder(orderData);
               const savedData = response.data;
               console.log("📥 Response from server:", savedData);  // ✅ Debug log

                 if(response.status === 201 && paymentMode === "CASH") {

                      toast.success("Cash Recived");
                      setOrderDetails({
                      ...response.data,
                      subtotal: totalAmount,
                      tax,
                      grandTotal,
                      paymentMethod: "CASH",
                      customerName: customerName,   // ✅ consistent naming
                      mobileNumber,  mobileNumber,  // ✅ consistent naming
                      phoneNumber: mobileNumber, 
                      cartItems: cartItems
                   });
                     setShowPopup(true);  // ✅ show receipt immediately
                 }else if(response.status === 201 && paymentMode =="UPI") {
                      //setOrderDetails(response.data);
                      const razorpayLoaded = await loadRazorpayScript();
                      
                      if(!razorpayLoaded || !window.Razorpay){
                        toast.error("unnable to load razorpay");
                        await deletOrderOnFailure(savedData.orderId);
                        return;
                      }
                      // create razorpay order
                      const razorpayResponse = await createrazorpayOrder({
                        amount: grandTotal,
                        currency:'INR'
                        });
                      // its a object 
                      const options = {
                          key: AppConstants.RAZORPAY_KEY_ID,
                          amount: razorpayResponse.data.amount,
                          currency: razorpayResponse.data.currency,
                          order_id: razorpayResponse.data.id,
                          name: "My Retail Shop ",
                          description: "Order payment",
                          
                          handler: async function (response) {
                            //TODO verify the payment 
                               // ✅ FIXED: use savedData from first createOrder
                               await verifyPaymentHandler(response, savedData);
                          },
                          prefill:{
                            name: customerName,
                            contact: mobileNumber,
                            vpa: "success@razorpay"
                          },
                          theme:{
                            color:"#3399cc"
                          },
                          modal:{   // ✅ correct spelling
                                ondismiss: async () => {
                                await deletOrderOnFailure(savedData.orderId);
                                 toast.error("Payment cancelled");
                                 }
                          },
                      };
                      const rzp = new window.Razorpay(options);
                      rzp.on("payment.failed", async (response) => {
                            await deletOrderOnFailure(savedData.orderId);
                            toast.error("Payment Failed");
                            console.error(response.error.description);  // ✅ fixed
                        });
                      rzp.open();
                 }

            } catch (error) {
                console.error(error);
                toast.error("payment processing failed");   
            } finally{
                setIsProcessing(false);
            }
        };

        const verifyPaymentHandler = async (response, savedData) => {
  const paymentData = {
    razorpayOrderId: response.razorpay_order_id,
    razorpayPaymentId: response.razorpay_payment_id,
    razorpaySignature: response.razorpay_signature,
    orderId: savedData.orderId,
  };

  try {
    const paymentResponse = await verifyPayment(paymentData);

    if (paymentResponse.status >= 200 && paymentResponse.status < 300) {
      toast.success("Payment successful");
      const updatedOrder = paymentResponse.data; // use backend’s updated order
      setOrderDetails({
        ...updatedOrder,
        subtotal: updatedOrder.subtotal || totalAmount,
        tax: updatedOrder.tax || tax,
        grandTotal: updatedOrder.grandTotal || grandTotal,
        paymentMethod: "UPI",
        customerName: customerName,   // ✅ consistent naming
         phoneNumber: mobileNumber, 
        mobileNumber: mobileNumber,    // ✅ consistent naming
        cartItems: cartItems,
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      });
      setShowPopup(true);  // ✅ show receipt immediately
    } else {
      toast.error("Payment processing failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Payment failed");
  }
};


    return(
        <div className="mt-2">
            <div className="cart-summery-details">
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Item:</span>
                    <span className="text-light">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Tax (1%)</span>
                    <span className="text-light">₹{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-light">Total (1%)</span>
                    <span className="text-light">₹{grandTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex gap-5">
                    <button className="btn btn-success flex-grow-1" 
                    onClick={()=>completPayment("CASH")}
                    disabled={isProcessing}
                    >
                        {isProcessing? "Processing...":"CASH"}
                    </button>
                    <button className="btn btn-primary flex-grow-1"
                     onClick={()=>completPayment("UPI")}
                     disabled={isProcessing}
                     >
                       {isProcessing? "Processing...":"UPI"}
                    </button>
                </div>
                <div className="d-flex gap-2 mt-1">
                    <button className="btn btn-warning flex-grow-1"
                     onClick={()=>placeOrder("upi")}
                     disabled={isProcessing|| !orderDetails}
                    >
                          Place Order
                    </button>
                </div>
                {
                showPopup && orderDetails && (
                    <ReceiptPopup
                    orderDetails={orderDetails}  // ✅ Simple and correct
                    onClose={() => {
                        setShowPopup(false);
                        clearAll();
                    }}
                    onPrint={handlePrintReceipt}
                    />   
                )}
                
            </div>
        </div>
        
    )
}
export default CartSymmery;