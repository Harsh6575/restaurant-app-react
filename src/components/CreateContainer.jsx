/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { catagories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';

const CreateContainer = () => {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Select Catagory');
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true); // set isLoading to true if the image is loading 

    const imageFile = e.target.files[0]; // the file to upload to the   firebase storage  

    const storageRef = ref(storage, `Images/${Date.now()}- ${imageFile.name}`); // the path to store the image in the firebase storage 

    const uploadTask = uploadBytesResumable(storageRef, imageFile); // upload the image to the firebase storage 

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // get the upload progress 
    }, (error) => { // if there is an error then log the error 
      console.log(error); // log the error if any 
      setFields(true); // set the fields to true 
      setAlertStatus('danger'); // set the alert status to danger 
      setMsg('Error uploading image. Please try again later.'); // set the message to display 

      setTimeout(() => {
        setFields(false); // set the fields to false after 4 seconds 
        setIsLoading(false); // set the isLoading to false 
      }, 4000); // set the timeout to 4 seconds 

    }, () => { // if the upload is successful 
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { // get the download url of the image 

        setImageAsset(downloadURL); // set the image asset to the download url 
        setIsLoading(false); // set the isLoading to false 
        setFields(true); // set the fields to true for loading 
        setAlertStatus('success'); // set the alert status to success 
        setMsg('Image uploaded successfully.'); // set the message to display 

        setTimeout(() => {
          setFields(false); // set the fields to false after 4 seconds
        }, 4000); // set the timeout to 4 seconds 

      }); // get the download url of the image 
    }); // set the upload task on state changed 
  }; // uploadImage function ends here 

  const deleteImage = () => { // deleteImage function starts here 

    setIsLoading(true); // set the isLoading to true 
    const deleteRef = ref(storage, imageAsset); // get the reference of the image to delete 
    deleteObject(deleteRef).then(() => { // delete the image 

      setImageAsset(null); // set the image asset to null 
      setIsLoading(false); // set the isLoading to false
      setFields(true); // set the fields to true for loading 
      setAlertStatus('success'); // set the alert status to success 
      setMsg('Image deleted successfully.'); // set the message to display 

      setTimeout(() => {
        setFields(false); // set the fields to false after 4 seconds
      }, 4000); // set the timeout to 4 seconds

    }).catch((error) => { // if there is an error then log the error 

      console.log(error); // log the error
      setFields(true); // set the fields to true for loading
      setAlertStatus('danger'); // set the alert status to danger 
      setMsg('Error deleting image. Please try again later.'); // set the message to display the error

      setTimeout(() => {
        setFields(false); // set the fields to false after 4 seconds 
        setIsLoading(false); // set the isLoading to false
      }, 4000); // set the timeout to 4 seconds

    }); // delete the image 
  }; // deleteImage function ends here 

  const saveDetails = () => { // saveDetails function starts here 

    setIsLoading(true); // set the isLoading to true after the user clicks on the save button 
    try { // try to save the details 
      if ((!title || !calories || !price || !category || !imageAsset)) { // if any of the fields are empty then show the error message 

        setFields(true); // set the fields to true for loading 
        setAlertStatus('danger'); // set the alert status to danger 
        setMsg('Please fill all the fields.'); // set the message to display the error 

        setTimeout(() => {
          setFields(false); // set the fields to false after 4 seconds 
          setIsLoading(false); // set the isLoading to false 
        }, 4000); // set the timeout to 4 seconds 

        return; // return from the function 

      } else { // if all the fields are filled then save the details

        const data = { // the data to save 
          id: Date.now(), // the id of the item 
          title: title, // the title of the item
          imageURL: imageAsset, // the image url of the item
          calories: calories, // the calories of the item
          category: category, // the category of the item
          price: price, // the price of the item 
          qty: 1 // the quantity of the item 
        } // the data to save in the firebase database 

        saveItem(data); // save the item in the firebase database
        setIsLoading(false); // set the isLoading to false 
        setFields(true); // set the fields to true for loading
        setMsg('Details saved successfully.'); // set the message to display 
        setAlertStatus("success"); // set the alert status to success 

        setTimeout(() => {
          setFields(false); // set the fields to false after 4 seconds
        }, 4000); // set the timeout to 4 seconds

        clearData(); // clear the data from the form

      } // if all the fields are filled then save the details 

    } catch (error) { // if there is an error then log the error 

      console.log(error); // log the error message 
      setFields(true); // set the fields to true for loading 
      setAlertStatus('danger'); // set the alert status to danger 
      setMsg('Error while saving details. Please try again later.'); // set the message to display the error 

      setTimeout(() => { // set the timeout to 4 seconds 
        setFields(false); // set the fields to false after 4 seconds 
        setIsLoading(false); // set the isLoading to false after 4 seconds 
      }, 4000); // set the timeout to 4 seconds 

    } // try to save the details 

    fetchData(); // fetch the data from the firebase database 

  }; // saveDetails function ends here 

  const clearData = () => {
    setTitle(''); // set the title to empty
    setImageAsset(null); // set the image asset to null
    setCalories(''); // set the calories to empty
    setPrice(''); // set the price to empty
    setCategory("Select Catagory"); // set the category to empty
  };

  const fetchData = async () => {  // fetchData function starts here 
    await getAllFoodItems().then((data) => { // get all the food items from the firebase database 
      dispatch({ // dispatch the action to set the food items 
        type: "SET_FOOD_ITEMS", // set the food items 
        foodItems: data // set the food items to the data 
      }); // dispatch the action to set the food items 
    }); // get all the food items from the firebase database 
  }; // fetchData function ends here 

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
            <option value='other' className='bg-white'>{category}</option>
            {catagories && catagories.map((item) => <option key={item.id} className='border-0 outline-none capitalize bg-white text-emerald-800' value={item.urlParameter}>
              {item.name}
            </option>)}
          </select>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
          {isLoading ? <Loader /> : <>
            {!imageAsset ? <>
              <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                  <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                  <p className='text-gray-500 hover:text-gray-700'>
                    Click here to upload image
                  </p>
                </div>
                <input type='file' name='uploadimage' accept='image/*' onChange={uploadImage} className='w-0 h-0' />
              </label>
            </> : <>
              <div className='relative h-full'>
                <img src={imageAsset} alt='upload image' className="w-full h-full object-cover" />
                <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' onClick={deleteImage}>
                  <MdDelete className='text-white' />
                </button>
              </div>
            </>
            }
          </>
          }
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full p-2 border-b border-gray-200 flex items-center gap-2'>
            <MdFoodBank className='text-2xl text-gray-700' />
            <input type='text' required placeholder='calories' value={calories} onChange={(e) => setCalories(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500' />
          </div>
          <div className='w-full p-2 border-b border-gray-200 flex items-center gap-2'>
            <MdAttachMoney className='text-2xl text-gray-700' />
            <input type='text' required placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500' />
          </div>
        </div>
        <div className='flex items-center w-full'>
          <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-3 rounded-lg text-lg text-white tracking-[5px]' onClick={saveDetails}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;