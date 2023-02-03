import React, { useRef } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import NotFound from '../images/NotFound.svg';

const RowContainer = ({ flag, data, scrollValue }) => {

  console.log(data);

  const rowContainerRef = useRef();

  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue;
  }, [scrollValue])

  return (
    <div
      ref={rowContainerRef} className={`w-full h-auto  flex items-center gap-3 my-12 scroll-smooth ${flag
        ? "overflow-x-scroll scrollbar-none"
        : "overflow-x-hidden flex-wrap justify-center"
        }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className='w-275 min-w-[275px] md:w-300 h-[280px] rounded-lg p-2 my-12 shadow-md backdrop-blur-lg hover:drop-shadow-2xl bg-blue-50 flex flex-col items-center justify-between relative'>
            <div className='w-full flex items-center justify-between'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className='w-80 h-40 drop-shadow-xl'
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className='w-full h-full object-contain rounded-3xl' />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.80 }}
                className='w-8 h-8 rounded-full bg-red-600 flex justify-center items-center cursor-pointer hover:shadow-md'>
                <MdShoppingBasket className='text-white' />
              </motion.div>
            </div>

            <div className='w-full flex flex-col items-end justify-end'>
              <p className='text-textColor font-semibold text-base md:text-lg'>
                {item?.title}
              </p>
              <p className='mt-1 text-sm text-gray-500'>
                {item?.calories} Calories
              </p>
              <div className='flex items-center gap-8'>
                <p className='text-lg text-headingColor font-semibold'>
                  <span className='text-sm text-red-500'>₹</span>{item?.price}
                </p>
              </div>
            </div>
          </div>
        ))) : (
        <div className='w-full flex items-center justify-center'>
          <img src={NotFound} alt="" className='h-340' />
          <p className='text-xl text-headingColor font-semibold'>Items Not Available</p>
        </div>
      )
      }
    </div >
  )
}

export default RowContainer;