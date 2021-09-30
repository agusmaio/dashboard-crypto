import React from 'react';
import LoadingIcon from 'assets/loading.svg';

const Loading = () => {
  return (
    <div className='loading-element'>
      <img src={LoadingIcon} alt='Cargando...' />
      <p>Cargando...</p>
    </div>
  );
};

export default Loading;
