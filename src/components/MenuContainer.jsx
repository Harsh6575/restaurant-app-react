import React, { useState } from 'react';
import { IoFastFood } from 'react-icons/io5';
import { catagories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {
    const [filter, setFilter] = useState("fastfood");

    const [{ foodItems }, dispatch] = useStateValue();


    return (
        <section className="w-full my-6" id="menu">
            <div className="w-full flex flex-col items-center justify-center">
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto'>
                    Our Hot Dishes
                </p>
                <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                    {catagories && catagories.map((catagory) => (
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            key={catagory.id}
                            className={`group ${filter === catagory.urlParameter ? 'bg-red-600' : 'bg-blue-50'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out hover:bg-red-600`}
                            onClick={() => {
                                setFilter(catagory.urlParameter)
                            }}
                        >

                            <div className={`w-10 h-10 ${filter === catagory.urlParameter ? 'bg-blue-50' : 'bg-red-600'} rounded-full group-hover:bg-blue-50 flex items-center justify-center shadow-lg`}>
                                <IoFastFood className='text-black' />
                            </div>
                            <p className='text-sm text-black'>{catagory.urlParameter}</p>
                        </motion.div>
                    ))}
                </div>
                <div className='w-full'>
                    <RowContainer
                        flag={false}
                        data={foodItems?.filter((n) => n.category === filter)}
                    />
                </div>
            </div>
        </section>
    )
}

export default MenuContainer;