

const RemoveBtn = () => {
  return (
    <button
      className='bg-white text-red-500 hover:bg-red-500 hover:text-white font-bold py-1 px-2 mt-1 rounded-full'
      style={{
        fontFamily: 'BrownRegular, sans-serif',
        fontSize: '12px',
        lineHeight: '1.2',
      }}
    >
      Remove
    </button>
  );
};

export default RemoveBtn;