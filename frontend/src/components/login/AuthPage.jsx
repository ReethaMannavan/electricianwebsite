// import { useState } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, ""); // remove trailing slash safely

// export default function AuthPage() {
//   // LOGIN state
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");

//   // REGISTER state
//   const [regPhone, setRegPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [regPassword, setRegPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   // Field-specific errors
//   const [regErrors, setRegErrors] = useState({});
//   const [otpError, setOtpError] = useState("");

//   // LOGIN
//   const handleLogin = async () => {
//     setLoginError("");
//     try {
//       const res = await axios.post(`${API_URL}/auth/login/`, {
//         phone_number: phone,
//         password,
//       });
//       alert("Login successful ✅");
//       console.log(res.data);
//     } catch (err) {
//       const data = err.response?.data || {};
//       setLoginError(
//         data.non_field_errors?.[0] ||
//         data.detail ||
//         "Login failed ❌"
//       );
//     }
//   };

//   // REGISTER
//   const handleRegister = async () => {
//     setRegErrors({});
//     try {
//       await axios.post(`${API_URL}/auth/register/`, {
//         phone_number: regPhone,
//         email,
//         password: regPassword,
//       });
//       setOtpSent(true);
//       alert("Registered ✅ Check email for OTP");
//     } catch (err) {
//       const data = err.response?.data || {};
//       setRegErrors({
//         phone_number: data.phone_number?.[0],
//         email: data.email?.[0],
//         password: data.password?.[0],
//         non_field_errors: data.non_field_errors?.[0],
//       });
//     }
//   };

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     setOtpError("");
//     try {
//       await axios.post(`${API_URL}/auth/verify-otp/`, {
//         phone_number: regPhone,
//         otp,
//       });
//       alert("Account verified ✅ You can now login");
//       setOtpSent(false);
//     } catch (err) {
//       const data = err.response?.data || {};
//       setOtpError(
//         data.error || data.non_field_errors?.[0] || "OTP verification failed ❌"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//       <h1 className="text-xl font-bold mb-8">Account Log in or Sign in</h1>

//       {/* LOGIN BOX */}
//       <div className="w-full max-w-md bg-white shadow rounded-2xl p-6 mb-10">
//         <div className="flex items-center mb-4">
//           <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//             <span className="text-2xl">👤</span>
//           </div>
//           <p className="text-sm font-medium">Log in to book your services</p>
//         </div>

//         <input
//           type="text"
//           placeholder="Phone number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full border border-gray-300 rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
//         />
//         {loginError && <p className="text-xs text-red-600 mb-3">{loginError}</p>}

//         <p className="text-xs text-orange-600 mb-3">
//           Enter mobile number, we will send a verification code
//         </p>
//         <input
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-orange-500"
//         />
//         <button
//           onClick={handleLogin}
//           className="bg-[#E25C26] hover:bg-[#CD3A00] text-white px-6 py-2 rounded-lg"
//         >
//           Log in
//         </button>
//       </div>

//       {/* SIGN UP BOX */}
//       <div className="w-full max-w-3xl bg-white shadow rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* LEFT: Phone & OTP */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Phone Number</label>
//           <input
//             type="text"
//             placeholder="Phone number"
//             value={regPhone}
//             onChange={(e) => setRegPhone(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
//           />
//           {regErrors.phone_number && (
//             <p className="text-xs text-red-600 mb-2">{regErrors.phone_number}</p>
//           )}

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-orange-500"
//               />
//               {otpError && <p className="text-xs text-red-600 mb-2">{otpError}</p>}
//               <button
//                 onClick={handleVerifyOtp}
//                 className="bg-[#F65616] hover:bg-[#CD3A00] text-white px-6 py-2 rounded-lg"
//               >
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </div>

//         {/* RIGHT: Email + Password */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Email Address</label>
//           <input
//             type="email"
//             placeholder="Email id"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
//           />
//           {regErrors.email && (
//             <p className="text-xs text-red-600 mb-2">{regErrors.email}</p>
//           )}

//           <label className="block text-sm font-medium mb-2">Password</label>
//           <input
//             type="password"
//             placeholder="10 digit"
//             value={regPassword}
//             onChange={(e) => setRegPassword(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
//           />
//           {regErrors.password && (
//             <p className="text-xs text-red-600 mb-2">{regErrors.password}</p>
//           )}

