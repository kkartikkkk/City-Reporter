import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3 } },
};

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const handleClick = (e) => {
    e.prventdefault;
    navigate("/admin");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <motion.div
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${
              isLogin ? "bg-indigo-100 text-indigo-700" : "text-gray-400"
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLogin(true)}
          >
            <FaSignInAlt />
            <span className="font-semibold">Login</span>
          </motion.div>
          <motion.div
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ml-2 ${
              !isLogin ? "bg-indigo-100 text-indigo-700" : "text-gray-400"
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLogin(false)}
          >
            <FaUserPlus />
            <span className="font-semibold">Sign Up</span>
          </motion.div>
        </div>

        <motion.form
          key={isLogin ? "login" : "signup"}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-5"
        >
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-indigo-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-indigo-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-indigo-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClick}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </motion.form>
        <div className="mt-6 text-center text-gray-500 text-sm">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
