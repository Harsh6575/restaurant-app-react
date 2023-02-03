import React, { useState, useEffect } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
let items = [];

const CartItems = ({ item, setFlag, flag }) => {

    const [qty, setQty] = useState(item.qty);

    const [{ cartItems }, dispatch] = useStateValue();

    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: "SET_CART_ITEMS",
            cartItems: items
        })
    }

    const updateQty = (action, id) => {
        if (action === "add") {
            setQty(qty + 1);
            cartItems.map((item) => {
                if (item.id === id) {
                    item.qty++;
                    setFlag(flag + 1);
                }
            });
        }
        else {
            if (qty === 1) {
                items = (cartItems.filter((item) => item.id !== id))
                setFlag(flag + 1);
                cartDispatch();
            }
            else {
                setQty(qty - 1);
                cartItems.map((item) => {
                    if (item.id === id) {
                        item.qty--;
                        setFlag(flag + 1);
                    }
                })
                cartDispatch();
            }

        }

    }

    useEffect(() => {
        items = cartItems;
    }, [qty, items])

    return (
        <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex flex-wrap items-center gap-2' key={item?.id}>
            <img src={item?.imageURL} alt='' className='w-20 h-20 max-w-[60px] rounded-full object-contain' />

            <div className='flex flex-col gap-2'>
                <p className='text-base text-gray-50'>{item?.title}</p>
                <p className='text-sm block text-gray-300'>₹{(item?.price) * qty}</p>
            </div>
            {/* CART TOOLS */}
            <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateQty("remove", item?.id)}
                >
                    <BiMinus className='text-gray-50 text-2xl' />
                </motion.div>
                <p className='w-5 h-5 rounded-sm bg-cartBg flex items-center justify-center text-gray-50'>
                    {qty}
                </p>
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateQty("add", item?.id)}
                >
                    <BiPlus className='text-gray-50 text-2xl' />
                </motion.div>
            </div>

        </div>
    )
}

export default CartItems