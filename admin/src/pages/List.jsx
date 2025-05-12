import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
const List = ({ token }) => {
  const [lists, setLists] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token },
      });

      if (response.data.success) {
        setLists(response.data.products);
      } else {
        toast.error(response.data.message);
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

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/product/remove', {
        headers: { token },
        data: { id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProduct();
      } else {
        toast.error(response.data.message);
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
    fetchProduct();
  }, []);

  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex flex-col gap-2'>
        {/*  ---------- List Table Title ---------- */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border border-gray-300 bg-gray-100 text-sm py-1.5 px-2'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ---------- Product List ---------- */}

        {lists.map(({ _id, image, name, category, price }) => (
          <div
            key={_id}
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm '>
            <img className='w-12' src={image[0]} alt='' />
            <p>{name}</p>
            <p>{category}</p>
            <p>
              {currency}
              {price}
            </p>
            <p
              onClick={() => removeProduct(_id)}
              className='text-right md:text-center cursor-pointer text-lg'>
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
