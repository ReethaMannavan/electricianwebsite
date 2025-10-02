// // src/components/CartModal.jsx
// import React from "react";
// import { useCart } from "../../components/context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function CartModal() {
//   const { cart, isOpen, setIsOpen, updateCartItem, removeCartItem } = useCart();
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   return (
//  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-start pt-20 pr-4">

//       <div className="relative w-[348px] h-[534px] bg-white shadow-lg rounded-[25px] p-6 overflow-y-auto">
//         <button
//           className="absolute top-4 right-4 text-black text-2xl font-bold"
//           onClick={() => setIsOpen(false)}
//         >
//           ×
//         </button>

//         <h2 className="text-xl font-semibold mb-6">Cart</h2>

//         <div className="space-y-6">
//           {cart?.items.length > 0 ? (
//             cart.items.map((item) => (
//               <div key={item.id} className="flex flex-col bg-gray-50 p-4 rounded-lg relative">
//                 <h3 className="text-lg font-medium">{item.title}</h3>
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     className="w-8 h-8 bg-gray-300 rounded"
//                     onClick={() =>
//                       item.quantity > 1 && updateCartItem(item.id, item.quantity - 1)
//                     }
//                   >
//                     -
//                   </button>
//                   <span className="text-lg font-medium">{item.quantity}</span>
//                   <button
//                     className="w-8 h-8 bg-gray-300 rounded"
//                     onClick={() => updateCartItem(item.id, item.quantity + 1)}
//                   >
//                     +
//                   </button>
//                   <span className="ml-auto font-semibold">₹{item.total_price}</span>
//                 </div>

//                 <div className="mt-1 text-sm text-gray-600">
//                   Add ₹92 more to save on visitation fees
//                 </div>

//                 <button
//                   className="absolute top-2 right-2 text-red-500"
//                   onClick={() => removeCartItem(item.id)}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">Your cart is empty.</p>
//           )}
//         </div>

//         {cart?.items.length > 0 && (
//           <div className="absolute bottom-6 left-6 w-[calc(100%-3rem)] flex flex-col gap-3">
//             <div className="text-lg font-semibold">Amount: ₹{cart.total_amount}</div>
//             <button
//               className="w-full bg-[#E25C26] text-white py-3 rounded-[30px] font-semibold"
//               onClick={() => {
//                 setIsOpen(false);
//                 navigate("/checkout");
//               }}
//             >
//               Book Now
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/components/CartModal.jsx
// import React from "react";
// import { useCart } from "../../components/context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function CartModal() {
//   const { cart, isOpen, setIsOpen, updateCartItem, removeCartItem } = useCart();
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-start pt-20 pr-4">
//       <div className="relative w-[348px] max-h-[90vh] bg-white shadow-lg rounded-[25px] p-6 overflow-y-auto">
//         <button
//           className="absolute top-4 right-4 text-black text-2xl font-bold"
//           onClick={() => setIsOpen(false)}
//         >
//           ×
//         </button>

//         <h2 className="text-xl font-semibold mb-6">Cart</h2>

//         <div className="space-y-6">
//           {cart?.items.length > 0 ? (
//             cart.items.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col bg-gray-50 p-4 rounded-lg relative"
//               >
//                 <h3 className="text-lg font-medium">{item.title}</h3>
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     className="w-8 h-8 bg-gray-300 rounded"
//                     onClick={() =>
//                       item.quantity > 1 &&
//                       updateCartItem(item.id, item.quantity - 1)
//                     }
//                   >
//                     -
//                   </button>
//                   <span className="text-lg font-medium">{item.quantity}</span>
//                   <button
//                     className="w-8 h-8 bg-gray-300 rounded"
//                     onClick={() => updateCartItem(item.id, item.quantity + 1)}
//                   >
//                     +
//                   </button>
//                   <span className="ml-auto font-semibold">
//                     ₹{item.total_price}
//                   </span>
//                 </div>

//                 <div className="mt-1 text-sm text-gray-600">
//                   Add ₹92 more to save on visitation fees
//                 </div>

//                 <button
//                   className="absolute top-2 right-2 text-red-500"
//                   onClick={() => removeCartItem(item.id)}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">Your cart is empty.</p>
//           )}
//         </div>

//         {cart?.items.length > 0 && (
//           <div className="absolute bottom-6 left-6 w-[calc(100%-3rem)] flex flex-col gap-3">
//             <div className="text-lg font-semibold">
//               Amount: ₹{cart.total_amount}
//             </div>
//             <button
//               className="w-full bg-[#E25C26] text-white py-3 rounded-[30px] font-semibold"
//               onClick={() => {
//                 setIsOpen(false);
//                 navigate("/checkout");
//               }}
//             >
//               Book Now
//             </button>

//             {/* --- Static Offer Section --- */}
//             <div className="border rounded-xl p-4 mt-3 shadow-sm">
//               <div className="flex items-start space-x-3">
//                 <div className="flex-shrink-0">
//                   <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-lg font-bold">
//                     %
//                   </span>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-sm font-semibold text-gray-800">
//                     Get visitation fees offer
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     On orders above ₹200
//                   </p>
//                   <button className="text-sm text-[#E25C26] font-medium mt-1 hover:underline">
//                     View more offers
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* --- Static UC Promise Section --- */}
//             <div className="border rounded-xl p-4 mt-3 shadow-sm">
//               <h3 className="text-sm font-semibold text-gray-800 mb-2">
//                 UC promise
//               </h3>
//               <ul className="space-y-1 text-sm text-gray-700">
//                 <li className="flex items-center">
//                   <span className="text-green-600 mr-2">✓</span>
//                   Verified professionals
//                 </li>
//                 <li className="flex items-center">
//                   <span className="text-green-600 mr-2">✓</span>
//                   Hassle free booking
//                 </li>
//                 <li className="flex items-center">
//                   <span className="text-green-600 mr-2">✓</span>
//                   Transparent pricing
//                 </li>
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// src/components/CartModal.jsx
import React from "react";
import { useCart } from "../../components/context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartModal() {
  const { cart, isOpen, setIsOpen, updateCartItem, removeCartItem } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-start pt-10 pr-4">
      <div className="relative w-[348px] max-h-[90vh] bg-white shadow-lg rounded-[25px] p-6 overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-black text-2xl font-bold"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">Cart</h2>

        <div className="space-y-6">
          {cart?.items.length > 0 ? (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-gray-50 p-4 rounded-lg relative"
              >
                <h3 className="text-lg font-medium">{item.title}</h3>
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
                  <span className="ml-auto font-semibold">
                    ₹{item.total_price}
                  </span>
                </div>

                <div className="mt-1 text-sm text-gray-600">
                  Add ₹92 more to save on visitation fees
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
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {cart?.items.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            <div className="text-lg font-semibold">
              Amount: ₹{cart.total_amount}
            </div>
            <button
              className="w-full bg-[#E25C26] text-white py-3 rounded-[30px] font-semibold"
              onClick={() => {
                setIsOpen(false);
                navigate("/checkout");
              }}
            >
              Book Now
            </button>

            {/* --- Static Offer Section --- */}
            <div className="border rounded-xl p-4 mt-3 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-lg font-bold">
                    %
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800">
                    Get visitation fees offer
                  </p>
                  <p className="text-xs text-gray-600">
                    On orders above ₹200
                  </p>
                  <button className="text-sm text-[#E25C26] font-medium mt-1 hover:underline">
                    View more offers
                  </button>
                </div>
              </div>
            </div>

            {/* --- Static UC Promise Section --- */}
            <div className="border rounded-xl p-4 mt-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                UC promise
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Verified professionals
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Hassle free booking
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Transparent pricing
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
