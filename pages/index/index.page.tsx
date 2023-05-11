import React from 'react';

import { Counter } from './Counter';

export function Page() {
  return (
    <>
      <h1>Welcome (server/client-side)</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}
