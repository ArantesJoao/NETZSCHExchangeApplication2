import React from 'react';

function Output({ value }) {
  return (
    <div className='flex flex-col w-full h-full justify-center items-center mt-10'>
      <div className='h-full items-start w-1/4'>
        <label
          className='font-bold'
        >
          Current Windows Application Exchanger's Message:
        </label>
        <div
          className='w-full h-32 px-1.5 rounded border border-neutral-400 bg-gray-200 mt-1 overflow-hidden'
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default Output;
