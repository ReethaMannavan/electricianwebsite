// // src/pages/CheckoutPage.jsx
// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// import upi from '../../assets/images/upi.PNG'
// import net from '../../assets/images/net.PNG'
// import visa from '../../assets/images/visa.PNG'

// export default function CheckoutPage() {
//   const { cart, updateCartItem, removeCartItem, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const [selectedDate, setSelectedDate] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
//     setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//     setErrors((prev) => ({ ...prev, serviceDate: undefined }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     const phoneRegex = /^\d{10}$/;

//     if (!formData.firstName || !formData.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     } else if (!nameRegex.test(formData.firstName.trim())) {
//       newErrors.firstName = "First name must contain only letters and spaces";
//     }

//     if (!formData.lastName || !formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     } else if (!nameRegex.test(formData.lastName.trim())) {
//       newErrors.lastName = "Last name must contain only letters and spaces";
//     }

//     if (!formData.email || !formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email.trim())) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.phone || !formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!phoneRegex.test(formData.phone.trim())) {
//       newErrors.phone = "Phone must be exactly 10 digits";
//     }

//     if (!formData.address || !formData.address.trim()) {
//       newErrors.address = "Address is required";
//     } else if (formData.address.trim().length > 255) {
//       newErrors.address = "Address is too long";
//     }

//     if (!selectedDate) {
//       newErrors.serviceDate = "Please select a service date";
//     } else {
//       const picked = new Date(selectedDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (picked < today) {
//         newErrors.serviceDate = "Please select today or a future date";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const clearCartNow = async () => {
//     try {
//       if (typeof clearCart === "function") {
//         await clearCart();
//         return;
//       }
//       if (!cart || !cart.items || cart.items.length === 0) return;
//       await Promise.all(cart.items.map((it) => removeCartItem(it.id)));
//     } catch (err) {
//       console.error("Error clearing cart:", err);
//     }
//   };

//   const handlePayNow = async () => {
//     if (!cart || !cart.items || cart.items.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     setIsProcessing(true);

//     const payload = {
//       customer: {
//         first_name: formData.firstName.trim(),
//         last_name: formData.lastName.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone.trim(),
//         address: formData.address.trim(),
//       },
//       service_date: selectedDate,
//       cart,
//       total_amount: Number(cart.total_amount) + 80,
//     };

//     try {
//       console.log("Checkout payload (simulate send):", payload);
//       await clearCartNow();
//       setShowPaymentModal(true);
//     } catch (err) {
//       console.error("Payment / order error:", err);
//       alert("Something went wrong while processing your order. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowPaymentModal(false);
//     navigate("/");
//   };

//   const todayStr = new Date().toISOString().split("T")[0];

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
//         {/* LEFT SIDE - Cart Items + Summary */}
//         <div className="bg-[#E25C26] rounded-2xl shadow-lg p-6">
//           {/* Cart Items */}
//           <div className="space-y-6">
//             {cart?.items?.length > 0 ? (
//               cart.items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-4 p-4 rounded-xl relative"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-20 h-20 object-cover rounded-lg"
//                   />
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold">{item.title}</h3>
//                     <div className="flex items-center gap-2 mt-2">
//                       <button
//                         className="w-8 h-8 bg-gray-300 rounded"
//                         onClick={() =>
//                           item.quantity > 1 &&
//                           updateCartItem(item.id, item.quantity - 1)
//                         }
//                       >
//                         -
//                       </button>
//                       <span className="text-lg font-medium">{item.quantity}</span>
//                       <button
//                         className="w-8 h-8 bg-gray-300 rounded"
//                         onClick={() => updateCartItem(item.id, item.quantity + 1)}
//                       >
//                         +
//                       </button>
//                       <span className="ml-auto font-semibold text-white">
//                         ₹{item.total_price}
//                       </span>
//                     </div>
//                   </div>
//                   <button
//                     className="absolute top-2 right-2 text-red-500"
//                     onClick={() => removeCartItem(item.id)}
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-black text-lg">Your cart is empty.</p>
//             )}
//           </div>

//           {/* Payment Summary */}
//           {cart?.items?.length > 0 && (
//             <div className="mt-8 border-t pt-6 space-y-2 text-lg">
//               <div className="flex justify-between">
//                 <span>Item Total</span>
//                 <span>₹{cart.total_amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Visitation Fee</span>
//                 <span>₹50</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Taxes & Fees</span>
//                 <span>₹30</span>
//               </div>
//               <div className="flex justify-between font-bold text-xl">
//                 <span>Total Amount</span>
//                 <span>₹{cart.total_amount + 80}</span>
//               </div>
//               <div className="flex justify-between text-[#E25C26] font-bold">
//                 <span>Amount to Pay</span>
//                 <span>₹{cart.total_amount + 80}</span>
//               </div>

        
//             </div>
//           )}

