export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname'];

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';

import logoUrl from './logo.svg';
import { PageShell } from './PageShell';
import type { PageContextServer } from './types';

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;

  let pageHtml = '';

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || 'Vite SSR app';
  const desc =
    (documentProps && documentProps.description) ||
    'App using Vite + vite-plugin-ssr';

  if (Page) {
    pageHtml = ReactDOMServer.renderToString(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    );
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" href="${logoUrl}" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="${desc}" />
          <title>${title}</title>
        </head>
        <body>
          <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
        </body>
      </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
