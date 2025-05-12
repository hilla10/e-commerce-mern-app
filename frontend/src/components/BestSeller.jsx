import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useShop();
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter(
      (product) => product.bestseller === true
    );
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'Best'} text2={'Sellers'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore
          sequi non deserunt molestias exercitationem provident corrupti.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map(({ _id, name, image, price }) => (
          <ProductItem
            key={_id}
            id={_id}
            name={name}
            image={image}
            price={price}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