//           <button
//             onClick={handleRegister}
//             className="bg-[#0056B3] hover:bg-[#003d82] text-white px-6 py-2 rounded-lg"
//           >
//             Sign up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // keep as is

export default function AuthPage() {
  const navigate = useNavigate();

  // LOGIN state
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // REGISTER state
  const [regPhone, setRegPhone] = useState("");
  const [email, setEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Field-specific errors
  const [regErrors, setRegErrors] = useState({});
  const [otpError, setOtpError] = useState("");

  // LOGIN
  const handleLogin = async () => {
    setLoginError("");
    try {
      const res = await axios.post(`${API_URL}auth/login/`, {
        phone_number: phone,
        password,
      });
      alert("Login successful ✅");
      console.log(res.data);

      // Store JWT tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("user_phone", phone);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      const data = err.response?.data || {};
      setLoginError(
        data.non_field_errors?.[0] ||
        data.detail ||
        "Login failed ❌"
      );
    }
  };

  // REGISTER
  const handleRegister = async () => {
    setRegErrors({});
    try {
      await axios.post(`${API_URL}auth/register/`, {
        phone_number: regPhone,
        email,
        password: regPassword,
      });
      setOtpSent(true);
      alert("Registered ✅ Check email for OTP");
    } catch (err) {
      const data = err.response?.data || {};
      setRegErrors({
        phone_number: data.phone_number?.[0],
        email: data.email?.[0],
        password: data.password?.[0],
        non_field_errors: data.non_field_errors?.[0],
      });
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    setOtpError("");
    try {
      await axios.post(`${API_URL}auth/verify-otp/`, {
        phone_number: regPhone,
        otp,
      });
      alert("Account verified ✅ You can now login");
      setOtpSent(false);
    } catch (err) {
      const data = err.response?.data || {};
      setOtpError(
        data.error || data.non_field_errors?.[0] || "OTP verification failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-xl font-bold mb-8">Account Log in or Sign in</h1>

      {/* LOGIN BOX */}
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-6 mb-10 border border-black">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span className="text-2xl">👤</span>
          </div>
          <p className="text-sm font-medium">Log in to book your services</p>
        </div>

        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-black rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
        />
        {loginError && <p className="text-xs text-red-600 mb-3">{loginError}</p>}

        <p className="text-xs text-orange-600 mb-3">
          Enter mobile number, we will send a verification code
        </p>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-black rounded-lg p-3 mb-3 focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleLogin}
          className="bg-[#E25C26] hover:bg-[#CD3A00] text-white px-6 py-2 rounded-lg"
        >
          Log in
        </button>
      </div>
      
      {/* SIGN UP BOX */}<div>
           <h1 className="text-center mb-10 font-bold">Sign In with email or mobile number</h1>
   
      <div className="w-full max-w-3xl bg-white shadow rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-black">
        {/* LEFT: Phone & OTP */}
       
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="Phone number"
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
            className="w-full border border-black rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
          />
          {regErrors.phone_number && (
            <p className="text-xs text-red-600 mb-2">{regErrors.phone_number}</p>
          )}

          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-black rounded-lg p-3 mb-3 focus:ring-2 focus:ring-orange-500"
              />
              {otpError && <p className="text-xs text-red-600 mb-2">{otpError}</p>}
              <button
                onClick={handleVerifyOtp}
                className="bg-[#F65616] hover:bg-[#CD3A00] text-white px-6 py-2 rounded-lg"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>

        {/* RIGHT: Email + Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
          />
          {regErrors.email && (
            <p className="text-xs text-red-600 mb-2">{regErrors.email}</p>
          )}

          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Password (min 8 chars, letters & numbers)"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="w-full border border-black rounded-lg p-3 mb-1 focus:ring-2 focus:ring-orange-500"
          />
          {regErrors.password && (
            <p className="text-xs text-red-600 mb-2">{regErrors.password}</p>
          )}

          <button
            onClick={handleRegister}
            className="bg-[#E25C26] text-white px-6 py-2 rounded-lg"
          >
            Sign up
          </button>
        </div>
           </div>
      </div>
    </div>
  );
}
