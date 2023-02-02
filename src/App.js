import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateContainer, Header, MainContainer } from './components';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { useEffect } from 'react';

const App = () => {

    const [{ foodItems }, dispatch] = useStateValue();
    const fetchData = async () => {  // fetchData function starts here 
        await getAllFoodItems().then((data) => { // get all the food items from the firebase database 
            dispatch({ // dispatch the action to set the food items 
                type: "SET_FOOD_ITEMS", // set the food items 
                foodItems: data // set the food items to the data 
            }); // dispatch the action to set the food items 
        }); // get all the food items from the firebase database 
    }; // fetchData function ends here 

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <AnimatePresence>
            <div className='w-screen h-auto flex flex-col bg-primary'>
                <Header />
                <main className='mt-16 md:mt-20 px-4 md:px-16 py-4 w-full overflow-x-hidden'>
                    <Routes>
                        <Route path='/*' element={<MainContainer />} /> {/* This is the default route */}
                        <Route path='/createItem' element={<CreateContainer />} /> {/* This is the createItem route */}
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    );
};

export default App;