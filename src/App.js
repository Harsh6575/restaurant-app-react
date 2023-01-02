import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateContainer, Header, MainContainer } from './components';
import { AnimatePresence } from 'framer-motion';

const App = () => {
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