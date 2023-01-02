import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood } from 'react-icons/md';
import { catagories } from '../utils/data';
import Loader from './Loader';

const CreateContainer = () => {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
        {
          fields &&
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`w-full p-2 rounded-lg text-center font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
            {/* Something went wrong. Please try again later. */}
            {msg}
          </motion.p>
        }
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFastfood className='text-2xl text-textColor' />
          <input type='text' required value={title} placeholder='enter title' className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='w-full'>
          <select onChange={(e) => setCategory(e.target.value)}
            className='outline-none w-full border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
            <option value='other' className='bg-white'>Select Catagory</option>
            {catagories && catagories.map((item) => <option key={item.id} className='border-0 outline-none capitalize bg-white text-emerald-800' value={item.urlParameter}>
              {item.name}
            </option>)}
          </select>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;