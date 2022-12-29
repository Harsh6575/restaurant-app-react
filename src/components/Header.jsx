import React from "react";
import Logo from "../images/logo.png";
import Avatar from "../images/avatar.png";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  const firebaseAuth = getAuth(app); // firebase auth instance from firebase config 
  const provider = new GoogleAuthProvider(); // google auth provider from firebase auth instance 

  const [{ user }, dispatch] = useStateValue(); // state from context api 

  const login = async () => {
    const { user: { refreshToken, providerData } } = await signInWithPopup(
      firebaseAuth,
      provider
    ); // get user data from firebase auth instance 
    dispatch({
      type: "SET_USER",
      user: providerData[0],
    }); // set user data to context api state 
    console.log(providerData[0]); // log user data 
  }; // login function 

  return (
    <div className="fixed w-screen z-50 p-6 px-16">
      {/* Desktop and Tablet */}
      <div className="hidden md:flex w-full p-4 h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">Restaurant</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer transition-all duration-100 ease-in-out">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer transition-all duration-100 ease-in-out">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer transition-all duration-100 ease-in-out">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer transition-all duration-100 ease-in-out">
              Service
            </li>
          </ul>
          <div className="relative flex justify-center items-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-center text-white text-sm font-bold">1</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.8 }}
              src={Avatar}
              alt="logo"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl"
              onClick={login}
            />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden w-full p-4 h-full" />
    </div>
  );
};

export default Header;
