import React, { useContext, useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useShop();

  const [latestProducts, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <section className='my-10 '>
      <div className='text-center py-3 text-3xl'>
        <Title text1={'Latest'} text2={'Collection'} />
        <p className='w-3/4 m-auto text-xl sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae,
          voluptate pariatur laboriosam.
        </p>
      </div>

      {/* Rendering Products */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map(({ _id, image, name, price }) => (
          <ProductItem
            key={_id}
            id={_id}
            image={image}
            name={name}
            price={price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
