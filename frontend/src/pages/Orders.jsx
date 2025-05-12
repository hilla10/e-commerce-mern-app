import React from 'react';
import { useShop } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useShop();
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + 'api/order/user-orders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
        console.log(allOrdersItem);
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

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className='border-t border-gray-300 pt-16'>
      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />
      </div>

      <div>
        {orderData.map(
          (
            { name, image, price, quantity, size, date, paymentMethod, status },
            index
          ) => (
            <div
              key={index}
              className='py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={image[0]} className='w-16 sm:w-20' alt='' />
                <div>
                  <p className='sm:text-base font-medium'>{name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>
                      {currency}
                      {price}
                    </p>
                    <p>Quantity: {quantity}</p>
                    <p>Size: {size}</p>
                  </div>
                  <p className='mt-1'>
                    Date:{' '}
                    <span className='text-gray-400'>
                      {new Date(date).toDateString()}
                    </span>
                  </p>
                  <p className='mt-1'>
                    Payment Method:{' '}
                    <span className='text-gray-400'>{paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className='border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>
                  Track Order
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
