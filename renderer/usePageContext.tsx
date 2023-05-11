// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import React, { useContext } from 'react';

import type { PageContext } from './types';

export { PageContextProvider };
export { usePageContext };

const Context = React.createContext<PageContext | null>(null);

function PageContextProvider({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  if (!pageContext) {
    throw new Error('You must use usePageContext within a PageContextProvider');
  }
  return pageContext;
}
