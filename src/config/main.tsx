import React from 'react';
import { createRoot } from 'react-dom/client';


const main = (pluginId: string): void => {
  const root = document.getElementById('settings');
  if (!root) {
    throw 'プラグインのHTMLに、ルート要素が存在しません。';
  }
};

export default main;
