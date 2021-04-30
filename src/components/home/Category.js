import React from 'react';

const Category = ({ name, user, history }) => {
  return (
    <div
      style={{
        height: '200px',
        width: '200px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        border: '1px solid #000',
        margin: '10px',
      }}
      onClick={() => {
        if (!user.displayName) {
          history.push('/login');
        } else if (name === 'Painting') {
          history.push('/painting-form');
        }
      }}
    >
      {name}
    </div>
  );
};

export default Category;
