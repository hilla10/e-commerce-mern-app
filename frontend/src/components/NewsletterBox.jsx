import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now & get 20% off
      </p>
      <p className='text-gray-400 mt-3 '>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 my-6 border pl-3 mx-auto'>
        <input
          type='email'
          placeholder='Enter Your Email'
          className='w-full sm:flex-1 outline-none '
          required
        />
        <button
          type='submit'
          className='cursor-pointer bg-black text-white uppercase text-xs px-10 py-4'>
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterBox;
