import React from 'react';

const Context = React.createContext(null);

export const Provider = Context.Provider;

export function useContext() {
  return React.useContext(Context);
}