//           {/* 👉 Service Date Picker moved BELOW Delete button */}
//           {cart?.items?.length > 0 && (
//             <div className="mt-20 text-black">
//               <h3 className="text-lg font-semibold mb-2">Select Service Date</h3>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={handleDateChange}
//                 className="border border-gray-600 rounded-lg px-3 py-2 w-full"
//                 min={todayStr}
//               />
//               {errors.serviceDate && (
//                 <p className="text-red-500 text-sm mt-1">{errors.serviceDate}</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE - Customer Details Form */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 text-black">
//           <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

//           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1 ">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="w-full border border-gray-600 rounded-lg px-3 py-2"
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="w-full border border-gray-600 rounded-lg px-3 py-2"
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border border-gray-600 rounded-lg px-3 py-2"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full border border-gray-600 rounded-lg px-3 py-2"
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Address</label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full border border-gray-600 rounded-lg px-3 py-2"
//                 rows="3"
//               />
//               {errors.address && (
//                 <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//               )}
//             </div>

//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-center border border-gray-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-[#F6561680]">
              
//                   <span className="font-medium">Pay with </span>
//                       <img src={upi} alt="Visa" className="w-10 h-6 mr-3" />
//                 </div>
//                 <div className="flex items-center justify-center border border-gray-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-[#F6561680]">
                
//                   <span className="font-medium">Pay with </span>
//                     <img src={net} alt="Mastercard" className="w-10 h-6 mr-3" />
//                 </div>
//                 <div className="flex items-center justify-center border border-gray-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-[#F6561680]">
                  
//                   <span className="font-medium">Pay with </span>
//                   <img src={visa} alt="UPI" className="w-10 h-6 mr-3" />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="button"
//               className={`w-full py-3 rounded-xl mt-6 font-bold ${isProcessing ? "bg-gray-400 text-white" : "bg-[#E25C26] text-white"}`}
//               onClick={handlePayNow}
//               disabled={isProcessing}
//             >
//               {isProcessing ? "Processing..." : "Pay Now"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {showPaymentModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg p-8 text-center w-[350px]">
//             <h2 className="text-2xl font-bold mb-4">Payment Completed</h2>
//             <p className="text-gray-600 mb-4">Thank you for your payment. Your booking is confirmed.</p>
//             <p className="text-sm text-gray-500 mb-6">
//               Service Date: <span className="font-semibold">{selectedDate}</span>
//             </p>
//             <button className="bg-[#E25C26] text-white px-6 py-2 rounded-lg" onClick={handleCloseModal}>
//               Back to Home
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


import upi from '../../assets/images/upi.PNG'
import net from '../../assets/images/net.PNG'
import visa from '../../assets/images/visa.PNG'

