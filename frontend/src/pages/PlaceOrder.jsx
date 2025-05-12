import React, { useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { useShop } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useShop();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    street: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const {
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    zipcode,
    country,
    phone,
  } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        const sizes = cartItems[productId];
        for (const size in sizes) {
          const quantity = sizes[size];
          if (quantity > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            console.log(itemInfo);
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API Calls for COD

        case 'cod': {
          const response = await axios.post(
            backendUrl + 'api/order/place',
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case 'stripe':
          {
            const responseStripe = await axios.post(
              backendUrl + 'api/order/stripe',
              orderData,
              { headers: { token } }
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300 '>
      {/* ----------- Left Size ----------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl my-3 sm:text-2xl'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>

        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='First name'
            name='firstName'
            value={firstName}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
          />
          <input
            type='text'
            placeholder='Last name'
            name='lastName'
            value={lastName}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
          />
        </div>
        <input
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={handleChange}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          required
        />
        <input
          type='text'
          placeholder='Street'
          name='street'
          value={street}
          onChange={handleChange}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          required
        />

        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={city}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
          />
          <input
            type='text'
            placeholder='State'
            name='state'
            value={state}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
          />
        </div>
        <div className='flex gap-3'>
          <input
            type='number'
            placeholder='ZipCode'
            name='zipcode'
            value={zipcode}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
          />
          <input
            type='text'
            placeholder='Country'
            name='country'
            value={country}
            onChange={handleChange}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
          />
        </div>
        <input
          type='number'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={handleChange}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          required
        />
      </div>

      {/* ----------- Right Size ----------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />

          {/* ----------- Payment method selection ----------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === 'stripe' ? 'bg-green-400' : ''
                }`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt='' />
            </div>
            {/* <div
              onClick={() => setMethod('razorpay')}
              className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === 'razorpay' ? 'bg-green-400' : ''
                }`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt='' />
            </div> */}
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === 'cod' ? 'bg-green-400' : ''
                }`}></p>
              <p className='uppercase text-gray-500 text-sm font-medium mx-4'>
                Cash on delivery
              </p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              // onClick={() => navigate('/orders')}
              className='uppercase bg-black text-white px-16 py-3 text-sm cursor-pointer'
              type='submit'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
