import React, { useRef } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

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
            className='w-300 min-w-[300px] md:w-340 h-[280px] rounded-lg p-2 shadow-md backdrop-blur-lg hover:drop-shadow-2xl bg-blue-50 flex flex-col items-center justify-between'>
            <div className='w-full flex items-center justify-between'>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={item?.imageURL}
                alt=""
                className='w-44' />

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
        <p>harsh</p>
      )
      }
    </div >
  )
}

export default RowContainer;