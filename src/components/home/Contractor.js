import React from 'react';

const Contractor = ({ name, id }) => {
  return (
    <div
      style={{
        height: '200px',
        width: '400px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        border: '1px solid #000',
        margin: '10px',
      }}
    >
      {name}
    </div>
  );
};

export default Contractor;
