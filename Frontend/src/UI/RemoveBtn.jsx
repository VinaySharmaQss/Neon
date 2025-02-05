import React from 'react';

const RemoveBtn = () => {
  return (
    <button
      className='bg-white text-red-500 hover:bg-red-500 hover:text-white font-bold py-1 px-2 border border-red-500 rounded-full'
      style={{
        fontFamily: 'Brown, sans-serif',
        fontSize: '8px',
        lineHeight: '1.2',
      }}
    >
      remove
    </button>
  );
};

export default RemoveBtn;