export default function CheckoutPage() {
  const { cart, updateCartItem, removeCartItem, clearCart } = useCart();
  const navigate = useNavigate();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(""); // ✅ added

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setErrors((prev) => ({ ...prev, serviceDate: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.firstName || !formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = "First name must contain only letters and spaces";
    }

    if (!formData.lastName || !formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name must contain only letters and spaces";
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (!formData.address || !formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length > 255) {
      newErrors.address = "Address is too long";
    }

    // ✅ Service Date validation
    if (!selectedDate) {
      newErrors.serviceDate = "Please select a service date";
    } else {
      const picked = new Date(selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (picked < today) {
        newErrors.serviceDate = "Please select today or a future date";
      }
    }

    // ✅ Payment method validation
    if (!selectedPayment) {
      newErrors.payment = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearCartNow = async () => {
    try {
      if (typeof clearCart === "function") {
        await clearCart();
        return;
      }
      if (!cart || !cart.items || cart.items.length === 0) return;
      await Promise.all(cart.items.map((it) => removeCartItem(it.id)));
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

 const handlePayNow = async () => {
  if (!cart || !cart.items || cart.items.length === 0) {
    toast.error("Your cart is empty.");
    return;
  }

  const isValid = validateForm();

  if (!isValid) {
    // Toast for service date
    if (!selectedDate) {
      toast.error("Please select a service date");
    }

    // Toast for payment method
    if (!selectedPayment) {
      toast.error("Please select a payment method");
    }

    return; // stop submission
  }

  setIsProcessing(true);

  const payload = {
    customer: {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    },
    service_date: selectedDate,
    payment_method: selectedPayment,
    cart,
    total_amount: Number(cart.total_amount) + 80,
  };

  try {
    console.log("Checkout payload (simulate send):", payload);
    await clearCartNow();
    setShowPaymentModal(true);
  } catch (err) {
    console.error("Payment / order error:", err);
    toast.error("Something went wrong while processing your order. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    navigate("/");
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
        {/* LEFT SIDE - Cart Items + Summary */}
        <div className="bg-[#E25C26] rounded-2xl shadow-lg p-6">
          {/* Cart Items */}
          <div className="space-y-6">
            {cart?.items?.length > 0 ? (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-xl relative"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="w-8 h-8 bg-gray-300 rounded"
                        onClick={() =>
                          item.quantity > 1 &&
                          updateCartItem(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        className="w-8 h-8 bg-gray-300 rounded"
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <span className="ml-auto font-semibold text-white">
                        ₹{item.total_price}
                      </span>
                    </div>
                  </div>
                  <button
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => removeCartItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-black text-lg">Your cart is empty.</p>
            )}
          </div>

          {/* Payment Summary */}
          {cart?.items?.length > 0 && (
            <div className="mt-8 border-t pt-6 space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{cart.total_amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Visitation Fee</span>
                <span>₹50</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>₹30</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total Amount</span>
                <span>₹{cart.total_amount + 80}</span>
              </div>
              <div className="flex justify-between text-[#E25C26] font-bold">
                <span>Amount to Pay</span>
                <span>₹{cart.total_amount + 80}</span>
              </div>
            </div>
          )}

          {/* 👉 Service Date Picker */}
          {cart?.items?.length > 0 && (
            <div className="mt-20 text-black">
              <h3 className="text-lg font-semibold mb-2">Select Service Date</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border border-gray-600 rounded-lg px-3 py-2 w-full"
                min={todayStr}
              />
              {errors.serviceDate && (
                <p className="text-red-500 text-sm mt-1">{errors.serviceDate}</p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Customer Details Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-black">
          <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 ">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-600 rounded-lg px-3 py-2"
                rows="3"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Payment Details */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center justify-center border rounded-lg px-4 py-3 cursor-pointer hover:bg-[#F6561680] ${
                    selectedPayment === "upi" ? "border-[#E25C26] border-2" : "border-gray-600"
                  }`}
                  onClick={() => setSelectedPayment("upi")}
                >
                  <span className="font-medium">Pay with </span>
                  <img src={upi} alt="UPI" className="w-10 h-6 mr-3" />
                </div>

                <div
                  className={`flex items-center justify-center border rounded-lg px-4 py-3 cursor-pointer hover:bg-[#F6561680] ${
                    selectedPayment === "net" ? "border-[#E25C26] border-2" : "border-gray-600"
                  }`}
                  onClick={() => setSelectedPayment("net")}
                >
                  <span className="font-medium">Pay with </span>
                  <img src={net} alt="Net Banking" className="w-10 h-6 mr-3" />
                </div>

                <div
                  className={`flex items-center justify-center border rounded-lg px-4 py-3 cursor-pointer hover:bg-[#F6561680] ${
                    selectedPayment === "visa" ? "border-[#E25C26] border-2" : "border-gray-600"
                  }`}
                  onClick={() => setSelectedPayment("visa")}
                >
                  <span className="font-medium">Pay with </span>
                  <img src={visa} alt="Visa" className="w-10 h-6 mr-3" />
                </div>

                {/* ✅ Payment error message */}
                {errors.payment && (
                  <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
                )}
              </div>
            </div>

            <button
              type="button"
              className={`w-full py-3 rounded-xl mt-6 font-bold ${
                isProcessing ? "bg-gray-400 text-white" : "bg-[#E25C26] text-white"
              }`}
              onClick={handlePayNow}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center w-[350px]">
            <h2 className="text-2xl font-bold mb-4">Payment Completed</h2>
            <p className="text-gray-600 mb-4">Thank you for your payment. Your booking is confirmed.</p>
            <p className="text-sm text-gray-500 mb-6">
              Service Date: <span className="font-semibold">{selectedDate}</span>
            </p>
            <button className="bg-[#E25C26] text-white px-6 py-2 rounded-lg" onClick={handleCloseModal}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
