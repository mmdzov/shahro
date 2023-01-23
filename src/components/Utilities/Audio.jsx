import React from 'react';

const Audio = ({ url }) => {
  return (
    <div className='m-8'>
      <audio controls className={`w-full outline-none `}>
        <source src={url} type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default Audio;
