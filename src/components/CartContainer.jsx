import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { useStateValue } from '../context/StateProvider';
import EmptyCart from '../images/emptyCart.svg';
import CartItems from './CartItems';

const CartContainer = () => {

    const [{ cartShow, cartItems, user }, dispatch] = useStateValue(); // state from context api

    const [flag, setFlag] = useState();
    const [tot, setTot] = useState();

    const showCart = () => {
        dispatch({
            type: 'SET_CART_SHOW',
            cartShow: !cartShow
        });
    }

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
    }, [tot, flag])

    const clearCart = () => {
        dispatch({
            type: 'SET_CART_ITEMS',
            cartItems: []
        })
        localStorage.setItem("cartItems", JSON.stringify([]));
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
                    className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-200 rounded-lg hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base' onClick={clearCart}>
                    Clear <RiRefreshFill />
                </motion.p>
            </div>
            {/* BOTTOM */}
            {cartItems && cartItems.length > 0 ? (
                <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
                    {/* CART ITEMS */}
                    <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                        {/* CART ITEM */}
                        {cartItems.length > 0 && cartItems.map((item) => (
                            <CartItems item={item} key={item.id} setFlag={setFlag} flag={flag} />
                        ))}
                    </div>
                    {/* CART TOTAL */}
                    <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-300 text-xl'>SubTotal:</p>
                            <p className='text-gray-300 text-xl'>₹{tot}</p>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-300 text-xl'>Delivery:</p>
                            <p className='text-gray-300 text-xl'>₹50</p>
                        </div>
                        <div className='w-full border-b border-gray-600 my-2'></div>
                        <div className='w-full flex  items-center justify-between'>
                            <p className='text-gray-300 text-xl'>Total:</p>
                            <p className='text-gray-300 text-xl'>₹{tot + 50}</p>
                        </div>
                        {user ? (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type='button'
                                className='w-full p-2 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 text-gray-100 text-lg my-2 hover:shadow-lg transition-all duration-100 ease-out'
                            >
                                Check out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type='button'
                                className='w-full p-2 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 text-gray-100 text-lg my-2 hover:shadow-lg transition-all duration-100 ease-out'
                            >
                                Log in for Check out
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                    <img src={EmptyCart} className='w-300' alt="" />
                    <p className='text-xl text-textColor font-semibold'>
                        Add to Cart
                    </p>
                </div>
            )}
        </motion.div>
    )
}

export default CartContainer;