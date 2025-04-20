import React from 'react';
import CategoryList from './_components/CategoryList';

function layout({ children }) {

  return (
    <div className='grid grid-cols-4'>
      <div className='hidden md:block'>
        {/*Category*/}
        <CategoryList/>
      </div>
      <div className='grid grid-cols-3'>
        <h2>{children}</h2>
      </div>
    </div>
  );
}

export default layout;

