import React from 'react';
import { motion } from 'framer-motion';
import { MdKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';

const CartContainer = () => {

    const [{ cartShow }, dispatch] = useStateValue(); // state from context api

    const showCart = () => {
        dispatch({
            type: 'SET_CART_SHOW',
            cartShow: !cartShow
        });
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
        className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-lg flex flex-col z-[101]'>
            <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    onClick={showCart}
                >
                    <MdKeyboardBackspace className='text-textColor text-3xl' />

                </motion.div>
                <p className='text-textColor text-lg font-semibold'>Cart</p>
                <motion.p
                    whileTap={{ scale: 0.8 }}
                    className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-200 rounded-lg hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base'>
                    Clear <RiRefreshFill />
                </motion.p>
            </div>
            {/* BOTTOM */}
            <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
                {/* CART ITEMS */}
                <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col flex-wrap gap-3 overflow-y-scroll scrollbar-none'>
                    {/* CART ITEM */}
                    <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex flex-wrap items-center gap-2'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/restaurantapp-80c1d.appspot.com/o/Images%2F1675330328722-%20f9.png?alt=media&token=6b00f728-dd28-4a53-82e9-4f8e952c4233' alt='' className='w-20 h-20 max-w-[60px] rounded-full object-contain' />

                        <div className='flex flex-col gap-2'>
                            <p className='text-base text-gray-50'>BANANA</p>
                            <p className='text-sm block text-gray-300'>₹25</p>
                        </div>
                        {/* CART TOOLS */}
                        <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                            <motion.div
                                whileTap={{ scale: 0.8 }}>
                                <BiMinus className='text-gray-50 text-2xl' />
                            </motion.div>
                            <p className='w-5 h-5 rounded-sm bg-cartBg flex items-center justify-center text-gray-50'>
                                1
                            </p>
                            <motion.div
                                whileTap={{ scale: 0.8 }}>
                                <BiPlus className='text-gray-50 text-2xl' />
                            </motion.div>
                        </div>
                    </div>
                </div>
                {/* CART TOTAL */}
                <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-300 text-xl'>SubTotal:</p>
                        <p className='text-gray-300 text-xl'>₹100</p>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-300 text-xl'>Delivery:</p>
                        <p className='text-gray-300 text-xl'>₹100</p>
                    </div>
                    <div className='w-full border-b border-gray-600 my-2'></div>
                    <div className='w-full flex  items-center justify-between'>
                        <p className='text-gray-300 text-xl'>Total:</p>
                        <p className='text-gray-300 text-xl'>₹100</p>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        type='button'
                        className='w-full p-2 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 text-gray-100 text-lg my-2 hover:shadow-lg transition-all duration-100 ease-out'
                    >
                        Check out
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default CartContainer;