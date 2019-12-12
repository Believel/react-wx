import React from 'react';
export const Loading = (WraperComponent) => ({ isLoading, ...otherProps}) => {
  return isLoading ? <div>Loading...</div>: <WraperComponent {...otherProps} />
}
