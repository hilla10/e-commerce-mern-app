import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div className=''>
          <img src={assets.logo} className='mb-5 w-32' alt='logo' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            rem, a soluta molestiae tempore ipsa ipsum eveniet! Excepturi
            possimus nesciunt atque delectus? Corrupti deserunt dolor amet.
          </p>
        </div>
        <div>
          <p className='uppercase text-xl font-medium mb-5 '>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className='uppercase text-xl font-medium mb-5 '>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+251-91-234-5678</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright {new Date().getFullYear()} @ forever.com - All Right
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
